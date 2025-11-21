'use client';

import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  const categories = [
    {
      id: 'biology',
      name: 'Biology',
      color: 'text-teal-500',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      color: 'text-pink-500',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      id: 'construction',
      name: 'Construction',
      color: 'text-gray-500',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: 'conversion',
      name: 'Conversion',
      color: 'text-purple-500',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      id: 'ecology',
      name: 'Ecology',
      color: 'text-lime-500',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0110.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'everyday',
      name: 'Everyday Life',
      color: 'text-yellow-500',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'finance',
      name: 'Finance',
      color: 'text-green-500',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'geometry',
      name: 'Geometry',
      color: 'text-rose-500',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      id: 'health',
      name: 'Health',
      color: 'text-red-500',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      id: 'math',
      name: 'Math',
      color: 'text-blue-500',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'physics',
      name: 'Physics',
      color: 'text-indigo-500',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'sports',
      name: 'Sports',
      color: 'text-orange-500',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'statistics',
      name: 'Statistics',
      color: 'text-cyan-500',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 'other',
      name: 'Other',
      color: 'text-slate-500',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 py-12 pb-4">
        <div className="space-y-3">
          {/* 品牌区域 */}
          <div className="text-center">
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Logo className="w-10 h-10" />
                <h3 className="text-3xl font-bold">
                  <span className="text-indigo-600">CALCULATOR</span>
                  {' '}
                  <span className="text-purple-600">VAST</span>
                </h3>
              </div>
              <p className="text-indigo-400 text-3xl font-bold mx-auto">
                Count on us for all.
              </p>
            </div>
          </div>

          {/* 分类导航 - 流式标签布局 */}
          <div className="text-center">
            <h4 className="inline-block bg-pink-500 text-white font-bold text-sm px-2.5 py-0.5 rounded-full mb-3">Categories</h4>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/${category.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-indigo-500 transition-colors text-xs border border-gray-700"
                >
                  <span className={`${category.color}`}>
                    {category.icon}
                  </span>
                  <span>{category.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* About 和 Legal - 一字排开 */}
          <div className="text-center">
            <h4 className="inline-block bg-purple-500 text-white font-bold text-sm px-2.5 py-0.5 rounded-full mb-2">Resources</h4>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto mt-1">
              <Link href="/about" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-indigo-500 transition-colors text-xs border border-gray-700">
                About Me
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-indigo-500 transition-colors text-xs border border-gray-700">
                Contact
              </Link>
              <Link href="/privacy-policy" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-indigo-500 transition-colors text-xs border border-gray-700">
                Privacy Policy
              </Link>
              <Link href="/terms-of-use" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-indigo-500 transition-colors text-xs border border-gray-700">
                Terms of Use
              </Link>
            </div>

            {/* 社交媒体图标 */}
            <div className="flex justify-center gap-3 mt-4">
              <a href="https://www.facebook.com/CalculatorVast" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-500 transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://x.com/CalculatorVast" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-500 transition-colors" aria-label="X">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.17-6.763-5.91 6.763h-3.308l7.73-8.835L2.56 2.25h6.6l4.69 6.197 5.594-6.197zM16.966 19.75h1.829L7.084 4.126H5.117l11.849 15.624z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/frank-zhao-ba82a9392/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-500 transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.736 0-9.646h3.554v1.348c.429-.645 1.196-1.565 2.922-1.565 2.135 0 3.734 1.39 3.734 4.38v5.483zM5.337 7.433c-1.144 0-1.915-.748-1.915-1.682 0-.951.765-1.684 1.959-1.684 1.188 0 1.914.733 1.939 1.684 0 .934-.751 1.682-1.983 1.682zm1.581 13.019H3.656V9.806h3.262v10.646zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 底部栏 */}
      <div className="max-w-7xl mx-auto px-4 py-2 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <p className="text-center text-xs md:text-sm text-gray-500">&copy; 2025 CalculatorVast. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
