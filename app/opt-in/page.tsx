'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import MultiConsentCheckboxes, { ConsentState } from '@/components/MultiConsentCheckboxes';

// Consent version for tracking
const CONSENT_VERSION = "v4.1-2025-09-15";

interface FormData {
  name: string;
  phoneE164: string;
  email: string;
  consentState: ConsentState;
}

interface FormErrors {
  name?: string;
  phoneE164?: string;
  email?: string;
}

export default function OptInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phoneE164: '',
    email: '',
    consentState: {
      smsConsent: false,
      processingStorage: false,
      smsDisclosures: false,
      termsPrivacy: false
    }
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consentRecorded, setConsentRecorded] = useState(false);
  const [consentTimestamp, setConsentTimestamp] = useState<string>('');
  const [clientInfo, setClientInfo] = useState({
    userAgent: '',
    referer: '',
    tzIana: ''
  });

  // Auto-detect timezone and capture client info
  useEffect(() => {
    setClientInfo({
      userAgent: navigator.userAgent,
      referer: document.referrer || '',
      tzIana: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
  }, []);

  // E.164 phone validation
  const validatePhone = (phone: string): boolean => {
    const e164Regex = /^\+[1-9]\d{1,14}$/;
    return e164Regex.test(phone);
  };

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Phone validation
    if (!formData.phoneE164.trim()) {
      newErrors.phoneE164 = 'Phone number is required';
    } else if (!validatePhone(formData.phoneE164)) {
      newErrors.phoneE164 = 'Phone must be in E.164 format (e.g., +14155551234)';
    }

    // Email validation (optional but must be valid if provided)
    if (formData.email.trim() && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allConsentsChecked = Object.values(formData.consentState).every(Boolean);
    if (!validateForm() || !allConsentsChecked) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        phoneE164: formData.phoneE164.trim(),
        email: formData.email.trim() || undefined,
        tzIana: clientInfo.tzIana,
        userAgent: clientInfo.userAgent,
        referer: clientInfo.referer,
        consent_checked: true,
        consent_text_version: CONSENT_VERSION,
        consent_state: formData.consentState,
        submittedAtUtcIso: new Date().toISOString()
      };

      const response = await fetch('/api/opt-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.consent_timestamp_iso) {
          setConsentTimestamp(new Date(result.consent_timestamp_iso).toLocaleString('en-US', {
            timeZone: 'UTC',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
          }));
          setConsentRecorded(true);
        }

        // Navigate to success page after a brief delay to show consent confirmation
        setTimeout(() => {
          router.push('/opt-in/success');
        }, 2000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if form is valid for submission
  const allConsentsChecked = Object.values(formData.consentState).every(Boolean);
  const isFormValid = formData.name.trim().length >= 2 &&
                     validatePhone(formData.phoneE164) &&
                     (!formData.email.trim() || validateEmail(formData.email)) &&
                     allConsentsChecked;

  // Handle consent state changes
  const handleConsentChange = (field: keyof ConsentState, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      consentState: {
        ...prev.consentState,
        [field]: checked
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* README Note for Twilio Screenshot */}
      <div className="max-w-lg mx-auto mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
        <strong>📸 Twilio Screenshot Guide:</strong> Capture full viewport showing SafeTalk branding,
        visible consent text, checkbox states (unchecked → checked), and submit button for verification proof.
      </div>

      <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 shadow-lg space-y-6" role="main" aria-labelledby="main-heading">
        {/* Header with SafeTalk Branding */}
        <div className="text-center border-b pb-4">
          <div className="text-2xl font-bold text-gray-800 mb-1">
            SafeTalk
          </div>
          <div className="text-sm text-gray-600">
            Co-parenting communication
          </div>
        </div>

        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-800" id="main-heading">
            SafeTalk SMS Opt-In
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Complete all four required consents to receive SafeTalk SMS notifications
          </p>
        </div>

        {/* Opt-In Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate aria-label="SafeTalk SMS Opt-in Form">
          {!isFormValid && (
            <div id="form-validation-error" className="sr-only" aria-live="polite">
              Please complete all required fields and provide all four consents to continue.
            </div>
          )}
          {/* Full Name */}
          <Input
            id="name"
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            error={errors.name}
            required
            placeholder="Enter your full name"
          />

          {/* Mobile Number */}
          <Input
            id="phoneE164"
            label="Mobile Number"
            type="tel"
            value={formData.phoneE164}
            onChange={(value) => setFormData({ ...formData, phoneE164: value })}
            error={errors.phoneE164}
            required
            placeholder="+14155551234"
            helpText="E.164 format required (+ followed by country code and number)"
          />

          {/* Email (Optional) */}
          <Input
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            error={errors.email}
            placeholder="your.email@example.com"
            helpText="Optional"
          />

          {/* Multi-Consent Checkboxes - ALL FOUR REQUIRED */}
          <MultiConsentCheckboxes
            consentState={formData.consentState}
            onChange={handleConsentChange}
            showConsentRecorded={consentRecorded}
            consentTimestamp={consentTimestamp}
          />

          {/* Account Holder Disclaimer */}
          <div className="text-xs text-gray-500 text-center">
            By submitting you confirm you are the account holder or have permission to use this phone number.
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isFormValid && !isSubmitting
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
            }`}
            style={{ fontSize: '16px', minHeight: '48px' }} // Ensure 16px+ font and 48px touch target
            aria-describedby={!isFormValid ? 'form-validation-error' : undefined}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </div>
            ) : consentRecorded ? (
              'Redirecting to Confirmation...'
            ) : (
              'Continue / Sign Up'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}