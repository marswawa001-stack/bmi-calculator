import { Suspense } from 'react';
import Link from 'next/link';
import SearchContent from '../components/SearchContent';

function SearchLoading() {
  return (
    <div className="text-center py-12">
      <p className="text-gray-600 text-lg">Loading...</p>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">Search Calculators</h1>
          <p className="text-gray-600">Find the calculator you need</p>
        </div>

        {/* Search Content with Suspense */}
        <Suspense fallback={<SearchLoading />}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
