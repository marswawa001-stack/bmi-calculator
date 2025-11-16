'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navigation() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const menuButtonRef = useRef(null);
  const searchInputRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  // 所有计算器数据
  const allCalculators = [
    {
      id: 'bmi-calculator',
      name: 'BMI Calculator',
      category: 'Health',
      path: '/bmi-calculator'
    },
    {
      id: 'age-calculator',
      name: 'Age Calculator',
      category: 'Health',
      path: '/age-calculator'
    },
    // 可以添加更多计算器
  ];

  const categories = [
    { id: 'biology', name: 'Biology' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'construction', name: 'Construction' },
    { id: 'conversion', name: 'Conversion' },
    { id: 'ecology', name: 'Ecology' },
    { id: 'everyday', name: 'Everyday Life' },
    { id: 'finance', name: 'Finance' },
    { id: 'geometry', name: 'Geometry' },
    { id: 'health', name: 'Health' },
    { id: 'math', name: 'Math' },
    { id: 'physics', name: 'Physics' },
    { id: 'sports', name: 'Sports' },
    { id: 'statistics', name: 'Statistics' },
    { id: 'other', name: 'Other' },
  ];

  // 搜索处理
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = allCalculators.filter(calc =>
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered.slice(0, 8)); // 最多显示 8 个结果
      setShowDropdown(true);
      setSelectedIndex(-1);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  // 键盘导航
  const handleKeyDown = (e) => {
    if (!showDropdown || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectResult(searchResults[selectedIndex]);
        } else if (searchQuery.trim()) {
          handleSearch(e);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };

  // 选择结果
  const handleSelectResult = (calc) => {
    router.push(calc.path);
    setSearchQuery('');
    setShowDropdown(false);
  };

  // 搜索
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowDropdown(false);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors flex-shrink-0">
            🧮 Free Calculators
          </Link>

          {/* Search Bar - Middle (Hidden on home page) */}
          {!isHomePage && (
            <form onSubmit={handleSearch} className="flex-1 flex justify-center px-4">
              <div className="relative w-full max-w-md">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder=""
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => searchQuery.trim() && setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm placeholder-gray-600"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                {/* Search Dropdown */}
                {showDropdown && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                    {searchResults.map((calc, index) => (
                      <button
                        key={calc.id}
                        type="button"
                        onClick={() => handleSelectResult(calc)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full px-4 py-3 text-left flex items-center justify-between border-b border-gray-100 hover:bg-indigo-50 transition-colors ${
                          selectedIndex === index ? 'bg-indigo-50' : ''
                        } last:border-b-0`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800 truncate">{calc.name}</div>
                          <div className="text-xs text-gray-500">{calc.category}</div>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                    {searchResults.length > 0 && (
                      <div className="px-4 py-2 text-center border-t border-gray-100">
                        <button
                          type="button"
                          onClick={handleSearch}
                          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          View All Results →
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* No Results Message */}
                {showDropdown && searchQuery.trim() && searchResults.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-50 px-4 py-3">
                    <p className="text-sm text-gray-500">No calculators found</p>
                  </div>
                )}
              </div>
            </form>
          )}

          {/* Hamburger Menu */}
          <button
            ref={menuButtonRef}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 text-gray-700 hover:text-indigo-600 transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 transition-transform ${showMobileMenu ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menu Dropdown - Positioned relative to nav container */}
        {showMobileMenu && (
          <div className="absolute right-4 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 whitespace-nowrap z-10">
            {/* Menu Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-800">Categories</h3>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                onClick={() => setShowMobileMenu(false)}
                className="block px-6 py-3 text-center text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors font-medium"
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
