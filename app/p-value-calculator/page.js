import PValueCalculatorContent from './PValueCalculatorContent';
import CreatorCard from '../components/CreatorCard';

export const metadata = {
  title: "P-Value Calculator with 9 Decimal Precision - Free Statistical Significance Tool",
  description: "High-precision p-value calculator with 9 decimal places accuracy. Calculate p-values for t-tests, z-tests, F-tests, and chi-square tests. Supports two-tailed, left-tailed, and right-tailed tests with customizable significance levels (α). Free professional statistical analysis tool.",
  keywords: "p-value calculator, 9 decimal precision, high precision p-value, statistical significance calculator, t-test calculator, z-test calculator, f-test calculator, F-ratio calculator, chi-square test, hypothesis testing, two-tailed test, one-tailed test, left-tailed test, right-tailed test, significance level alpha, accurate p-value, professional statistics tool, variance ratio test, ANOVA f-test",
  alternates: {
    canonical: "https://bmi-calculator.com/p-value-calculator",
  },
  openGraph: {
    title: "P-Value Calculator - 9 Decimal Precision | Free Statistical Tool",
    description: "Professional p-value calculator with 9 decimal places precision. Calculate accurate p-values for t-tests, z-tests, F-tests, and chi-square tests. Free statistical significance analysis tool.",
    url: "https://bmi-calculator.com/p-value-calculator",
    siteName: "Free Online Calculators",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "P-Value Calculator - 9 Decimal Precision",
    description: "High-precision p-value calculator with 9 decimal accuracy for professional statistical analysis",
  },
};

const pValueReferences = [
  {
    authors: "Wasserstein RL, Lazar NA.",
    title: "The ASA Statement on p-Values: Context, Process, and Purpose",
    publication: "The American Statistician. 2016;70(2):129-133",
    url: "https://www.tandfonline.com/doi/full/10.1080/00031305.2016.1154108"
  },
  {
    authors: "Greenland S, Senn SJ, Rothman KJ, et al.",
    title: "Statistical tests, P values, confidence intervals, and power: a guide to misinterpretations",
    publication: "European Journal of Epidemiology. 2016;31(4):337-350",
    url: "https://link.springer.com/article/10.1007/s10654-016-0149-3"
  },
  {
    authors: "Goodman S.",
    title: "A Dirty Dozen: Twelve P-Value Misconceptions",
    publication: "Seminars in Hematology. 2008;45(3):135-140",
    url: "https://www.sciencedirect.com/science/article/pii/S0037196308000620"
  },
  {
    authors: "Nuzzo R.",
    title: "Scientific method: Statistical errors",
    publication: "Nature. 2014;506(7487):150-152",
    url: "https://www.nature.com/articles/506150a"
  }
];

