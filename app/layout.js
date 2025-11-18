import Script from 'next/script';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './globals.css';

export const metadata = {
  title: "Free Online Calculators - Math, Finance, Health & More",
  description: "Free online calculators for math, finance, health, science and more.",
  keywords: "free calculator, online calculator, math calculator, finance calculator, health calculator, science calculator, unit converter, instant calculator, free online tools",
  authors: [{ name: "CalculatorVast" }],
  creator: "CalculatorVast",
  publisher: "CalculatorVast",
  metadataBase: new URL("https://www.calculatorvast.com"),
  alternates: {
    canonical: "https://www.calculatorvast.com",
  },
  openGraph: {
    title: "Free Online Calculators - Math, Finance, Health & More",
    description: "Free online calculators for math, finance, health, science and more.",
    url: "https://www.calculatorvast.com",
    siteName: "CalculatorVast",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://www.calculatorvast.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "CalculatorVast - Free Online Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Calculators - Math, Finance, Health & More",
    description: "Free online calculators for math, finance, health, science and more.",
    image: "https://www.calculatorvast.com/og-image.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9264675301602447"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased">
        {/* 导航栏 */}
        <Navigation />
        
        {/* 页面内容 */}
        {children}

        {/* 页脚 */}
        <Footer />
      </body>
    </html>
  );
}