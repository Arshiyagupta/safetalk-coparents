'use client';

import Link from 'next/link';

interface ConsentState {
  smsConsent: boolean;
  processingStorage: boolean;
  smsDisclosures: boolean;
  termsPrivacy: boolean;
}

interface MultiConsentCheckboxesProps {
  consentState: ConsentState;
  onChange: (field: keyof ConsentState, checked: boolean) => void;
  showConsentRecorded?: boolean;
  consentTimestamp?: string;
}

export default function MultiConsentCheckboxes({
  consentState,
  onChange,
  showConsentRecorded = false,
  consentTimestamp
}: MultiConsentCheckboxesProps) {
  const allChecked = Object.values(consentState).every(Boolean);

  const CheckboxItem = ({
    id,
    checked,
    onChange: onItemChange,
    children,
    required = true
  }: {
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    children: React.ReactNode;
    required?: boolean;
  }) => (
    <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <div className="flex-shrink-0 pt-1">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onItemChange(e.target.checked)}
          required={required}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded focus:ring-2"
          aria-describedby={`${id}-description`}
          aria-invalid={required && !checked ? 'true' : 'false'}
        />
      </div>
      <label
        htmlFor={id}
        className="flex-1 text-sm leading-relaxed text-gray-800 cursor-pointer font-medium"
        id={`${id}-description`}
        style={{ fontSize: '16px' }} // Ensure 16px+ for mobile
      >
        {children}
      </label>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center pb-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Required Consents
        </h3>
        <p className="text-sm text-gray-600">
          All four consents are required to proceed with SafeTalk SMS notifications
        </p>
      </div>

      {/* Checkbox 1 - SMS Consent (User-Initiated Messaging) */}
      <CheckboxItem
        id="sms-consent"
        checked={consentState.smsConsent}
        onChange={(checked) => onChange('smsConsent', checked)}
      >
        <div className="space-y-2">
          <div className="font-semibold text-gray-900">
            SMS Consent (User-Initiated Messaging)
          </div>
          <div>
            By checking this box, I give my express written consent to receive text (SMS) messages from SafeTalk at the phone number I provide. I understand that <strong>all messages sent through SafeTalk are 100% user-initiated</strong> — no message will ever be sent unless I personally choose, edit, or approve it. SafeTalk may suggest options, but the final message content and the decision to send are always mine.
          </div>
        </div>
      </CheckboxItem>

      {/* Show consent recorded timestamp after SMS consent if available */}
      {showConsentRecorded && consentTimestamp && consentState.smsConsent && (
        <div className="ml-7 text-xs text-green-600 bg-green-50 p-2 rounded border border-green-200">
          <span className="font-medium">✓ Consent recorded:</span> {consentTimestamp}
        </div>
      )}

      {/* Checkbox 2 - Processing & Storage */}
      <CheckboxItem
        id="processing-storage"
        checked={consentState.processingStorage}
        onChange={(checked) => onChange('processingStorage', checked)}
      >
        <div className="space-y-2">
          <div className="font-semibold text-gray-900">
            Processing &amp; Storage
          </div>
          <div>
            I consent to SafeTalk processing and storing my communications for the purpose of filtering and delivering messages.
          </div>
        </div>
      </CheckboxItem>

      {/* Checkbox 3 - SMS Disclosures */}
      <CheckboxItem
        id="sms-disclosures"
        checked={consentState.smsDisclosures}
        onChange={(checked) => onChange('smsDisclosures', checked)}
      >
        <div className="space-y-2">
          <div className="font-semibold text-gray-900">
            SMS Disclosures (STOP/HELP/Frequency/Rates)
          </div>
          <div>
            Message frequency varies based on co-parent communication (one message per user action). Standard message &amp; data rates may apply. Reply <strong>STOP</strong> to unsubscribe or <strong>HELP</strong> for assistance at any time. You&apos;ll receive a confirmation text after sign-up.
          </div>
        </div>
      </CheckboxItem>

      {/* Checkbox 4 - Terms & Privacy */}
      <CheckboxItem
        id="terms-privacy"
        checked={consentState.termsPrivacy}
        onChange={(checked) => onChange('termsPrivacy', checked)}
      >
        <div className="space-y-2">
          <div className="font-semibold text-gray-900">
            Terms &amp; Privacy
          </div>
          <div>
            I acknowledge that I have read and understood SafeTalk&apos;s{' '}
            <Link
              href="/terms"
              className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link
              href="/privacy"
              className="text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
            , and I agree to comply with them.
          </div>
        </div>
      </CheckboxItem>

      {/* Validation Message */}
      {!allChecked && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded border border-red-200" role="alert" aria-live="polite">
          <span className="font-medium">⚠ All four consents are required</span> to proceed with SafeTalk SMS notifications.
        </div>
      )}

      {/* Success State */}
      {allChecked && (
        <div className="text-sm text-green-600 bg-green-50 p-3 rounded border border-green-200" role="status" aria-live="polite">
          <span className="font-medium">✓ All consents provided</span> — Ready to continue with SafeTalk SMS setup.
        </div>
      )}

      {/* Compliance Notes */}
      <div className="text-xs text-gray-500 space-y-1 border-t pt-3">
        <p>✓ Your consent details are recorded with timestamp and IP for telecom compliance</p>
        <p>✓ You can withdraw consent anytime by replying STOP to any SafeTalk message</p>
        <p>✓ All messages are 100% user-initiated — nothing sent without your explicit approval</p>
      </div>
    </div>
  );
}

export type { ConsentState };