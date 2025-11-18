'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const categoryData = {
  health: {
    name: 'Health',
    icon: '❤️',
    description: 'Health-related calculators to help you monitor and maintain your wellbeing',
    color: 'from-red-50 to-red-100',
    textColor: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconBg: 'bg-red-100',
    calculators: [
      {
        id: 'bmi-calculator',
        name: 'BMI Calculator',
        description: 'Calculate your Body Mass Index and see your health category',
        icon: '💪',
        path: '/bmi-calculator',
        popular: true,
        uses: 15420
      },
      {
        id: 'age-calculator',
        name: 'Age Calculator',
        description: 'Calculate your exact age in years, months, and days',
        icon: '🎂',
        path: '/age-calculator',
        popular: false,
        uses: 8530
      }
    ]
  },
  finance: {
    name: 'Finance',
    icon: '💰',
    description: 'Financial calculators for budgeting, investing, and more',
    color: 'from-green-50 to-green-100',
    textColor: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconBg: 'bg-green-100',
    calculators: []
  },
  math: {
    name: 'Math',
    icon: '📐',
    description: 'Mathematical calculators for various calculations',
    color: 'from-blue-50 to-blue-100',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-100',
    calculators: []
  },
  conversion: {
    name: 'Conversion',
    icon: '🔄',
    description: 'Unit conversion calculators for everyday measurements',
    color: 'from-purple-50 to-purple-100',
    textColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconBg: 'bg-purple-100',
    calculators: []
  },
  everyday: {
    name: 'Everyday Life',
    icon: '🏠',
    description: 'Calculators for everyday tasks and needs',
    color: 'from-yellow-50 to-yellow-100',
    textColor: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    iconBg: 'bg-yellow-100',
    calculators: []
  },
  sports: {
    name: 'Sports',
    icon: '⚽',
    description: 'Sports-related calculators and performance metrics',
    color: 'from-orange-50 to-orange-100',
    textColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    iconBg: 'bg-orange-100',
    calculators: []
  },
  physics: {
    name: 'Physics',
    icon: '⚛️',
    description: 'Physics calculators for scientific computations',
    color: 'from-indigo-50 to-indigo-100',
    textColor: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    iconBg: 'bg-indigo-100',
    calculators: []
  },
  chemistry: {
    name: 'Chemistry',
    icon: '🧪',
    description: 'Chemistry calculators for chemical calculations',
    color: 'from-pink-50 to-pink-100',
    textColor: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    iconBg: 'bg-pink-100',
    calculators: []
  },
  biology: {
    name: 'Biology',
    icon: '🧬',
    description: 'Biology calculators for life science calculations',
    color: 'from-teal-50 to-teal-100',
    textColor: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    iconBg: 'bg-teal-100',
    calculators: []
  },
  construction: {
    name: 'Construction',
    icon: '🏗️',
    description: 'Construction calculators for building and design',
    color: 'from-gray-50 to-gray-100',
    textColor: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    iconBg: 'bg-gray-100',
    calculators: []
  },
  ecology: {
    name: 'Ecology',
    icon: '🌱',
    description: 'Environmental and ecology related calculators',
    color: 'from-lime-50 to-lime-100',
    textColor: 'text-lime-600',
    bgColor: 'bg-lime-50',
    borderColor: 'border-lime-200',
    iconBg: 'bg-lime-100',
    calculators: []
  },
  statistics: {
    name: 'Statistics',
    icon: '📊',
    description: 'Statistical analysis calculators',
    color: 'from-cyan-50 to-cyan-100',
    textColor: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    iconBg: 'bg-cyan-100',
    calculators: []
  },
  geometry: {
    name: 'Geometry',
    icon: '📐',
    description: 'Geometric shape and area calculators',
    color: 'from-rose-50 to-rose-100',
    textColor: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    iconBg: 'bg-rose-100',
    calculators: []
  },
  other: {
    name: 'Other',
    icon: '🎯',
    description: 'Other useful calculators',
    color: 'from-slate-50 to-slate-100',
    textColor: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    iconBg: 'bg-slate-100',
    calculators: []
  }
};

export default function CategoryPage() {
  const params = useParams();
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
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{calc.uses?.toLocaleString()} uses</span>
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
                href={`/categories/${related.id}`}
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
