import Script from 'next/script';
import './globals.css';  // 👈 关键！引入 CSS

export const metadata = {
  title: "Free Online Calculators - BMI, Age & More",
  description: "Free online calculators for BMI, age calculation, and more. Fast, accurate, and easy to use.",
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
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">
                🧮 Free Calculators
              </a>
              <div className="flex gap-6">
                <a 
                  href="/bmi-calculator" 
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                >
                  💪 BMI
                </a>
                <a 
                  href="/age-calculator" 
                  className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
                >
                  🎂 Age
                </a>
              </div>
            </div>
          </div>
        </nav>
        
        {/* 页面内容 */}
        {children}
      </body>
    </html>
  );
}