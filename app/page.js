'use client';

import { useState } from 'react';
import Script from 'next/script';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 'biology',
      name: 'Biology',
      count: 0,
      color: 'bg-teal-50 hover:bg-teal-100 border-teal-200',
      icon: (
        <svg className="w-12 h-12 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      count: 0,
      color: 'bg-pink-50 hover:bg-pink-100 border-pink-200',
      icon: (
        <svg className="w-12 h-12 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      id: 'construction',
      name: 'Construction',
      count: 0,
      color: 'bg-gray-50 hover:bg-gray-100 border-gray-200',
      icon: (
        <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: 'conversion',
      name: 'Conversion',
      count: 0,
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
      icon: (
        <svg className="w-12 h-12 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      id: 'ecology',
      name: 'Ecology',
      count: 0,
      color: 'bg-lime-50 hover:bg-lime-100 border-lime-200',
      icon: (
        <svg className="w-12 h-12 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'everyday',
      name: 'Everyday Life',
      count: 0,
      color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-200',
      icon: (
        <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'finance',
      name: 'Finance',
      count: 0,
      color: 'bg-green-50 hover:bg-green-100 border-green-200',
      icon: (
        <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'geometry',
      name: 'Geometry',
      count: 0,
      color: 'bg-rose-50 hover:bg-rose-100 border-rose-200',
      icon: (
        <svg className="w-12 h-12 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
    {
      id: 'health',
      name: 'Health',
      count: 2,
      color: 'bg-red-50 hover:bg-red-100 border-red-200',
      icon: (
        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      id: 'math',
      name: 'Math',
      count: 0,
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'physics',
      name: 'Physics',
      count: 0,
      color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
      icon: (
        <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'sports',
      name: 'Sports',
      count: 0,
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
      icon: (
        <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'statistics',
      name: 'Statistics',
      count: 0,
      color: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200',
      icon: (
        <svg className="w-12 h-12 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 'other',
      name: 'Other',
      count: 0,
      color: 'bg-slate-50 hover:bg-slate-100 border-slate-200',
      icon: (
        <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
    },
  ];

  const calculators = [
    { 
      id: 'bmi-calculator', 
      name: 'BMI Calculator', 
      categoryId: 'health',
      description: 'Calculate your Body Mass Index and understand your healthy weight range.'
    },
    { 
      id: 'age-calculator', 
      name: 'Age Calculator', 
      categoryId: 'health',
      description: 'Calculate your exact age in years, months, days, and even total weeks lived.'
    },
  ];

  const totalCalculators = categories.reduce((sum, cat) => sum + cat.count, 0);

  const filteredCategories = categories.filter(cat => {
    const categoryMatches = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
    const calculatorMatches = calculators.some(calc => 
      calc.categoryId === cat.id && 
      calc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return categoryMatches || calculatorMatches;
  });

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "CalculatorVast",
    "url": "https://www.calculatorvast.com",
    "description": "CalculatorVast offers 1000+ free online calculators for every industry and need.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.calculatorvast.com?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CalculatorVast",
    "url": "https://www.calculatorvast.com",
    "description": "Free online calculator tools for every industry",
    "sameAs": [
      "https://www.facebook.com/calculatorvast",
      "https://twitter.com/calculatorvast"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Schema.org Structured Data */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-center mb-12">
            Free {totalCalculators} Calculators for Every Need
          </h1>
          {/* Search Box */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search calculators or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 text-lg rounded-full shadow-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-300 placeholder-gray-500 bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-2"
                  aria-label="Clear search"
                  title="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <svg
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-indigo-500 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {searchQuery ? (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Search Results for "{searchQuery}"
            </h2>

            {/* Display matching calculators */}
            {calculators.filter(calc =>
              calc.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-700 mb-6">Calculators</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {calculators
                    .filter(calc =>
                      calc.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((calc) => {
                      const category = categories.find(c => c.id === calc.categoryId);
                      return (
                        <a
                          key={calc.id}
                          href={`/${calc.id}`}
                          className="group bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300"
                        >
                          <h4 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600">
                            {calc.name}
                          </h4>
                          <p className="text-gray-600 mb-2">
                            {calc.description}
                          </p>
                          <p className="text-gray-500 text-sm">
                            Category: <span className="font-medium">{category?.name}</span>
                          </p>
                        </a>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Display matching categories */}
            {filteredCategories.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-700 mb-6">Categories</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {filteredCategories.map((category) => {
                    return (
                      <a
                        key={category.id}
                        href={`/categories/${category.id}`}
                        className={`${category.color} border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col items-center text-center group`}
                      >
                        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                          {category.icon}
                        </div>

                        <h4 className="font-bold text-gray-800 mb-2 text-lg">
                          {category.name}
                        </h4>

                        <p className="text-gray-600 text-sm">
                          {category.count} {category.count === 1 ? 'calculator' : 'calculators'}
                        </p>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {filteredCategories.length === 0 && 
             calculators.filter(calc => calc.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-xl">
                  No results found for "{searchQuery}"
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Browse by Category
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {filteredCategories.map((category) => {
                return (
                  <a
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className={`${category.color} border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col items-center text-center group`}
                  >
                    <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>

                    <h3 className="font-bold text-gray-800 mb-2 text-lg">
                      {category.name}
                    </h3>

                    <p className="text-gray-600 text-sm">
                      {category.count} {category.count === 1 ? 'calculator' : 'calculators'}
                    </p>
                  </a>
                );
              })}
            </div>
          </>
        )}
      </div>

      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Popular Calculators
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="/bmi-calculator"
              className="group bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600">
                BMI Calculator
              </h3>
              <p className="text-gray-600">
                Calculate your Body Mass Index and understand your healthy weight range.
              </p>
            </a>

            <a
              href="/age-calculator"
              className="group bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600">
                Age Calculator
              </h3>
              <p className="text-gray-600">
                Calculate your exact age in years, months, days, and even total weeks lived.
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}