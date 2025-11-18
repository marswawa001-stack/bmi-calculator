import Script from 'next/script';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import './globals.css';  // 👈 关键！引入 CSS

export const metadata = {
  title: "Free Online Calculators - BMI, Age & More",
  description: "Free online calculators for BMI, age calculation, and more. Fast, accurate, and easy to use.",
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