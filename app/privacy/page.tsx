import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        {/* Header */}
        <div className="border-b pb-4 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
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
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <p className="text-green-800 font-medium">
              This is a placeholder Privacy Policy page for the SMS opt-in demonstration.
              In production, this would contain your complete privacy policy and data handling practices.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed">
              When you opt in to SafeTalk SMS services, we collect:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Your name and mobile phone number</li>
              <li>Email address (if provided)</li>
              <li>Timezone information for proper message delivery</li>
              <li>IP address and technical information for security</li>
              <li>SMS messages you send through our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Provide SMS communication filtering services</li>
              <li>Improve message tone and reduce conflict</li>
              <li>Ensure compliance with telecommunications regulations</li>
              <li>Provide customer support</li>
              <li>Maintain service security and prevent abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. SMS Consent and TCPA Compliance</h2>
            <p className="text-gray-700 leading-relaxed">
              Your SMS consent is collected through our web form with express written agreement.
              We comply with the Telephone Consumer Protection Act (TCPA) and maintain records
              of your consent including:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Timestamp of consent</li>
              <li>IP address and technical details</li>
              <li>Exact consent language shown</li>
              <li>Your agreement to receive SMS communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Opt out of SMS messages at any time by replying <strong>STOP</strong></li>
              <li>Request help by replying <strong>HELP</strong></li>
              <li>Access your personal information</li>
              <li>Request deletion of your data</li>
              <li>Update your communication preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures to protect your information,
              including encryption, secure servers, and access controls. Your SMS communications
              are processed securely and stored only as long as necessary to provide our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              For privacy-related questions or to exercise your rights, contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded mt-2">
              <p className="text-gray-700">
                <strong>Privacy Email:</strong> privacy@safetalk.example.com<br />
                <strong>SMS:</strong> Reply HELP to any SafeTalk message<br />
                <strong>Mailing Address:</strong> SafeTalk Privacy Team, [Address]
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
            href="/terms"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Terms of Service
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