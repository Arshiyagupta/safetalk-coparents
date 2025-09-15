'use client';

import Link from 'next/link';

export default function OptInSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 shadow-lg text-center space-y-6">
        {/* Success Icon */}
        <div className="text-6xl">✅</div>

        {/* Success Heading */}
        <h1 className="text-2xl font-bold text-green-700">
          You&apos;re opted in to SafeTalk SMS
        </h1>

        {/* Confirmation Message */}
        <div className="space-y-4 text-gray-700">
          <p className="text-base leading-relaxed">
            You may receive service messages to help organize and clarify co-parenting communication.
            Reply <strong>STOP</strong> to opt out, <strong>HELP</strong> for help.
            Message frequency varies; msg &amp; data rates may apply.
          </p>

          {/* Additional Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <p className="text-blue-800">
              <strong>What&apos;s next?</strong> You&apos;ll receive SMS messages from SafeTalk to help
              facilitate respectful co-parenting communication. Our service filters and improves
              message tone to reduce conflict.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Go to Home
          </Link>

          <Link
            href="/opt-in"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Opt In Another Number
          </Link>
        </div>

        {/* Support Information */}
        <div className="border-t pt-4 text-xs text-gray-500 space-y-1">
          <p>Need help? Reply <strong>HELP</strong> to any SafeTalk message</p>
          <p>Or visit our <Link href="/terms" className="text-blue-600 hover:underline">Terms</Link> and <Link href="/privacy" className="text-blue-600 hover:underline">Privacy</Link> pages</p>
        </div>
      </div>
    </div>
  );
}