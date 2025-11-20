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
            📊 P-Value Calculator
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
        </div>

        {/* Creator Card */}
        <CreatorCard showSources={true} customReferences={pValueReferences} />

        {/* Calculator Content */}
        <PValueCalculatorContent />

        {/* P-Value Information Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* What is P-Value */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              📚 Understanding P-Value
            </h2>
            
            <div className="space-y-4 text-gray-700 text-sm">
              <p>
                A <strong>p-value</strong> is the probability of obtaining results at least as extreme as the observed data, assuming the null hypothesis is true.
              </p>
              
              <div className="flex items-start">
                <div className="w-3 h-3 bg-purple-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                <div>
                  <strong>p &lt; 0.001:</strong> Very strong evidence against null hypothesis
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-3 h-3 bg-purple-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                <div>
                  <strong>p &lt; 0.05:</strong> Commonly used significance threshold
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-3 h-3 bg-purple-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                <div>
                  <strong>p &gt; 0.1:</strong> Insufficient evidence to reject null hypothesis
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-400 rounded">
              <p className="text-sm text-gray-700">
                <strong>💡 Important:</strong> P-value does NOT represent the probability that the null hypothesis is true. It measures the strength of evidence against it.
              </p>
            </div>
          </div>

          {/* Supported Tests */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🧪 Supported Tests
            </h2>
            
            <div className="space-y-4">
              <div>
                <strong className="text-purple-600">z-Test</strong>
                <p className="text-sm text-gray-700 mt-1">Test hypotheses about population means with known standard deviation.</p>
              </div>
              
              <div>
                <strong className="text-purple-600">t-Test</strong>
                <p className="text-sm text-gray-700 mt-1">Compare means between two groups or one group vs. a known value.</p>
              </div>
              
              <div>
                <strong className="text-purple-600">Chi-Square Test</strong>
                <p className="text-sm text-gray-700 mt-1">Assess independence or goodness-of-fit for categorical data. Supports left-tailed, right-tailed, and two-tailed tests.</p>
              </div>
              
              <div>
                <strong className="text-purple-600">F-Test (F-Ratio)</strong>
                <p className="text-sm text-gray-700 mt-1">Compare variances between two groups. Used in ANOVA and regression analysis.</p>
              </div>

              <div>
                <strong className="text-purple-600">One-Tailed & Two-Tailed</strong>
                <p className="text-sm text-gray-700 mt-1">Directional or non-directional hypothesis testing. All tests support two-tailed, left-tailed, and right-tailed options.</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg">
              <p className="text-sm font-semibold text-purple-800 mb-2">
                ⚡ High Precision Results
              </p>
              <p className="text-sm text-gray-700">
                Our calculator provides <strong>9 decimal places precision</strong>, ensuring accuracy for even the most demanding statistical analyses. Perfect for research, academic work, and professional applications.
              </p>
            </div>            <div className="mt-6 p-4 bg-pink-50 border-l-4 border-pink-400 rounded">
              <p className="text-sm text-gray-700">
                <strong>📝 Tip:</strong> Select your test type and enter the test statistic along with degrees of freedom to get your p-value instantly.
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
                What does a p-value of 0.05 mean?
              </h3>
              <p className="text-gray-700">
                A p-value of 0.05 means there is a 5% probability of observing your data (or more extreme) if the null hypothesis were true. It's a commonly used threshold for statistical significance, but it's arbitrary and context-dependent.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Should I always use 0.05 as my significance level?
              </h3>
              <p className="text-gray-700">
                No. The choice of significance level (alpha) depends on your field, the cost of errors, and the research context. Some fields use 0.01 or 0.10. Always decide on alpha before conducting your test.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                What's the difference between one-tailed and two-tailed tests?
              </h3>
              <p className="text-gray-700">
                A one-tailed test checks for an effect in a specific direction. A two-tailed test checks for effects in both directions. Two-tailed tests are more conservative (higher p-values) and are preferred unless you have a strong directional hypothesis.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Can a small p-value prove my hypothesis is correct?
              </h3>
              <p className="text-gray-700">
                No. A small p-value only provides evidence against the null hypothesis. It doesn't prove your alternative hypothesis or establish causation. Always consider effect size, confidence intervals, and the broader research context.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                How accurate is this calculator?
              </h3>
              <p className="text-gray-700">
                This calculator uses well-established numerical approximations for statistical distributions. Results are accurate to 6 decimal places. For critical research decisions, consider using professional statistical software like R, Python (scipy), or SPSS.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                What if I don't have a test statistic yet?
              </h3>
              <p className="text-gray-700">
                You can calculate test statistics from raw data using dedicated statistical software. This calculator helps you get the p-value once you have the test statistic and degrees of freedom. Always report both the test statistic and p-value in your results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
