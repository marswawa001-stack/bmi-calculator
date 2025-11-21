import BMICalculatorContent from './BMICalculatorContent';
import CreatorCard from '../components/CreatorCard';

export const metadata = {
  title: "BMI Calculator - Calculate Your Body Mass Index Online",
  description: "Free, accurate BMI calculator based on WHO standards. Calculate your Body Mass Index in seconds. Supports metric (kg/cm) and imperial (lb/ft) units. Get instant results and personalized health recommendations.",
  keywords: "BMI calculator, body mass index, BMI online, free calculator, health calculator, weight calculator",
  alternates: {
    canonical: "https://bmi-calculator.com/bmi-calculator",
  },
  openGraph: {
    title: "BMI Calculator - Calculate Your Body Mass Index",
    description: "Calculate your BMI instantly with our free online calculator. Get personalized health recommendations based on WHO standards.",
    url: "https://bmi-calculator.com/bmi-calculator",
    siteName: "Free Online Calculators",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMI Calculator",
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
        "name": "BMI Calculator",
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
            BMI Calculator
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Calculate your Body Mass Index based on WHO standards
          </p>
          <p className="text-gray-500 text-sm">
            Free, accurate, and instant results with personalized health recommendations
          </p>
          <div className="mt-3">
            <span className="inline-block bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
              Last updated: November 21, 2025
            </span>
          </div>
        </div>

        {/* Creator Card */}
        <CreatorCard calculatorName="BMI Calculator" />

        {/* Calculator Content */}
        <BMICalculatorContent />


      </div>
    </div>
  );
}
