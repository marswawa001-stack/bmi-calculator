'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FeedbackButton from './FeedbackButton';

export default function CreatorCard({ showSources = true, customReferences = null, calculatorName = 'Calculator' }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const defaultReferences = [
    {
      authors: "Nuttall FQ.",
      title: "Body Mass Index: Obesity, BMI, and Health: A Critical Review.",
      publication: "Nutrition Today; May 2015",
      url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4890841/"
    },
    {
      authors: "Aune D, Sen A, Prasad M, Norat T, Janszky I, Tonstad S, Romundstad P, Vatten LJ.",
      title: "BMI and all cause mortality: systematic review and non-linear dose-response meta-analysis of 230 cohort studies with 3.74 million deaths among 30.3 million participants.",
      publication: "BMJ; May 2016",
      url: "https://pubmed.ncbi.nlm.nih.gov/27146380/"
    }
  ];
  
  const references = customReferences || defaultReferences;

  return (
    <div className="mt-8 mb-8">
      {/* Creator Info Card */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-4">
        <div className="flex flex-col items-center gap-6">
          {/* Avatar with Feedback Badge */}
          <div className="flex-shrink-0 relative">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
              <Image
                src="/frank-zhao.jpg"
                alt="Frank Zhao - Creator"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Feedback Badge Button */}
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="absolute -top-1 -right-1 w-8 h-8 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group"
              title="Send us your feedback"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              {/* Pulse animation */}
              <span className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-75"></span>
            </button>
          </div>

          {/* Creator Info - Centered */}
          <div className="flex items-center gap-2 justify-center">
            <span className="inline-block px-2 py-1 bg-pink-500 text-white rounded text-xs font-bold">Creator</span>
            <Link href="/about" className="inline-block px-2 py-1 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 transition">
              Frank Zhao
            </Link>
            <a
              href="https://www.facebook.com/CalculatorVast"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-4 h-4 text-blue-600 hover:text-blue-800 transition"
              title="Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://x.com/CalculatorVast"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-4 h-4 text-gray-800 hover:text-gray-600 transition"
              title="X"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.17-6.763-5.91 6.763h-3.308l7.73-8.835L2.56 2.25h6.6l4.69 6.197 5.594-6.197zM16.966 19.75h1.829L7.084 4.126H5.117l11.849 15.624z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/frank-zhao-ba82a9392/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-4 h-4 text-blue-600 hover:text-blue-800 transition"
              title="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Sources Dropdown - Only show if showSources is true */}
      {showSources && (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">📖</span>
            <span className="text-gray-800 font-medium">Based on {references.length} sources</span>
          </div>
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <ol className="space-y-3 list-decimal list-inside">
              {references.map((ref, index) => (
                <li key={index} className="text-sm text-gray-700">
                  <span>{ref.authors} </span>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    {ref.title}
                  </a>
                  <span>; {ref.publication}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      )}

      {/* Feedback Modal - Render FeedbackButton's modal */}
      {isFeedbackOpen && (
        <FeedbackButton 
          calculatorName={calculatorName}
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
        />
      )}
    </div>
  );
}
