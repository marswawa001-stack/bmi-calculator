'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Me</h1>
          <div className="h-1 w-24 bg-indigo-600 rounded"></div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Profile Section with Photo */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12 pb-8 border-b border-gray-200">
            <div className="flex-shrink-0">
              <Image
                src="/frank-zhao.jpg"
                alt="Frank Zhao"
                width={200}
                height={200}
                className="w-40 h-40 md:w-48 md:h-48 rounded-2xl shadow-lg object-cover"
                priority
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Frank Zhao</h2>
              <p className="text-lg text-indigo-600 font-semibold mb-4">Full-Stack Developer & Creator of CalculatorVast</p>
              <p className="text-gray-600 mb-3">
                Based in <strong>Xi'an, China</strong> - The Ancient Capital
              </p>
              <p className="text-gray-600 mb-6">
                Full-time maintainer of CalculatorVast, passionate about IT and programming
              </p>
              
              {/* Social Media Links */}
              <div className="flex gap-4">
                <a href="https://www.facebook.com/CalculatorVast/about" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="https://x.com/CalculatorVast" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 bg-black text-white hover:bg-gray-800 rounded-lg transition-colors" aria-label="X (Twitter)">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.17-6.763-5.91 6.763h-3.308l7.73-8.835L2.56 2.25h6.6l4.69 6.197 5.594-6.197zM16.966 19.75h1.829L7.084 4.126H5.117l11.849 15.624z" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/frank-zhao-ba82a9392/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.646h3.554v1.348c.429-.645 1.196-1.565 2.922-1.565 2.135 0 3.734 1.39 3.734 4.38v5.483zM5.337 7.433c-1.144 0-1.915-.748-1.915-1.682 0-.951.765-1.684 1.959-1.684 1.188 0 1.914.733 1.939 1.684 0 .934-.751 1.682-1.983 1.682zm1.581 13.019H3.656V9.806h3.262v10.646zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Hello, I'm Frank Zhao</h2>
              <p>
                Welcome to CalculatorVast! I'm Frank Zhao, a passionate developer and full-time maintainer of this platform, based in Xi'an, China - one of the world's most ancient and vibrant cities. As the sole founder and operator of CalculatorVast, I'm personally dedicated to creating the most reliable and comprehensive calculator platform available.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">My Journey & Background</h2>
              <p className="mb-4">
                I graduated from Northeastern University with a degree in Marketing, which gave me valuable insights into understanding user needs and creating solutions that truly matter. However, my true passion has always been in IT and programming. Over the years, this passion grew into a mission: to create a platform where people can access accurate, reliable calculation tools without barriers.
              </p>
              <p>
                That mission led to the creation of CalculatorVast. What started as a personal project has become my full-time commitment. Every single day, I'm working to expand this platform, improve existing calculators, and bring new tools to life.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">My Commitment to Quality</h2>
              <p className="mb-4">
                One thing I'm extremely proud of is the accuracy and reliability of every calculator on CalculatorVast. I don't just build tools and publish them - I thoroughly research and study each formula. For every calculator you see here, I've:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2 mb-4">
                <li>Carefully researched the underlying mathematical principles</li>
                <li>Studied professional literature and academic sources</li>
                <li>Tested multiple implementations for accuracy</li>
                <li>Verified results against industry standards</li>
              </ul>
              <p>
                This is my personal guarantee: every formula, every calculation, every tool on this platform has been meticulously researched and validated before it reaches you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Why CalculatorVast?</h2>
              <p className="mb-4">
                As a one-person operation, I pour my heart into every aspect of this platform:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Thoroughly Researched:</strong> Every formula is verified against professional sources</li>
                <li><strong>Completely Free:</strong> All tools are free with no hidden charges or ads</li>
                <li><strong>Fast & Accurate:</strong> Get instant, reliable results you can trust</li>
                <li><strong>Easy to Use:</strong> Simple, intuitive interface for everyone</li>
                <li><strong>No Installation:</strong> Access from any device with a browser</li>
                <li><strong>Privacy First:</strong> Your data is never stored or shared</li>
                <li><strong>Personally Maintained:</strong> I actively maintain and improve every calculator</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">What I Offer</h2>
              <p className="mb-4">
                I'm continuously developing and expanding CalculatorVast to include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Health & Wellness Tools:</strong> BMI Calculator, Age Calculator, and more</li>
                <li><strong>Financial Calculators:</strong> Loan calculators, investment tools, and financial analysis</li>
                <li><strong>Conversion Tools:</strong> Unit conversions for length, weight, temperature, and beyond</li>
                <li><strong>Science & Math:</strong> Physics, Chemistry, Biology, and Statistical calculations</li>
                <li><strong>Construction & Design:</strong> Building and estimation tools</li>
                <li><strong>And More:</strong> Covering everyday needs, sports, geometry, and specialized domains</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">My Passion & Mission</h2>
              <p>
                I'm deeply passionate about IT and programming, and CalculatorVast is my way of applying that passion to create something truly useful for the world. Working full-time on this platform, I'm committed to making it the best calculator platform available. Your trust means everything to me, and I work tirelessly every day to honor that trust through quality, accuracy, and continuous improvement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Let's Connect</h2>
              <p>
                I'd love to hear from you! Whether you have feedback, feature requests, suggestions for improvements, or just want to share your experience with CalculatorVast, feel free to <Link href="/contact" className="text-indigo-600 hover:text-indigo-700 font-medium">contact me</Link>. As a one-person team, your input is invaluable and directly helps shape the future of CalculatorVast.
              </p>
            </section>
          </div>

          {/* CTA Button */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Calculators
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
