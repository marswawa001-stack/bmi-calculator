import { ReactNode } from 'react';

export const metadata = {
  title: "Age Calculator - Calculate Your Exact Age in Years, Months, Weeks & Days",
  description: "Free online age calculator. The Age Calculator can determine the age or interval between two dates. Results displayed in years, months, weeks, days, hours, minutes, and seconds. Perfect for calculating age, anniversaries, and time intervals.",
  keywords: "age calculator, calculate age, how old am I, age in days, time between dates, date difference, age calculator between two dates",
  alternates: {
    canonical: "https://bmi-calculator.com/age-calculator",
  },
  openGraph: {
    title: "Age Calculator - Calculate Your Exact Age",
    description: "Calculate the exact age or time interval between two dates in years, months, weeks, days, hours, minutes, and seconds.",
    url: "https://bmi-calculator.com/age-calculator",
    siteName: "Free Online Calculators",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Age Calculator",
    description: "Calculate your exact age and time intervals between any two dates",
  },
};

export default function AgeCalculatorLayout({ children }) {
  return children;
}
