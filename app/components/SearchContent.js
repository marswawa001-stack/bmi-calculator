'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const allCalculators = [
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'Health',
    description: 'Calculate your Body Mass Index and see your health category',
    path: '/bmi-calculator'
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    category: 'Health',
    description: 'Calculate your exact age in years, months, and days',
    path: '/age-calculator'
  },
];

export default function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allCalculators.filter(calc =>
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  return (
    <>
      {/* Search Input */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by name, category, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-4 border-2 border-indigo-200 rounded-lg focus:border-indigo-500 focus:outline-none text-lg text-gray-900"
          autoFocus
        />
      </div>

      {/* Results */}
      {searchQuery.trim() ? (
        <>
          {results.length > 0 ? (
            <div className="space-y-4">
              <p className="text-gray-600 font-medium mb-4">Found {results.length} result{results.length !== 1 ? 's' : ''}</p>
              {results.map((calc) => (
                <Link
                  key={calc.id}
                  href={calc.path}
                  className="block p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-indigo-500 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">{calc.name}</h3>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-600 font-medium rounded-full text-sm">
                      {calc.category}
                    </span>
                  </div>
                  <p className="text-gray-600">{calc.description}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No calculators found matching "{searchQuery}"</p>
              <p className="text-gray-500">Try searching with different keywords</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Start typing to search for calculators</p>
        </div>
      )}
    </>
  );
}
