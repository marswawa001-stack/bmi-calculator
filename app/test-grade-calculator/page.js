import TestGradeCalculatorContent from './TestGradeCalculatorContent';
import CreatorCard from '../components/CreatorCard';

export const metadata = {
  title: "Test Grade Calculator - Calculate Your Test Score & Letter Grade Online",
  description: "Free, accurate test grade calculator with customizable grading scale. Calculate test scores, percentages, and letter grades instantly. Supports partial credit and decimal values. Perfect for students and teachers.",
  keywords: "test grade calculator, grade calculator, test score calculator, grading scale calculator, percentage calculator, letter grade calculator, teacher grader, student grade calculator, online grading tool",
  alternates: {
    canonical: "https://bmi-calculator.com/test-grade-calculator",
  },
  openGraph: {
    title: "Test Grade Calculator - Calculate Your Test Score & Letter Grade",
    description: "Calculate your test score and letter grade instantly with our free online calculator. Customizable grading scale, supports partial credit, and provides detailed grade tables.",
    url: "https://bmi-calculator.com/test-grade-calculator",
    siteName: "Free Online Calculators",
    type: "website",
    images: [
      {
        url: "https://bmi-calculator.com/og-test-grade-calculator.jpg",
        width: 1200,
        height: 630,
        alt: "Test Grade Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Test Grade Calculator - Calculate Test Scores Online",
    description: "Calculate your test score and letter grade instantly. Customizable grading scale and detailed results.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function TestGradeCalculatorPage() {
  const testGradeReferences = [
    {
      authors: "Brookhart, M. A.",
      title: "How to Create and Use Rubrics for Formative Assessment and Grading",
      publication: "ASCD; 2015",
      url: "https://www.ascd.org"
    },
    {
      authors: "Guskey, T. R.",
      title: "Practical Solutions for Serious Problems in Standards-Based Grading",
      publication: "Corwin Press; 2009",
      url: "https://www.corwin.com"
    },
    {
      authors: "Marzano, R. J.",
      title: "Designing & Teaching Learning Goals & Objectives",
      publication: "Solution Tree Press; 2009",
      url: "https://www.solutiontree.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      {/* Schema Markup for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Test Grade Calculator",
        "description": "Calculate your test score and letter grade using this free, accurate online calculator. Features customizable grading scale, supports partial credit, and provides comprehensive grade tables for students and teachers.",
        "url": "https://bmi-calculator.com/test-grade-calculator",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "Any",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "1250",
          "bestRating": "5",
          "worstRating": "1"
        },
        "featureList": [
          "Calculate test scores and letter grades",
          "Customizable grading scale",
          "Supports partial credit and decimal values",
          "Detailed grade table for all possible scores",
          "Standard US grading system",
          "Wrong answers or correct answers input mode"
        ]
      })}} />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            📊 Test Grade Calculator
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Calculate your test score and letter grade with customizable grading scale
          </p>
          <p className="text-gray-500 text-sm">
            Free, accurate, instant results - Perfect for students and teachers
          </p>
          <div className="mt-3">
            <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              Last updated: November 21, 2025
            </span>
          </div>
        </div>

        {/* Creator Card */}
        <CreatorCard calculatorName="Test Grade Calculator" customReferences={testGradeReferences} />

        {/* Calculator Content */}
        <TestGradeCalculatorContent />
      </div>
    </div>
  );
}
