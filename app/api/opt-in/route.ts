import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// TypeScript interfaces
interface ClientPayload {
  name: string;
  phoneE164: string;
  email?: string;
  tzIana: string;
  userAgent: string;
  referer: string;
  consentVersion: string;
  webFormShownCopy: string;
  submittedAtUtcIso: string;
}

interface ServerRecord extends ClientPayload {
  ip: string;
  receivedAtUtcIso: string;
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

    if (!clientPayload.consentVersion || !clientPayload.webFormShownCopy) {
      errors.push('Consent version and copy are required');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    // Extract IP address on server-side (crucial for compliance)
    const ip = extractIpAddress(request);

    // Build complete server-side record
    const serverRecord: ServerRecord = {
      ...clientPayload,
      ip,
      receivedAtUtcIso: new Date().toISOString()
    };

    // Log the complete record for audit trail
    console.log('SMS Consent Record Received:', {
      timestamp: serverRecord.receivedAtUtcIso,
      phone: serverRecord.phoneE164,
      name: serverRecord.name,
      ip: serverRecord.ip,
      consentVersion: serverRecord.consentVersion,
      userAgent: serverRecord.userAgent.substring(0, 100) + '...', // Truncate for readability
    });

    // Full record log (for debugging/compliance)
    console.log('Complete Consent Record:', JSON.stringify(serverRecord, null, 2));

    // Persist to temporary JSON file
    await persistConsent(serverRecord);

    // TODO: Replace with database persistence
    // await upsertToSupabase(serverRecord);

    // TODO: Trigger welcome SMS via Twilio
    // await sendWelcomeSMS(serverRecord.phoneE164);

    // TODO: Add to marketing automation/CRM
    // await addToCustomerList(serverRecord);

    // Return success
    return NextResponse.json({
      ok: true,
      message: 'SMS consent recorded successfully',
      timestamp: serverRecord.receivedAtUtcIso
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