'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        {/* 404 Error Code with Animation */}
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              404
            </div>
            <div className="absolute inset-0 text-9xl font-bold text-indigo-600 opacity-20 blur-2xl">
              404
            </div>
          </div>
        </div>

        {/* Emoji Animation */}
        <div className="mb-8 text-6xl animate-bounce">
          🔍
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Sorry, we can't find the page you're looking for.
        </p>
        <p className="text-gray-500 mb-8">
          The page may have been moved, deleted, or never existed.
        </p>

        {/* Helpful Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <p className="text-sm text-gray-600 mb-4">
            Here are some helpful options:
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <span className="text-gray-700">
              🏠 Go back to explore our calculators
            </span>
            <span className="text-gray-700">
              🔍 Use the search bar to find what you need
            </span>
            <span className="text-gray-700">
              📂 Browse our calculator categories
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Browse Categories
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex justify-center gap-4">
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Footer Text */}
        <p className="text-xs text-gray-500 mt-8">
          Error Code: 404 | Page Not Found
        </p>
      </div>
    </div>
  );
}
