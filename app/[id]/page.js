'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { categoryData } from '../utils/categoryData';

export default function CategoryPage() {
  const params = useParams();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady || !params.id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const category = categoryData[params.id];

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // 获取相关分类
  const relatedCategories = Object.entries(categoryData)
    .filter(([key]) => key !== params.id)
    .slice(0, 3)
    .map(([key, value]) => ({ id: key, ...value }));

  return (
    <div className={`min-h-screen bg-gradient-to-br ${category.color} py-12 px-4`}>
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link href="/" className={`inline-flex items-center gap-2 ${category.textColor} font-medium hover:opacity-75 transition-opacity mb-6`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Category Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className={`text-5xl ${category.iconBg} rounded-2xl p-3`}>
              {category.icon}
            </div>
            <div>
              <h1 className={`text-5xl font-bold ${category.textColor}`}>
                {category.name}
              </h1>
              <p className="text-gray-600 mt-2">
                {category.calculators.length} calculator{category.calculators.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            {category.description}
          </p>
        </div>

        {/* Search in Category */}
        {/* Removed - redundant with navigation search bar */}

        {/* 计算器网格 */}
        {category.calculators.length > 0 ? (
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.calculators.map((calc) => (
                <Link
                  key={calc.id}
                  href={calc.path}
                  className={`group ${category.bgColor} border-2 ${category.borderColor} rounded-xl p-6 hover:shadow-xl transition-all duration-200 hover:-translate-y-1`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{calc.icon}</div>
                    {calc.popular && (
                      <span className={`px-2 py-1 ${category.textColor} ${category.iconBg} text-xs font-bold rounded-full`}>
                        Popular
                      </span>
                    )}
                  </div>
                  <h3 className={`text-xl font-bold ${category.textColor} mb-2 group-hover:opacity-75 transition-opacity`}>
                    {calc.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {calc.description}
                  </p>
                  <div className="flex items-center justify-end">
                    <svg className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className={`${category.bgColor} border-2 ${category.borderColor} rounded-xl p-12 text-center mb-16`}>
            <p className="text-gray-600 text-lg mb-4">Coming soon! Calculators for {category.name} will be available soon.</p>
            <Link href="/" className="inline-block px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors">
              Explore Other Categories
            </Link>
          </div>
        )}

        {/* Related Categories */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🔍 Related Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCategories.map((related) => (
              <Link
                key={related.id}
                href={`/${related.id}`}
                className={`${related.bgColor} border-2 ${related.borderColor} rounded-xl p-6 hover:shadow-lg transition-all hover:-translate-y-1`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{related.icon}</span>
                  <h3 className={`text-lg font-bold ${related.textColor}`}>
                    {related.name}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {related.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
