import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// TypeScript interfaces
interface ConsentState {
  smsConsent: boolean;
  processingStorage: boolean;
  smsDisclosures: boolean;
  termsPrivacy: boolean;
}

interface ClientPayload {
  name: string;
  phoneE164: string;
  email?: string;
  tzIana: string;
  userAgent: string;
  referer: string;
  consent_checked: boolean;
  consent_text_version: string;
  consent_state: ConsentState;
  submittedAtUtcIso: string;
}

interface ServerRecord extends ClientPayload {
  ip: string;
  receivedAtUtcIso: string;
  consent_timestamp_iso: string;
  first_touch_sms_sent?: boolean;
  sms_sent_timestamp?: string;
}

// Extract IP address from request headers (server-side only)
function extractIpAddress(request: NextRequest): string {
  // Priority order for IP extraction
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');

  // x-forwarded-for can be a comma-separated list, take the first
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0].trim();
    if (firstIp) return firstIp;
  }

  // Fallback to other headers
  if (realIp) return realIp;
  if (cfConnectingIp) return cfConnectingIp;

  // Final fallback
  return 'unknown';
}

// Validate E.164 phone format
function isValidE164(phone: string): boolean {
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  return e164Regex.test(phone);
}

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Send first confirmation SMS
async function sendFirstConfirmationSMS(phoneE164: string): Promise<{ success: boolean; timestamp?: string }> {
  const smsTemplate = `SafeTalk: Your SMS notifications are set. Messages are 100% user-initiated—nothing is sent unless you approve it. Msg&Data rates may apply. ~1 msg per user action. Reply STOP to end or HELP for help.`;

  try {
    // TODO: Replace with actual Twilio integration
    // const twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    // await twilio.messages.create({
    //   body: smsTemplate,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: phoneE164
    // });

    console.log('FIRST CONFIRMATION SMS TEMPLATE:', {
      to: phoneE164,
      message: smsTemplate,
      timestamp: new Date().toISOString()
    });

    return {
      success: true,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Failed to send first confirmation SMS:', error);
    return { success: false };
  }
}

// Persist consent record to temporary JSON file
async function persistConsent(record: ServerRecord): Promise<void> {
  try {
    const filePath = path.join('/tmp', 'sms_optins.json');
    let existingData: ServerRecord[] = [];

    // Try to read existing file
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      existingData = JSON.parse(fileContent);
    } catch (error) {
      // File doesn't exist or is invalid, start with empty array
      existingData = [];
    }

    // Append new record
    existingData.push(record);

    // Write back to file
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));

  } catch (error) {
    console.error('Error persisting consent record:', error);
    // Don't throw - we still want to log and return success
  }
}

/*
 * Future Database Integration Example:
 *
 * import { createClient } from '@supabase/supabase-js'
 *
 * async function upsertToSupabase(record: ServerRecord) {
 *   const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
 *
 *   const { data, error } = await supabase
 *     .from('sms_consent_records')
 *     .upsert([{
 *       phone_e164: record.phoneE164,
 *       name: record.name,
 *       email: record.email,
 *       timezone: record.tzIana,
 *       user_agent: record.userAgent,
 *       referer: record.referer,
 *       consent_version: record.consentVersion,
 *       consent_copy: record.webFormShownCopy,
 *       ip_address: record.ip,
 *       submitted_at: record.submittedAtUtcIso,
 *       received_at: record.receivedAtUtcIso,
 *       created_at: new Date().toISOString()
 *     }])
 *     .select()
 *
 *   if (error) throw error
 *   return data
 * }
 */

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const clientPayload: ClientPayload = await request.json();

    // Server-side validation
    const errors: string[] = [];

    if (!clientPayload.name || clientPayload.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    }

    if (!clientPayload.phoneE164 || !isValidE164(clientPayload.phoneE164)) {
      errors.push('Phone must be in valid E.164 format');
    }

    if (clientPayload.email && !isValidEmail(clientPayload.email)) {
      errors.push('Email must be valid if provided');
    }

    if (!clientPayload.consent_checked || !clientPayload.consent_text_version) {
      errors.push('Consent confirmation and version are required');
    }

    // Validate all four consents are checked
    const requiredConsents = ['smsConsent', 'processingStorage', 'smsDisclosures', 'termsPrivacy'] as const;
    const missingConsents = requiredConsents.filter(consent => !clientPayload.consent_state[consent]);
    if (missingConsents.length > 0) {
      errors.push(`Missing required consents: ${missingConsents.join(', ')}`);
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    // Extract IP address on server-side (crucial for compliance)
    const ip = extractIpAddress(request);
    const consentTimestamp = new Date().toISOString();

    // Send first confirmation SMS
    const smsResult = await sendFirstConfirmationSMS(clientPayload.phoneE164);

    // Build complete server-side record
    const serverRecord: ServerRecord = {
      ...clientPayload,
      ip,
      receivedAtUtcIso: new Date().toISOString(),
      consent_timestamp_iso: consentTimestamp,
      first_touch_sms_sent: smsResult.success,
      sms_sent_timestamp: smsResult.timestamp
    };

    // Log the complete record for audit trail
    console.log('SMS Consent Record Received:', {
      timestamp: serverRecord.receivedAtUtcIso,
      phone: serverRecord.phoneE164,
      name: serverRecord.name,
      ip: serverRecord.ip,
      consentVersion: serverRecord.consent_text_version,
      consentTimestamp: serverRecord.consent_timestamp_iso,
      allConsentsChecked: Object.values(serverRecord.consent_state).every(Boolean),
      firstSMSSent: serverRecord.first_touch_sms_sent,
      userAgent: serverRecord.userAgent.substring(0, 100) + '...', // Truncate for readability
    });

    // Full record log (for debugging/compliance)
    console.log('Complete Consent Record:', JSON.stringify(serverRecord, null, 2));

    // Persist to temporary JSON file
    await persistConsent(serverRecord);

    // TODO: Replace with database persistence
    // await upsertToSupabase(serverRecord);

    // TODO: Add to marketing automation/CRM
    // await addToCustomerList(serverRecord);

    // Return success with consent timestamp
    return NextResponse.json({
      ok: true,
      message: 'SMS consent recorded successfully',
      timestamp: serverRecord.receivedAtUtcIso,
      consent_timestamp_iso: serverRecord.consent_timestamp_iso,
      first_touch_sms_sent: serverRecord.first_touch_sms_sent,
      consent_version: serverRecord.consent_text_version
    });

  } catch (error) {
    console.error('SMS Opt-in API Error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}