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
              href="/opt-in"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              ← Back to Opt-In
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
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. SMS Communications</h2>
            <p className="text-gray-700 leading-relaxed">
              By opting in to our SMS service, you agree to receive text messages from SafeTalk
              to facilitate co-parenting communication. Message frequency varies based on your
              communication needs. Standard messaging and data rates may apply from your carrier.
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              You may opt out at any time by replying <strong>STOP</strong> to any message.
              For help, reply <strong>HELP</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Privacy and Data</h2>
            <p className="text-gray-700 leading-relaxed">
              We respect your privacy and handle your data in accordance with our
              <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
              Your communications are processed to provide our filtering service and improve
              the tone of co-parenting interactions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Contact Information</h2>
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
            href="/privacy"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Privacy Policy →
          </Link>
          <Link
            href="/opt-in"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            Opt In to SMS
          </Link>
        </div>
      </div>
    </div>
  );
}