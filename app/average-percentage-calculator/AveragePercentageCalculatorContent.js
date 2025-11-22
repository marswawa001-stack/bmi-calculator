'use client';

import { useState, useEffect } from 'react';

export default function AveragePercentageCalculatorContent() {
  const [datasets, setDatasets] = useState([
    { percentage: '', size: '' },
    { percentage: '', size: '' }
  ]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isWeighted, setIsWeighted] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [numRows, setNumRows] = useState(2);

  // Update datasets when numRows changes
  useEffect(() => {
    const currentLength = datasets.length;
    if (numRows > currentLength) {
      // Add rows
      const newRows = Array(numRows - currentLength).fill().map(() => ({ percentage: '', size: '' }));
      setDatasets([...datasets, ...newRows]);
    } else if (numRows < currentLength) {
      // Remove rows
      setDatasets(datasets.slice(0, numRows));
    }
  }, [numRows]);

  // Auto-calculate when inputs or mode change
  useEffect(() => {
    calculateAverage();
  }, [datasets, isWeighted]);

  const handleInputChange = (index, field, value) => {
    const newDatasets = [...datasets];
    // Allow only numbers and decimals
    if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
      newDatasets[index][field] = value;
      setDatasets(newDatasets);
    }
  };

  const handleShowMoreChange = (e) => {
    const checked = e.target.checked;
    setShowMore(checked);
    if (!checked) {
      setNumRows(2);
    }
  };

  const handleNumRowsChange = (e) => {
    setNumRows(parseInt(e.target.value));
  };

  const clearAll = () => {
    setDatasets([
      { percentage: '', size: '' },
      { percentage: '', size: '' }
    ]);
    setResult(null);
    setIsWeighted(false);
    setShowMore(false);
    setNumRows(2);
  };

  const calculateAverage = () => {
    let totalWeightedPercentage = 0;
    let totalSize = 0;
    let totalPercentage = 0;
    let count = 0;
    let validRows = 0;

    for (const data of datasets) {
      const p = parseFloat(data.percentage);
      const s = parseFloat(data.size);

      if (!isNaN(p)) {
        validRows++;
        if (isWeighted) {
          // Weighted average
          const size = !isNaN(s) && s > 0 ? s : 0;
          
          if (size > 0) {
             totalWeightedPercentage += p * size;
             totalSize += size;
          }
        } else {
          // Simple average
          totalPercentage += p;
          count++;
        }
      }
    }

    if (validRows === 0) {
      setResult(null);
      return;
    }

    let avg = 0;
    if (isWeighted) {
      if (totalSize === 0) {
        setResult(null);
        return;
      }
      avg = totalWeightedPercentage / totalSize;
    } else {
      if (count === 0) {
        setResult(null);
        return;
      }
      avg = totalPercentage / count;
    }

    setResult(avg);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="space-y-8">
        
        {/* Input Rows */}
        <div className="space-y-4">
          {datasets.map((data, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              {/* Percentage Input */}
              <div className={`flex-1 w-full transition-all duration-300`}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Percent #{index + 1}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={data.percentage}
                    onChange={(e) => handleInputChange(index, 'percentage', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all pr-10 text-gray-800 font-medium hover:border-gray-300"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">%</span>
                </div>
              </div>

              {/* Sample Size Input - Only visible if weighted */}
              {isWeighted && (
                <div className="flex-1 w-full animate-fade-in">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sample size #{index + 1}
                  </label>
                  <input
                    type="number"
                    value={data.size}
                    onChange={(e) => handleInputChange(index, 'size', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-800 font-medium hover:border-gray-300"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add more entries section */}
        <div className="pt-4 -mx-6 -mb-6 px-6 py-4 md:rounded-b-2xl transition-all duration-300 h-14 flex items-center">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
            {/* Left side: Title + Checkbox */}
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-bold text-gray-700">Add more entries?</h3>
              <div className="relative group flex items-center justify-center">
                <input
                  type="checkbox"
                  id="showMore"
                  checked={showMore}
                  onChange={handleShowMoreChange}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-md cursor-pointer focus:ring-2 focus:ring-blue-500 appearance-none bg-white checked:bg-blue-600 checked:border-blue-600 transition-all duration-200 group-hover:border-blue-400 group-hover:shadow-md"
                />
                <svg 
                  className={`absolute w-4 h-4 text-white pointer-events-none transition-all duration-200 ${showMore ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <label htmlFor="showMore" className="text-gray-700 font-medium cursor-pointer select-none">Yes</label>
            </div>

            {/* Right side: How many dropdown */}
            <div className={`flex items-center gap-3 transition-all duration-300 ${showMore ? 'opacity-100 animate-fade-in' : 'opacity-0 invisible h-0'}`}>
              <label htmlFor="numRows" className="text-sm font-bold text-gray-700 whitespace-nowrap">How many?</label>
              <div className="relative">
                <select
                  id="numRows"
                  value={numRows}
                  onChange={handleNumRowsChange}
                  className="px-4 py-1 border-2 border-gray-300 rounded-lg bg-white text-gray-800 font-semibold focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:shadow-lg outline-none hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer appearance-none pr-8 relative"
                  style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234B5563' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center'}}
                >
                  {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Result Section - Enhanced */}
        <div className="pt-6">
          <h3 className="text-sm font-bold text-gray-700 mb-4">Average percentage</h3>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-8 shadow-md hover:shadow-lg transition-shadow h-40 flex items-center justify-center">
            <div className="flex items-center justify-center gap-2">
              <div className="text-5xl md:text-6xl font-bold text-blue-600 tracking-tight">
                {result !== null ? result.toFixed(2) : '-'}
              </div>
              <div className="text-4xl font-bold text-blue-400">%</div>
            </div>
          </div>
        </div>

        {/* Options Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
          <div className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                id="allowWeighted"
                checked={isWeighted}
                onChange={(e) => setIsWeighted(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-md cursor-pointer focus:ring-2 focus:ring-blue-500 appearance-none bg-white checked:bg-blue-600 checked:border-blue-600 transition-all duration-200 group-hover:border-blue-400 group-hover:shadow-md"
              />
              <svg 
                className={`absolute w-4 h-4 text-white pointer-events-none transition-all duration-200 ${isWeighted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <label htmlFor="allowWeighted" className="text-gray-700 font-medium cursor-pointer select-none">
              Allow different sample sizes
            </label>
          </div>

          <button
            onClick={clearAll}
            className="text-sm text-white bg-red-500 hover:bg-red-600 transition-all duration-200 flex items-center gap-2 font-medium px-5 py-2 rounded-lg hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            clear all changes
          </button>
        </div>

      </div>
      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl border-2 border-red-200">
          {error}
        </div>
      )}
    </div>
  );
}
