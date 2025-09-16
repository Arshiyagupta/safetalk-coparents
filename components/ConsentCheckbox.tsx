'use client';

import Link from 'next/link';

interface ConsentCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  consentText: string;
  required?: boolean;
}

export default function ConsentCheckbox({
  id,
  checked,
  onChange,
  consentText,
  required = false
}: ConsentCheckboxProps) {
  // Parse the consent text to handle the Terms and Privacy links
  const parseConsentText = (text: string) => {
    // Split the text at "See Terms and Privacy" to insert links
    const parts = text.split('See Terms and Privacy');

    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          See{' '}
          <Link
            href="/terms-of-service"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Terms
          </Link>
          {' '}and{' '}
          <Link
            href="/privacy-policy"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Privacy
          </Link>
          {parts[1] ? parts[1] : '.'}
        </>
      );
    }

    // Fallback: return text as-is if parsing fails
    return text;
  };

  return (
    <div className="space-y-3">
      {/* Checkbox with consent text - VISIBLE AND PROMINENT */}
      <div className="flex items-start space-x-3 p-4 border-2 border-blue-200 rounded-lg bg-blue-50">
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            required={required}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            aria-describedby={`${id}-description`}
            aria-invalid={required && !checked ? 'true' : 'false'}
          />
        </div>

        <label
          htmlFor={id}
          className="flex-1 text-sm leading-relaxed text-gray-800 cursor-pointer"
          id={`${id}-description`}
        >
          {parseConsentText(consentText)}
        </label>
      </div>

      {/* Required indicator */}
      {required && (
        <div className="text-xs text-red-600 ml-7">
          {!checked && (
            <span role="alert" aria-live="polite">
              ⚠ This consent is required to proceed
            </span>
          )}
        </div>
      )}

      {/* Additional compliance note */}
      <div className="text-xs text-gray-500 ml-7 space-y-1">
        <p>✓ Your consent is recorded with timestamp and IP for compliance</p>
        <p>✓ You can withdraw consent anytime by replying STOP</p>
      </div>
    </div>
  );
}