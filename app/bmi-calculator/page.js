import BMICalculatorContent from './BMICalculatorContent';
import CreatorCard from '../components/CreatorCard';

export const metadata = {
  title: "Free BMI Calculator - Calculate Your Body Mass Index Online",
  description: "Free, accurate BMI calculator based on WHO standards. Calculate your Body Mass Index in seconds. Supports metric (kg/cm) and imperial (lb/ft) units. Get instant results and personalized health recommendations.",
  keywords: "BMI calculator, body mass index, BMI online, free calculator, health calculator, weight calculator",
  alternates: {
    canonical: "https://bmi-calculator.com/bmi-calculator",
  },
  openGraph: {
    title: "Free BMI Calculator - Calculate Your Body Mass Index",
    description: "Calculate your BMI instantly with our free online calculator. Get personalized health recommendations based on WHO standards.",
    url: "https://bmi-calculator.com/bmi-calculator",
    siteName: "Free Online Calculators",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free BMI Calculator",
    description: "Calculate your Body Mass Index online for free",
  },
};

export default function BMICalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      {/* Schema Markup for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Free BMI Calculator",
        "description": "Calculate your Body Mass Index (BMI) using this free, accurate online calculator. Get instant results and health recommendations based on WHO standards.",
        "url": "https://bmi-calculator.com/bmi-calculator",
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
            💪 BMI Calculator
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Calculate your Body Mass Index based on WHO standards
          </p>
          <p className="text-gray-500 text-sm">
            Free, accurate, and instant results with personalized health recommendations
          </p>
        </div>

        {/* Creator Card */}
        <CreatorCard />

        {/* Calculator Content */}
        <BMICalculatorContent />

        {/* BMI Information Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Understanding BMI */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              📚 Understanding BMI
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <strong>Underweight:</strong> BMI less than 18.5
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <strong>Normal weight:</strong> BMI 18.5 to 24.9
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <strong>Overweight:</strong> BMI 25 to 29.9
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <div>
                  <strong>Obese:</strong> BMI 30 or greater
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
              <p className="text-sm text-gray-700">
                <strong>ℹ️ About BMI:</strong> BMI is a screening tool developed by the World Health Organization (WHO). It provides a general indicator of body composition for most people.
              </p>
            </div>
          </div>

          {/* BMI Limitations */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ⚠️ BMI Limitations
            </h2>
            
            <div className="space-y-3 text-gray-700 text-sm">
              <p>
                <strong>🏋️ Muscle Mass:</strong> BMI doesn't distinguish between muscle and fat. Athletes may have a high BMI despite being fit.
              </p>
              <p>
                <strong>🦴 Bone Density:</strong> Bone density variations aren't accounted for in BMI calculations.
              </p>
              <p>
                <strong>👶 Age Factor:</strong> BMI standards differ for children and may not apply equally across age groups.
              </p>
              <p>
                <strong>🌍 Ethnicity:</strong> Different ethnic groups may need different BMI thresholds for health risk assessment.
              </p>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <p className="text-sm text-gray-700">
                <strong>⚕️ Disclaimer:</strong> This calculator is for informational purposes only. Please consult a healthcare provider for personalized medical advice.
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
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What is BMI?
              </h3>
              <p className="text-gray-700">
                Body Mass Index (BMI) is a measure of body fat based on height and weight. It's calculated by dividing weight in kilograms by height in meters squared (kg/m²). The WHO uses BMI as a screening tool to identify potential weight problems in adults.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Is BMI accurate for everyone?
              </h3>
              <p className="text-gray-700">
                BMI is a useful screening tool but has limitations. It doesn't account for muscle mass, bone density, or body composition. Athletes, very muscular individuals, and children should not rely solely on BMI for health assessment.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                What's considered a healthy BMI?
              </h3>
              <p className="text-gray-700">
                According to WHO standards, a healthy BMI for adults is between 18.5 and 24.9. However, what's "healthy" can vary based on individual circumstances, fitness level, and medical history.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                How often should I calculate my BMI?
              </h3>
              <p className="text-gray-700">
                If you're tracking weight changes, calculating BMI monthly or quarterly is reasonable. Frequent daily or weekly checks aren't necessary as significant changes take time to occur.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Should I see a doctor about my BMI?
              </h3>
              <p className="text-gray-700">
                If your BMI falls outside the normal range (18.5-24.9), it's worth discussing with your healthcare provider. They can assess your individual situation and provide personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