export default function PValueCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
      {/* Schema Markup for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "P-Value Calculator - 9 Decimal Precision",
        "description": "High-precision p-value calculator with 9 decimal places accuracy. Calculate p-values for t-tests, z-tests, F-tests, and chi-square tests. Supports customizable significance levels and multiple test directions.",
        "url": "https://bmi-calculator.com/p-value-calculator",
        "applicationCategory": "EducationalApplication",
        "featureList": [
          "9 decimal places precision",
          "T-test p-value calculation",
          "Z-test p-value calculation",
          "F-test (F-Ratio) p-value calculation",
          "Chi-square test p-value calculation",
          "Two-tailed, left-tailed, and right-tailed tests",
          "Customizable significance levels (α = 0.10, 0.05, 0.01, 0.001)",
          "Statistical decision support"
        ],
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
            P-Value Calculator
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            High-Precision Statistical Significance Calculator with 9 Decimal Places Accuracy
          </p>
          <p className="text-gray-500 text-sm">
            Professional p-value calculator for t-tests, z-tests, F-tests, and chi-square tests • Supports two-tailed, left-tailed, and right-tailed tests
          </p>
          <div className="mt-3 inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
            <span className="text-purple-700 font-semibold text-sm">✨ 9 Decimal Precision</span>
            <span className="text-purple-600 text-xs">• Customizable α levels</span>
          </div>
          <div className="mt-3">
            <span className="inline-block bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
              Last updated: November 21, 2025
            </span>
          </div>
        </div>

        {/* Creator Card */}
        <CreatorCard calculatorName="P-Value Calculator" showSources={true} customReferences={pValueReferences} />

        {/* Calculator Content */}
        <PValueCalculatorContent />

        {/* Educational Content Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Understanding P-Values in Statistical Testing
          </h2>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                What is a P-Value?
              </h3>
              <p className="mb-3">
                In statistical hypothesis testing, the p-value serves as a crucial metric for decision-making. It quantifies the probability of observing your experimental data—or results even more unusual—when the null hypothesis holds true. Think of it as asking: "If there truly were no effect, how surprising would my data be?"
              </p>
              <p className="mb-3">
                This probability calculation assumes a specific world where the null hypothesis (H₀) is correct. Lower p-values suggest your observed data would be quite unusual in that world, providing grounds to question whether the null hypothesis accurately describes reality.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="text-sm">
                  <strong>Key Concept:</strong> The p-value measures data compatibility with the null hypothesis, not the probability that the null hypothesis is true. This distinction is fundamental to proper statistical interpretation.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                How to Calculate P-Values from Test Statistics
              </h3>
              <p className="mb-3">
                The calculation process involves comparing your test statistic against its theoretical probability distribution. Each statistical test has an associated distribution:
              </p>
              <ul className="list-none space-y-3 mb-4">
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <div>
                    <strong>Z-Score:</strong> Uses the standard normal distribution N(0,1). Appropriate when population standard deviation is known or sample sizes exceed 30.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <div>
                    <strong>T-Statistic:</strong> Follows the t-distribution with specified degrees of freedom. Essential when working with smaller samples or unknown population variance.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <div>
                    <strong>Chi-Square (χ²):</strong> Applied in categorical data analysis, goodness-of-fit tests, and variance testing. Distribution shape depends on degrees of freedom.
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 font-bold mr-2">•</span>
                  <div>
                    <strong>F-Ratio:</strong> Used for comparing variances and in ANOVA. Requires two degrees of freedom parameters (numerator and denominator).
                  </div>
                </li>
              </ul>
              <p>
                Our calculator handles the mathematical complexity, using cumulative distribution functions to transform your test statistic into an accurate p-value with 9 decimal precision.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Interpreting Your P-Value Results
              </h3>
              <p className="mb-3">
                Interpretation requires comparing your p-value against a pre-determined significance level (α), commonly set at 0.05, though this varies by discipline:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-bold text-red-700 mb-2">When p &lt; α</h4>
                  <p className="text-sm text-gray-700">
                    Reject the null hypothesis. Your data provides statistically significant evidence for an effect. However, significance doesn't automatically mean practical importance.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-lg border border-gray-300">
                  <h4 className="font-bold text-gray-700 mb-2">When p ≥ α</h4>
                  <p className="text-sm text-gray-700">
                    Fail to reject the null hypothesis. Insufficient evidence exists to claim a statistically significant effect, though this doesn't prove the null hypothesis true.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <p className="text-sm">
                  <strong>⚠️ Common Pitfall:</strong> A p-value of 0.049 versus 0.051 shouldn't drastically change your conclusions. Statistical significance is not a binary concept—consider the entire context of your research, including effect sizes and confidence intervals.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Understanding Test Directions: One-Tailed vs. Two-Tailed
              </h3>
              <p className="mb-3">
                Your research question determines which test direction to use:
              </p>
              
              <div className="space-y-3">
                <div className="border-l-4 border-purple-400 pl-4">
                  <strong className="text-purple-700">Two-Tailed Tests:</strong>
                  <p className="text-sm mt-1">
                    Detect effects in either direction. Use when you're testing for "difference" without predicting which direction. More conservative and generally preferred in scientific research.
                  </p>
                </div>
                <div className="border-l-4 border-green-400 pl-4">
                  <strong className="text-green-700">Right-Tailed Tests:</strong>
                  <p className="text-sm mt-1">
                    Test if your parameter is greater than the reference value. Appropriate when you have strong theoretical reasons to expect an increase.
                  </p>
                </div>
                <div className="border-l-4 border-blue-400 pl-4">
                  <strong className="text-blue-700">Left-Tailed Tests:</strong>
                  <p className="text-sm mt-1">
                    Test if your parameter is less than the reference value. Use when expecting a decrease based on prior knowledge or theory.
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm italic">
                Note: One-tailed tests yield smaller p-values (more likely to reach significance) but require justification. Choose your test direction before seeing the data to avoid bias.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Using This P-Value Calculator
              </h3>
              <p className="mb-3">
                Follow these steps for accurate results:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-3">
                <li>Select your statistical test type (z, t, chi-square, or F)</li>
                <li>Choose the appropriate test direction (two-tailed, left-tailed, or right-tailed)</li>
                <li>Set your significance level α (typically 0.05)</li>
                <li>Enter your calculated test statistic and degrees of freedom</li>
                <li>Click "Calculate P-Value" to obtain results with 9-decimal precision</li>
              </ol>
              <p>
                The calculator automatically compares your p-value to α and provides a statistical decision recommendation, along with an interpretation of the evidence strength.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Practical Examples by Test Type
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">Z-Test Example</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    A pharmaceutical company tests whether a new drug lowers blood pressure. With a sample of 100 patients, they calculate z = -2.58. Using a two-tailed test at α = 0.05:
                  </p>
                  <p className="text-sm text-gray-600">
                    Input: z-statistic = -2.58 → p-value ≈ 0.00988. Since p &lt; 0.05, the drug shows statistically significant effect.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">T-Test Example</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Researchers compare test scores between two teaching methods (15 students each). They obtain t = 2.14 with df = 28. Using a two-tailed test:
                  </p>
                  <p className="text-sm text-gray-600">
                    Input: t = 2.14, df = 28 → p-value ≈ 0.0412. Significant at α = 0.05 level, suggesting the teaching methods differ.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-800 mb-2">Chi-Square Example</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    Testing whether observed categorical frequencies match expected distributions. With χ² = 7.815 and df = 3:
                  </p>
                  <p className="text-sm text-gray-600">
                    Input: χ² = 7.815, df = 3 (right-tailed) → p-value ≈ 0.0499. Borderline significant, suggesting deviation from expected distribution.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                  <h4 className="font-bold text-orange-800 mb-2">F-Test Example</h4>
                  <p className="text-sm text-gray-700 mb-2">
                    ANOVA comparing three diet groups. With F = 3.89, df1 = 2, df2 = 27:
                  </p>
                  <p className="text-sm text-gray-600">
                    Input: F = 3.89, df1 = 2, df2 = 27 (right-tailed) → p-value ≈ 0.0328. Significant difference exists among the diet groups.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            ❓ Frequently Asked Questions About P-Values
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-purple-700 mb-2">
                Can a p-value tell me if my results are important?
              </h3>
              <p className="text-gray-700">
                No. Statistical significance (low p-value) and practical significance are different concepts. A study with thousands of participants might show a statistically significant but tiny effect that lacks real-world importance. Always examine effect sizes and confidence intervals alongside p-values to assess practical relevance.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-700 mb-2">
                Why shouldn't I just use p &lt; 0.05 for everything?
              </h3>
              <p className="text-gray-700">
                The 0.05 threshold is conventional, not universal. Fields like particle physics use much stricter thresholds (p &lt; 0.0000003), while exploratory social science might accept p &lt; 0.10. Your significance level should reflect the consequences of false positives versus false negatives in your specific context. Set α before collecting data, not after seeing results.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-700 mb-2">
                What's wrong with interpreting p = 0.03 as "3% chance the null hypothesis is true"?
              </h3>
              <p className="text-gray-700">
                This is a common misinterpretation. The p-value is P(data | H₀), not P(H₀ | data). It tells you how likely your data would be if H₀ were true, not how likely H₀ is given your data. The probability that H₀ is true cannot be determined from p-values alone—that requires Bayesian analysis with prior probabilities.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-700 mb-2">
                When should I use a one-tailed test instead of a two-tailed test?
              </h3>
              <p className="text-gray-700">
                Use one-tailed tests only when you have strong theoretical or practical reasons to test for effects in one direction only, and when effects in the opposite direction would be treated identically to no effect. Since one-tailed tests have more statistical power but risk missing important opposite-direction effects, two-tailed tests are the safer default choice for most research.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-700 mb-2">
                How does sample size affect my p-value?
              </h3>
              <p className="text-gray-700">
                Larger samples produce smaller p-values for the same effect size. This means with huge datasets, you might find statistically significant results (small p-values) for trivially small effects. Conversely, small samples might fail to detect important effects (large p-values) due to insufficient statistical power. This is why reporting effect sizes and confidence intervals is crucial alongside p-values.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-700 mb-2">
                What if my p-value is exactly 0.05000?
              </h3>
              <p className="text-gray-700">
                When p-value equals your α threshold exactly, convention typically treats this as marginally significant (reject H₀). However, this highlights the arbitrary nature of threshold-based decisions. Results at the boundary deserve cautious interpretation, additional replication, and careful consideration of the broader evidence rather than mechanical application of decision rules.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-700 mb-2">
                Do I need different degrees of freedom for different tests?
              </h3>
              <p className="text-gray-700">
                Yes. T-tests use df = n - 1 for one-sample tests or df = n₁ + n₂ - 2 for two-sample tests. Chi-square tests use df = (rows - 1) × (columns - 1) for independence tests or df = categories - 1 for goodness-of-fit. F-tests require two df values: df1 (numerator) and df2 (denominator). Each test type has specific formulas for calculating degrees of freedom.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-700 mb-2">
                Can I calculate a p-value without knowing the test statistic?
              </h3>
              <p className="text-gray-700">
                No. This calculator requires the test statistic (z, t, χ², or F) as input. If you have raw data, you'll first need to calculate the test statistic using appropriate formulas or statistical software. The test statistic summarizes the relationship between your sample data and the null hypothesis, serving as the necessary input for p-value calculation.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-700 mb-2">
                How precise should I report my p-value?
              </h3>
              <p className="text-gray-700">
                For most scientific publications, reporting p-values to 3-4 decimal places is sufficient (e.g., p = 0.0234). For very small p-values, you can report them as p &lt; 0.001 or p &lt; 0.0001. Our calculator provides 9-decimal precision for accuracy, but excessive precision in reporting can create a false sense of exactness. Round sensibly based on your field's conventions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-purple-700 mb-2">
                What's the difference between chi-square test directions?
              </h3>
              <p className="text-gray-700">
                Unlike t-tests and z-tests, chi-square tests are most commonly right-tailed (testing for goodness-of-fit or independence). However, when testing variance of a normal distribution, you might use two-tailed or left-tailed tests. Right-tailed tests check if observed frequencies deviate more than expected, while left-tailed tests (rare) check if variance is smaller than expected. Choose based on your specific hypothesis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
