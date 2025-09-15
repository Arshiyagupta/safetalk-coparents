'use client';

interface InputProps {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
}

export default function Input({
  id,
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  helpText,
  required = false
}: InputProps) {
  const hasError = Boolean(error);

  return (
    <div className="space-y-2">
      {/* Label */}
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Input field */}
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        aria-invalid={hasError ? 'true' : 'false'}
        aria-describedby={
          error ? `${id}-error` : helpText ? `${id}-help` : undefined
        }
        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          hasError
            ? 'border-red-300 focus:border-red-500 bg-red-50'
            : 'border-gray-300 focus:border-blue-500 bg-white'
        }`}
      />

      {/* Help text */}
      {helpText && !error && (
        <p
          id={`${id}-help`}
          className="text-xs text-gray-500"
        >
          {helpText}
        </p>
      )}

      {/* Error message */}
      {error && (
        <p
          id={`${id}-error`}
          className="text-xs text-red-600"
          role="alert"
          aria-live="polite"
        >
          ⚠ {error}
        </p>
      )}

      {/* Type-specific examples/guidance */}
      {type === 'tel' && !error && !helpText && (
        <p className="text-xs text-gray-500">
          Include country code (e.g., +1 for US/Canada)
        </p>
      )}

      {type === 'email' && !error && !helpText && (
        <p className="text-xs text-gray-500">
          We&apos;ll only use this for important service updates
        </p>
      )}
    </div>
  );
}