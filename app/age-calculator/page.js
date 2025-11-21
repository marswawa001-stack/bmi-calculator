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
            <div className="mt-3">
              <span className="inline-block bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                Last updated: November 21, 2025
              </span>
            </div>
          </div>

        {/* Creator Card */}
        <CreatorCard calculatorName="Age Calculator" showSources={false} />

        {/* Calculator Content */}
        <AgeCalculatorContent />

        {/* Understanding Age Calculation */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Understanding Your Age: More Than Just a Number
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Ever wondered <strong>"Exactly how old am I?"</strong> or <strong>"How much time has passed since my birth?"</strong> This tool provides comprehensive answers by calculating the precise duration between any two dates you choose.
            </p>
            
            <p className="mb-4">
              Your age represents the total duration you've existed in this world, measured from your birth moment. Most cultures count age starting from zero at birth, incrementing by one each year on your birthday anniversary.
            </p>

            <p className="mb-6">
              Our calculator goes beyond simple yearly counts. It breaks down your lifespan into multiple time units, giving you fascinating perspectives on the passage of time:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6 bg-purple-50 p-6 rounded-lg">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">🎯</span>
                  <span>Calculate exact age from birth</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">📆</span>
                  <span>Convert age to total days lived</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">🗓️</span>
                  <span>Find total months of existence</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">⏰</span>
                  <span>Discover weeks you've experienced</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">⚡</span>
                  <span>Count every second of your life</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">🔮</span>
                  <span>Predict age at future dates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to Use the Age Calculator */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Getting Started: Calculate Your Age in Seconds
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Using this calculator is straightforward. Follow these simple steps to discover your exact age:
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start bg-blue-50 p-4 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">1</div>
                <div>
                  <strong className="text-blue-900">Input Your Birth Information:</strong>
                  <p className="text-gray-700 mt-1">Type your birth date directly or use the calendar picker (📅 icon) for easy selection. The format is month/day/year.</p>
                </div>
              </div>

              <div className="flex items-start bg-blue-50 p-4 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">2</div>
                <div>
                  <strong className="text-blue-900">Add Birth Time for Precision:</strong>
                  <p className="text-gray-700 mt-1">Want accuracy down to the minute? Enable "Include time" and enter your birth hour. Without this, we'll calculate from midnight of your birth date.</p>
                </div>
              </div>

              <div className="flex items-start bg-blue-50 p-4 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">3</div>
                <div>
                  <strong className="text-blue-900">Choose Your End Point:</strong>
                  <p className="text-gray-700 mt-1">By default, we use today's date. Keep it to find your current age, or change it to calculate age at any past or future date.</p>
                </div>
              </div>

              <div className="flex items-start bg-blue-50 p-4 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm mr-4 flex-shrink-0">4</div>
                <div>
                  <strong className="text-blue-900">Review Instant Results:</strong>
                  <p className="text-gray-700 mt-1">Your age appears automatically in years/months/days format, plus convenient conversions to weeks, hours, minutes, and even seconds!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calculate Age From Date of Birth */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Manual Age Calculation: The Math Behind It
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Curious about how we calculate age? Here's the mathematical process. Imagine someone born on November 8, 2002, and we're calculating their age on February 25, 2024:
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold text-lg mb-3 text-purple-900">Breaking Down the Calculation:</h3>
              
              <div className="space-y-4">
                <div className="pl-4 border-l-4 border-purple-400">
                  <strong className="text-purple-700">First: Find Complete Years</strong>
                  <p className="mt-1">Look at the most recent birthday that has passed:<br/>
                  Most recent birthday: November 8, 2023<br/>
                  Years elapsed: 2023 - 2002 = <strong className="text-purple-600">21 years</strong></p>
                </div>

                <div className="pl-4 border-l-4 border-pink-400">
                  <strong className="text-pink-700">Second: Calculate Full Months</strong>
                  <p className="mt-1">Count complete months since the last birthday:<br/>
                  November 8, 2023 → February 8, 2024 = <strong className="text-pink-600">3 months</strong></p>
                </div>

                <div className="pl-4 border-l-4 border-blue-400">
                  <strong className="text-blue-700">Third: Add Extra Days</strong>
                  <p className="mt-1">Calculate remaining days in the current month:<br/>
                  February 8 to February 25 = <strong className="text-blue-600">17 days</strong></p>
                </div>

                <div className="pl-4 border-l-4 border-green-400 bg-green-50 p-3 rounded">
                  <strong className="text-green-700">Complete Age:</strong>
                  <p className="mt-1 text-lg"><strong className="text-green-600">21 years, 3 months, and 17 days</strong></p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 italic">
              🔧 Pro tip: Our calculator automatically adjusts for leap years and different month lengths, so you don't need to worry about February having 28 or 29 days!
            </p>
          </div>
        </div>

        {/* Common Questions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Quick Age Estimate */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Quick Method: Estimate Age from Birth Year
            </h2>
            
            <div className="text-gray-700 space-y-3">
              <p>
                When you only know the birth year (not the exact date), you can get a rough age estimate using simple subtraction.
              </p>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="font-bold mb-2">Example: Born in 1999</p>
                <p className="font-mono text-lg">Current Year (2025) - Birth Year (1999) = <strong className="text-purple-600">~26 years</strong></p>
              </div>

              <p className="text-sm">
                <strong>Important:</strong> This method provides an approximation only. The actual age could vary by one year depending on whether the birthday has occurred in the current year. For precise calculations, input the complete birth date above.
              </p>
            </div>
          </div>

          {/* Future Age Prediction */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Predicting Your Future Age
            </h2>
            
            <div className="text-gray-700 space-y-3">
              <p>
                Planning for retirement or a special milestone? Calculate how old you'll be at any future date by entering your birth date and the target future date.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-bold mb-2">Sample Calculation:</p>
                <p className="text-sm">Birth Date: March 4, 2005</p>
                <p className="text-sm">Target Date: January 1, 2050</p>
                <p className="text-sm mt-2">Your Age: <strong className="text-blue-600">44 years, 9 months, 28 days</strong></p>
              </div>

              <p className="text-sm">
                Perfect for planning significant birthdays, retirement dates, or seeing how old you'll be when major events occur!
              </p>
            </div>
          </div>
        </div>

        {/* Time Unit Conversions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            View Your Age in Different Time Units
          </h2>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              Wondering about your age in days, weeks, or even seconds? Our tool automatically converts your age into multiple time measurements, giving you unique insights into your lifespan.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">📅</div>
                <div className="font-bold text-purple-900">Standard Format</div>
                <div className="text-sm text-purple-700 mt-1">Years, months & days</div>
              </div>

              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-bold text-blue-900">Daily Count</div>
                <div className="text-sm text-blue-700 mt-1">Total days lived</div>
              </div>

              <div className="bg-gradient-to-br from-pink-100 to-pink-50 p-4 rounded-lg text-center">
                <div className="text-3xl mb-2">⏱️</div>
                <div className="font-bold text-pink-900">Precise Time</div>
                <div className="text-sm text-pink-700 mt-1">Hours, minutes & seconds</div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="font-bold text-green-900 mb-2">Time Span Example: 15-Year Period</p>
              <p className="text-green-800">Select any starting date, then choose a date 15 years later. The result shows roughly <strong>5,479 days</strong> (the exact number varies due to leap years in the period).</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            💬 Common Questions About Age Calculation
          </h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Can I find out the total days I've lived?
              </h3>
              <div className="text-gray-700 space-y-2">
                <p>Absolutely! Here's the process:</p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Input your birth date in the first field</li>
                  <li>Keep today's date in the second field</li>
                  <li>Check the "Total Days" value in the results</li>
                </ol>
                <p className="mt-3 text-sm bg-purple-50 p-3 rounded">
                  <strong>Real Example:</strong> Someone born January 1, 2000 will have lived approximately 9,131 days by January 1, 2025!
                </p>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                What's the month count for a 3-year period?
              </h3>
              <p className="text-gray-700">
                Any 3-year duration equals exactly <strong className="text-purple-600">36 months</strong>. This remains constant regardless of leap years, since leap years only add extra days, not months. The 12-month annual cycle never changes.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                At 10,000 days old, what's my age in years?
              </h3>
              <p className="text-gray-700">
                Approximately <strong className="text-purple-600">27 years and 4-5 months</strong> old. The precise answer fluctuates slightly based on how many leap years fall within that period. For an exact calculation, use our tool with a date 10,000 days before today.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                If born in 1964, what's the current age?
              </h3>
              <p className="text-gray-700">
                In 2025, individuals born in 1964 are either <strong className="text-purple-600">60 or 61 years old</strong>. Those who've celebrated their 2025 birthday are 61; those still awaiting it remain 60.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Which birth year applies to current 21-year-olds?
              </h3>
              <p className="text-gray-700">
                In 2025, 21-year-olds were born in either <strong className="text-purple-600">2003 or 2004</strong>. Birth year 2004 applies if their birthday has passed this year; 2003 if their birthday is still upcoming in 2025.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Are leap years factored into calculations?
              </h3>
              <p className="text-gray-700">
                Yes! Our calculator automatically recognizes leap years (occurring every 4 years) and adjusts the day count accordingly. This ensures maximum accuracy in all date calculations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
