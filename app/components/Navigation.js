'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Navigation() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
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
    {
      id: 'p-value-calculator',
      name: 'P-Value Calculator',
      category: 'Statistics',
      path: '/p-value-calculator'
    },
    {
      id: 'test-grade-calculator',
      name: 'Test Grade Calculator',
      category: 'Other',
      path: '/test-grade-calculator'
    },
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
    if (calc.path) {
      router.push(calc.path);
    }
    setSearchQuery('');
    setShowDropdown(false);
    setShowSearchModal(false);
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
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
            <Logo className="w-8 h-8 md:w-10 md:h-10" />
            <span className="text-2xl md:text-3xl font-bold">
              <span className="text-indigo-600">CALCULATOR</span>
              {' '}
              <span className="text-purple-600">VAST</span>
            </span>
          </Link>

          {/* Center: Search Bar (Hidden on home page) */}
          {/* 搜索框已移至下拉菜单中 */}

          {/* Right: Search Button + Hamburger Menu */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search Button (appears on mobile or left of hamburger) */}
            <button
              onClick={() => setShowSearchModal(!showSearchModal)}
              className="p-2 text-gray-700 hover:text-indigo-600 transition-colors"
              aria-label="Search"
              title="Search"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Hamburger Menu */}
            <button
              ref={menuButtonRef}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-700 hover:text-indigo-600 transition-colors"
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
        </div>

        {/* Search Modal Dropdown */}
        {showSearchModal && (
          <div className="absolute right-4 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-10 w-64">
            {/* Close Button */}
            <div className="flex items-center justify-end px-4 py-1">
              <button
                onClick={() => setShowSearchModal(false)}
                className="text-pink-500 hover:text-pink-600 transition-colors p-0.5"
                aria-label="Close search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Search Input in Modal */}
            <form onSubmit={handleSearch} className="px-6 py-2 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => searchQuery.trim() && setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  autoFocus={true}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none focus:placeholder-transparent text-sm placeholder-gray-600"
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

                {/* Search Results Dropdown */}
                {showDropdown && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
                    {searchResults.slice(0, 5).map((calc, index) => (
                      <button
                        key={calc.id}
                        type="button"
                        onClick={() => {
                          handleSelectResult(calc);
                          setShowSearchModal(false);
                        }}
                        className="w-full px-4 py-3 text-left flex items-center justify-between border-b border-gray-100 hover:bg-indigo-50 transition-colors last:border-b-0"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-800 truncate text-sm">{calc.name}</div>
                          <div className="text-xs text-gray-500">{calc.category}</div>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                    {searchResults.length > 5 && (
                      <div className="px-4 py-2 text-center border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => {
                            handleSearch(new Event('submit'));
                            setShowSearchModal(false);
                          }}
                          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                          View All Results →
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
        )}

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
                href={`/${category.id}`}
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
