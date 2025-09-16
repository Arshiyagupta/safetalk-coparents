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
            <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Message Processing</h2>
            <p className="text-gray-700 leading-relaxed">
              With your consent, SafeTalk processes and stores communications solely to filter and deliver messages.
              Our processing includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Analyzing message content for tone and sentiment</li>
              <li>Filtering inappropriate or inflammatory language</li>
              <li>Suggesting alternative phrasings to improve communication</li>
              <li>Storing communications temporarily for delivery and quality purposes</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              <strong>Important:</strong> No message is ever sent without your explicit approval.
              All SafeTalk messages are 100% user-initiated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">3. Suggested Messages</h2>
            <p className="text-gray-700 leading-relaxed">
              SafeTalk may suggest responses to help improve communication tone and reduce conflict.
              However, <strong>you control final content and the decision to send</strong>. Our suggestion
              process involves:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Analyzing incoming messages for appropriate response options</li>
              <li>Generating alternative phrasings that maintain your intent</li>
              <li>Providing tone improvements while preserving your message</li>
              <li>Offering multiple options for you to choose from or modify</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              You always have the final say on message content and whether to send it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">4. How We Use Your Information</h2>
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
            <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Consent Records</h2>
            <p className="text-gray-700 leading-relaxed">
              We log opt-in details (timestamp, IP, user agent, and phone number) for telecom compliance.
              Your SMS consent is collected through our web form with express written agreement for all
              four required consent categories. We comply with the Telephone Consumer Protection Act (TCPA)
              and maintain detailed records of your consent including:
            </p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              <li>Consent timestamp (server time in UTC)</li>
              <li>IP address and technical details for verification</li>
              <li>User agent and browser information</li>
              <li>Exact consent language version shown (v4.1-2025-09-15)</li>
              <li>Individual confirmation for each of the four consent categories</li>
              <li>Your phone number and contact information</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              These records are maintained for compliance purposes and to demonstrate that
              consent was properly obtained for all SMS communications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Your Rights and Choices</h2>
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
            <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures to protect your information,
              including encryption, secure servers, and access controls. Your SMS communications
              are processed securely and stored only as long as necessary to provide our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Mobile Information Sharing Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>TCPA Compliance:</strong> We do not share mobile contact information with third parties or affiliates for marketing or promotional purposes. Information may be shared with subcontractors in support services, such as customer service. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Contact Us</h2>
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