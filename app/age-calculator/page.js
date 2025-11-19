import AgeCalculatorContent from './AgeCalculatorContent';
import CreatorCard from '../components/CreatorCard';

export default function AgeCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
      {/* Schema Markup for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Age Calculator",
        "description": "The Age Calculator can determine the age or interval between two dates. The calculated age will be displayed in years, months, weeks, days, hours, minutes, and seconds.",
        "url": "https://bmi-calculator.com/age-calculator",
        "applicationCategory": "HealthApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      })}} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🎂 Age Calculator
          </h1>
            <p className="text-gray-600 text-lg mb-2">
              The Age Calculator can determine the age or interval between two dates. The calculated age will be displayed in years, months, weeks, days, hours, minutes, and seconds.
            </p>
            <p className="text-gray-500 text-sm">
              Free, accurate, and instant results with multiple time interval formats
            </p>
          </div>

        {/* Creator Card */}
        <CreatorCard showSources={false} />

        {/* Calculator Content */}
        <AgeCalculatorContent />

        {/* Age Calculator Information Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* How to Use */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              📖 How to Use
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">1</div>
                <div>
                  <strong>Select Start Date:</strong> Choose the beginning date for your calculation.
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">2</div>
                <div>
                  <strong>Select End Date:</strong> Choose the ending date. Use "Set Today as End Date" for quick setup.
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">3</div>
                <div>
                  <strong>Click Calculate:</strong> Get the exact time difference in multiple formats.
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">4</div>
                <div>
                  <strong>View Results:</strong> See results in years, months, days, weeks, hours, minutes, and seconds.
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-400 rounded">
              <p className="text-sm text-gray-700">
                <strong>💡 Tip:</strong> Press Enter after selecting dates to calculate instantly without clicking the button.
              </p>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🎯 Common Use Cases
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <div>
                <strong className="text-purple-600">👶 Age Calculation:</strong>
                <p className="text-sm mt-1">Calculate your exact age in years, months, and days from your birth date to today.</p>
              </div>
              
              <div>
                <strong className="text-purple-600">💍 Anniversary Countdown:</strong>
                <p className="text-sm mt-1">Calculate how long you've been together or married from your start date to today.</p>
              </div>
              
              <div>
                <strong className="text-purple-600">📊 Project Duration:</strong>
                <p className="text-sm mt-1">Measure the exact time span of any project from start to completion.</p>
              </div>

              <div>
                <strong className="text-purple-600">⏳ Time Since Event:</strong>
                <p className="text-sm mt-1">Calculate how much time has passed since any important life event.</p>
              </div>

              <div>
                <strong className="text-purple-600">🎓 Experience Timeline:</strong>
                <p className="text-sm mt-1">Calculate total work experience, education duration, or skill mastery time.</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-pink-50 border-l-4 border-pink-400 rounded">
              <p className="text-sm text-gray-700">
                <strong>ℹ️ Accurate Results:</strong> Our Age Calculator uses precise date calculations to give you accurate results down to the second.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            ❓ Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                How accurate is the Age Calculator?
              </h3>
              <p className="text-gray-700">
                Our Age Calculator is highly accurate, calculating time intervals down to the second. It accounts for leap years and varying month lengths for precise results.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Can I calculate the time between any two dates?
              </h3>
              <p className="text-gray-700">
                Yes! The Age Calculator can calculate the time interval between any two dates. You're not limited to just birth dates. Use it for anniversaries, project timelines, and more.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                What time formats does the calculator display?
              </h3>
              <p className="text-gray-700">
                The calculator displays results in multiple formats: years/months/days, total months, weeks and days, total days, total hours, total minutes, and total seconds.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Is my data stored or tracked?
              </h3>
              <p className="text-gray-700">
                No. This is a client-side calculator that runs entirely in your browser. Your dates are never sent to any server and are not stored or tracked.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                What browsers are supported?
              </h3>
              <p className="text-gray-700">
                The Age Calculator works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. It's also fully responsive on mobile devices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
