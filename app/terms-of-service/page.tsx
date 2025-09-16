import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="border-b pb-4 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Terms of Service</h1>
              <p className="text-gray-600 mt-2">SafeTalk Co-parenting Communication Service</p>
            </div>
            <Link
              href="/signup"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              ← Back to Sign Up
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-blue-800 font-medium">
              This is a placeholder Terms of Service page for the SMS opt-in demonstration.
              In production, this would contain your complete terms and conditions.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Service Description</h2>
            <p className="text-gray-700 leading-relaxed">
              SafeTalk provides SMS-based communication filtering and mediation services to help
              co-parents maintain respectful communication for the benefit of their children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. User-Initiated Messaging</h2>
            <p className="text-gray-700 leading-relaxed">
              SafeTalk may filter or suggest options, but <strong>no message is sent unless you explicitly approve it</strong>.
              All outbound messages are user-initiated and non-promotional. SafeTalk provides communication
              filtering and mediation services, but you maintain complete control over what messages are sent.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              <strong>100% User Control:</strong> Every message sent through SafeTalk requires your personal
              choice, editing, or approval. We may suggest message options to improve communication tone,
              but the final message content and the decision to send are always yours.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. SMS Disclosures</h2>
            <p className="text-gray-700 leading-relaxed">
              Message frequency varies based on user actions (approximately one message per user action).
              Standard message and data rates may apply from your carrier. You may opt out at any time
              by replying <strong>STOP</strong> to unsubscribe or <strong>HELP</strong> for assistance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Legal Compliance and Indemnification</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">All-Party Consent Laws</h3>
                <p className="text-gray-700 leading-relaxed">
                  Some states, including California, Massachusetts, and Pennsylvania, require the consent
                  of all parties to a communication. <strong>You agree to use SafeTalk only in compliance
                  with applicable law</strong>, and you are responsible for obtaining and maintaining your
                  co-parent's consent where required.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Indemnification</h3>
                <p className="text-gray-700 leading-relaxed">
                  You release and hold harmless SafeTalk from any claims arising from your use of the
                  service without such consent, and you agree to indemnify SafeTalk for any costs,
                  claims, or damages that result from your failure to obtain required consents.
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                <p className="text-yellow-800 font-medium text-sm">
                  <strong>Important:</strong> Before using SafeTalk to communicate with your co-parent,
                  ensure you have their consent to record or process communications if required by your
                  state's laws. SafeTalk cannot provide legal advice regarding consent requirements.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Privacy and Data</h2>
            <p className="text-gray-700 leading-relaxed">
              We respect your privacy and handle your data in accordance with our
              <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
              Your communications are processed to provide our filtering service and improve
              the tone of co-parenting interactions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these terms or our service, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded mt-2">
              <p className="text-gray-700">
                <strong>Email:</strong> support@safetalk.example.com<br />
                <strong>SMS:</strong> Reply HELP to any SafeTalk message<br />
                <strong>Website:</strong> <Link href="/" className="text-blue-600 hover:underline">safetalk.example.com</Link>
              </p>
            </div>
          </section>

          <section className="border-t pt-6">
            <p className="text-sm text-gray-500">
              <strong>Last Updated:</strong> September 15, 2025<br />
              <strong>Version:</strong> 1.0 (SMS Opt-in Demo)
            </p>
          </section>
        </div>

        {/* Footer Navigation */}
        <div className="border-t mt-8 pt-6 flex justify-between">
          <Link
            href="/privacy-policy"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Privacy Policy →
          </Link>
          <Link
            href="/signup"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            Sign Up for SMS
          </Link>
        </div>
      </div>
    </div>
  );
}