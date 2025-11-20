'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CreatorCard({ showSources = true, customReferences = null }) {
  const [isExpanded, setIsExpanded] = useState(false);

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
        <div className="flex gap-6 items-center">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
              <Image
                src="/frank-zhao.jpg"
                alt="Frank Zhao - Creator"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Creator Info */}
          <div className="flex-1 flex flex-col justify-center space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-block px-2 py-1 bg-pink-500 text-white rounded text-xs font-bold">Creator</span>
              <span className="text-gray-800 text-sm">Frank Zhao</span>
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
            <p className="text-gray-600 text-sm">
              <span className="inline-block px-2 py-0.5 bg-pink-500 text-white rounded text-xs font-bold mr-2">Background</span>
              Northeastern University
            </p>
            <p className="text-gray-600 text-sm">
              <span className="inline-block px-2 py-0.5 bg-pink-500 text-white rounded text-xs font-bold mr-2">Passion</span>
              Full-Stack Engineering
            </p>
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
    </div>
  );
}
