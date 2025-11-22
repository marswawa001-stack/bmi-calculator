import AveragePercentageCalculatorContent from './AveragePercentageCalculatorContent';
import CreatorCard from '../components/CreatorCard';

export { metadata } from './metadata';

export default function AveragePercentageCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      {/* Schema Markup for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Average Percentage Calculator",
        "description": "Calculate the average of multiple percentages easily. Supports both simple average and weighted average calculations.",
        "url": "https://bmi-calculator.com/average-percentage-calculator",
        "applicationCategory": "MathApplication",
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
            Average Percentage Calculator
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Calculate simple or weighted average of percentages
          </p>
        </div>

        {/* Creator Card */}
        <div className="mb-8">
          <CreatorCard showSources={false} />
        </div>

        {/* Main Calculator Content */}
        <AveragePercentageCalculatorContent />

        {/* Additional Content / SEO Text */}
        <div className="mt-12 space-y-8">
          {/* What is Average Percentage Calculator */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What is the Average Percentage Calculator?</h2>
            <p className="text-gray-700 mb-4">
              The Average Percentage Calculator is a straightforward tool designed to help you compute the average of multiple percentages. Whether you're dealing with student grades, business metrics, or research data, this calculator handles both simple and weighted average scenarios. It removes the guesswork from percentage averaging and delivers instant, accurate results.
            </p>
            <p className="text-gray-700 mb-4">
              Many people assume that averaging percentages works like averaging regular numbers—just add them up and divide. However, this approach often leads to inaccurate results when the percentages represent groups of different sizes. This is where weighted averaging comes into play, and our calculator makes it effortless.
            </p>
          </div>

          {/* Understanding Simple vs Weighted Average */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Simple Average vs Weighted Average</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3">Simple Average</h3>
                <p className="text-gray-700 mb-3">
                  Use this when each percentage has equal weight or importance. For example, if three team members each completed different tasks and scored 85%, 90%, and 80%, the simple average is (85 + 90 + 80) ÷ 3 = 85%. This method treats all values equally regardless of how many items or people each percentage represents.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-3">Weighted Average</h3>
                <p className="text-gray-700 mb-3">
                  Use this when percentages represent different group sizes. For instance, if 80% of 50 customers are satisfied but only 40% of 200 customers are satisfied, you can't simply average 80% and 40% to get 60%. You must "weight" each percentage by how many people it represents: (80×50 + 40×200) ÷ (50+200) = 53.3%. Weighted averaging ensures larger groups don't get overlooked.
                </p>
              </div>
            </div>
          </div>

          {/* How to Use the Calculator */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Use This Calculator: Quick Start Guide</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">1</div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800 mb-2">Enter Your Percentages</h3>
                  <p className="text-gray-700">
                    Input your first percentage value in the "Percent #1" field. You can use decimal values (like 75.5) for precision. The calculator starts with two fields but you can add more as needed.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">2</div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800 mb-2">Decide on Weighted Calculation (Optional)</h3>
                  <p className="text-gray-700">
                    At the bottom of the calculator, check "Allow different sample sizes" if your percentages represent different quantities. This reveals sample size fields next to each percentage input, allowing you to specify how many items or people each percentage represents.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">3</div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800 mb-2">Add More Entries If Needed</h3>
                  <p className="text-gray-700">
                    If you need to average more than two percentages, check "Add more entries?" and select your desired number (up to 10 percentages). New input fields will appear instantly for each additional percentage.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">4</div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800 mb-2">View Your Result Instantly</h3>
                  <p className="text-gray-700">
                    As soon as you enter valid percentage values, the average appears in the result box above. No need to click a calculate button—it updates automatically as you type.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">5</div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800 mb-2">Copy or Clear as Needed</h3>
                  <p className="text-gray-700">
                    Once you have your result, you can copy it to your clipboard with a single click. Use the "clear all changes" button anytime to reset the calculator and start fresh with a new calculation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Real-World Applications */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Real-World Applications of Average Percentage</h2>
            
            <div className="space-y-8 text-gray-700">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">📚 Academic & Education</h3>
                <p className="mb-3">
                  Teachers and students regularly combine scores from different assessments with different weights. A midterm exam (40% of grade) scored at 78% shouldn't affect your GPA the same way as a homework assignment (10% of grade) scored at 95%. Weighted averaging ensures your final grade reflects the true importance of each assessment component.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">💼 Corporate Performance Management</h3>
                <p className="mb-3">
                  When companies evaluate performance across offices, departments, or time periods with different volumes, weighted averages provide honest metrics. A customer satisfaction score from a branch serving 1,000 clients carries more weight than one from a branch serving 50 clients when calculating true company-wide satisfaction.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">🏥 Clinical & Healthcare Metrics</h3>
                <p className="mb-3">
                  Medical research relies on accurate averaging of outcomes from studies with different participant numbers or procedures performed at different frequencies. A 95% success rate from 10 surgeries shouldn't equal a 95% rate from 1,000 surgeries when analyzing overall performance.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">📊 Survey & Statistical Analysis</h3>
                <p className="mb-3">
                  Market researchers, pollsters, and data analysts often combine responses from multiple demographic groups. A survey response rate of 92% from a large urban center and 45% from a rural location requires weighted averaging to fairly represent the true combined rate across the entire surveyed population.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">⚙️ Quality Control & Manufacturing</h3>
                <p className="mb-3">
                  Quality assurance teams track defect rates across different production lines or time periods. A 2% defect rate from a high-volume production line should count differently than a 2% rate from a low-volume specialty line when calculating factory-wide quality metrics.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">🎓 Portfolio & Investment Analysis</h3>
                <p className="mb-3">
                  Investors calculate weighted average returns based on portfolio composition. An investment returning 20% on $10,000 contributes differently to your overall portfolio performance than the same 20% return on $100,000. Weighted averaging reflects your true blended return.
                </p>
              </div>
            </div>
          </div>

          {/* Key Differences Explained */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 md:p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Weighted Average Matters: A Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr className="bg-white border-b-2 border-blue-300">
                    <th className="text-left px-4 py-3 font-semibold">Aspect</th>
                    <th className="text-left px-4 py-3 font-semibold">Simple Average</th>
                    <th className="text-left px-4 py-3 font-semibold">Weighted Average</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">When to Use</td>
                    <td className="px-4 py-3">All values have equal importance</td>
                    <td className="px-4 py-3">Values represent different quantities</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium">Sample Size Matters?</td>
                    <td className="px-4 py-3">No</td>
                    <td className="px-4 py-3">Yes</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Example Scenario</td>
                    <td className="px-4 py-3">Three students with scores 90%, 80%, 85%</td>
                    <td className="px-4 py-3">90% of 30 students, 80% of 70 students</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium">Calculation</td>
                    <td className="px-4 py-3">(90+80+85)÷3 = 85%</td>
                    <td className="px-4 py-3">(90×30+80×70)÷100 = 82%</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium">Risk of Inaccuracy</td>
                    <td className="px-4 py-3">High when group sizes differ</td>
                    <td className="px-4 py-3">Accounts for group size properly</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Pro Tips for Accurate Average Percentage Calculation</h2>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="text-2xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Know Your Data Source</h3>
                  <p className="text-gray-700 text-sm">Before calculating, understand whether your percentages represent equal groups or different quantities. This determines whether you use simple or weighted averaging.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-2xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Verify Your Sample Sizes</h3>
                  <p className="text-gray-700 text-sm">When using weighted average, double-check that your sample sizes are accurate. Small errors in sample size can significantly affect the final result, especially with large differences in group sizes.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-2xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Use Decimal Precision</h3>
                  <p className="text-gray-700 text-sm">For critical calculations (medical, financial, academic), use decimal values (like 87.5% instead of 87%) to maintain accuracy through the calculation process.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-2xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Consider Context</h3>
                  <p className="text-gray-700 text-sm">The "right" answer depends on your question. Sometimes stakeholders care about simple average, sometimes weighted. Be clear about your calculation method when reporting results.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="text-2xl">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Keep Historical Records</h3>
                  <p className="text-gray-700 text-sm">Screenshot or document your results with the input values. This helps verify calculations later and provides transparency for analysis or reporting purposes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Q: Can I average percentages above 100% or negative percentages?</h3>
                <p className="text-gray-700">A: Yes! While unusual, the calculator accepts any percentage value. This is useful for analyzing percentage changes (gains/losses) or statistical analyses that might produce values outside the typical 0-100% range.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Q: What's the maximum number of percentages I can average?</h3>
                <p className="text-gray-700">A: This calculator supports up to 10 percentages. For larger datasets, you might want to group data or use spreadsheet software like Excel with the AVERAGE or WEIGHTED AVERAGE functions.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Q: How do I know if I need weighted averaging?</h3>
                <p className="text-gray-700">A: Use weighted averaging when your percentages are derived from different quantities. Ask yourself: "Does this percentage represent a different number of items, people, or samples than the others?" If yes, use weighted averaging.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Q: What if some of my sample sizes are zero?</h3>
                <p className="text-gray-700">A: The calculator will skip sample sizes of zero (or empty fields) and only calculate based on entries with valid values. This is useful when you don't have data for every category.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Q: Can I use this for calculating GPA?</h3>
                <p className="text-gray-700">A: Absolutely! If your school uses percentage grades, you can calculate your weighted GPA by entering each course percentage and weighting by credit hours. Note: Some schools use letter grades; you'd need to convert those to percentages first.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
