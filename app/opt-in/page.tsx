'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/components/Input';
import ConsentCheckbox from '@/components/ConsentCheckbox';

// Exact consent copy as specified (do not alter)
const CONSENT_COPY = "SMS Consent (SafeTalk): I agree to receive SMS text messages from SafeTalk to help organize and clarify co-parenting communication. Message frequency varies. Msg & data rates may apply. Reply STOP to opt out, HELP for help. See Terms and Privacy.";

interface FormData {
  name: string;
  phoneE164: string;
  email: string;
  consentChecked: boolean;
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
    consentChecked: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    if (!validateForm() || !formData.consentChecked) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        phoneE164: formData.phoneE164.trim(),
        email: formData.email.trim() || undefined,
        tzIana: clientInfo.tzIana,
        userAgent: clientInfo.userAgent,
        referer: clientInfo.referer,
        consentVersion: 'v1-2025-09-15',
        webFormShownCopy: CONSENT_COPY,
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
        router.push('/opt-in/success');
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
  const isFormValid = formData.name.trim().length >= 2 &&
                     validatePhone(formData.phoneE164) &&
                     (!formData.email.trim() || validateEmail(formData.email)) &&
                     formData.consentChecked;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {/* README Note for Twilio Screenshot */}
      <div className="max-w-lg mx-auto mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
        <strong>📸 Twilio Screenshot Guide:</strong> Capture full viewport showing SafeTalk branding,
        visible consent text, checkbox states (unchecked → checked), and submit button for verification proof.
      </div>

      <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 shadow-lg space-y-6">
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
          <h1 className="text-xl font-semibold text-gray-800">
            SafeTalk SMS Opt-In
          </h1>
        </div>

        {/* Opt-In Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
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

          {/* SMS Consent Checkbox - VISIBLE AND PROMINENT */}
          <ConsentCheckbox
            id="sms-consent"
            checked={formData.consentChecked}
            onChange={(checked) => setFormData({ ...formData, consentChecked: checked })}
            consentText={CONSENT_COPY}
            required
          />

          {/* Account Holder Disclaimer */}
          <div className="text-xs text-gray-500 text-center">
            By submitting you confirm you are the account holder or have permission to use this phone number.
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
              isFormValid && !isSubmitting
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </div>
            ) : (
              'Submit SMS Opt-In'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}