'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors mb-8">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: November 18, 2024</p>
          <div className="h-1 w-24 bg-indigo-600 rounded mt-4"></div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              CalculatorVast is committed to protecting your privacy. This Privacy Policy explains how CalculatorVast collects, uses, discloses, and safeguards your information when you visit the website at www.calculatorvast.com (the "Website").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information CalculatorVast Collects</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Information You Provide Directly</h3>
                <p>When you contact CalculatorVast through the contact form or email, the following information may be collected:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                  <li>Your name</li>
                  <li>Your email address</li>
                  <li>Your message content</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
                <p>When you use the Website, CalculatorVast may automatically collect:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-2">
                  <li>Browser type and version</li>
                  <li>IP address</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring website</li>
                  <li>Device information</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How CalculatorVast Uses Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              CalculatorVast uses the information collected for various purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
              <li>To provide and improve our services</li>
              <li>To respond to your inquiries and requests</li>
              <li>To send you newsletters or updates (with your consent)</li>
              <li>To analyze website usage and trends</li>
              <li>To detect and prevent fraud or security issues</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Storage and Security</h2>
            <p className="text-gray-700 leading-relaxed">
              CalculatorVast implements appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is completely secure. CalculatorVast cannot guarantee absolute security of your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed">
              The Website may use cookies and similar tracking technologies to enhance your experience. Cookies are small files stored on your device that help CalculatorVast remember your preferences and understand how you use the site. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed">
              The Website may use third-party services for analytics (such as Google Analytics) and other functionalities. These third parties may collect information about your visit to the Website. CalculatorVast encourages you to review their privacy policies to understand their data practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-2">
              <li>Right to access your personal information</li>
              <li>Right to correct inaccurate data</li>
              <li>Right to request deletion of your data</li>
              <li>Right to opt-out of communications</li>
              <li>Right to data portability</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              To exercise these rights, please contact CalculatorVast at support@calculatorvast.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              CalculatorVast is not intended for children under the age of 13. CalculatorVast does not knowingly collect personal information from children under 13. If CalculatorVast becomes aware that such information has been collected, steps will be taken to delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              CalculatorVast may update this Privacy Policy from time to time to reflect changes in its practices or legal requirements. Notification of significant changes will be provided by posting the updated policy on the Website and updating the "Last updated" date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this Privacy Policy or CalculatorVast's privacy practices, please{' '}
              <Link href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">
                visit the contact page
              </Link>.
            </p>
          </section>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
