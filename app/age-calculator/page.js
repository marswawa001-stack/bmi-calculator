'use client';

import { useState } from 'react';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState(null);

  const calculateAge = () => {
    if (birthDate) {
      const today = new Date();
      const birth = new Date(birthDate);
      
      // 计算年、月、日
      let years = today.getFullYear() - birth.getFullYear();
      let months = today.getMonth() - birth.getMonth();
      let days = today.getDate() - birth.getDate();
      
      // 如果日期为负数，从月份借
      if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
      }
      
      // 如果月份为负数，从年份借
      if (months < 0) {
        years--;
        months += 12;
      }
      
      // 计算总天数
      const totalDays = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
      
      // 计算总周数
      const totalWeeks = Math.floor(totalDays / 7);
      
      // 计算总月数
      const totalMonths = years * 12 + months;
      
      setResult({ years, months, days, totalDays, totalWeeks, totalMonths });
    }
  };

  const resetCalculator = () => {
    setBirthDate('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎂 Age Calculator
          </h1>
            <p className="text-gray-600">
              Calculate your exact age in years, months, and days
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="space-y-6">
              {/* Birth Date Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-lg text-gray-900"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={calculateAge}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Calculate Age
                </button>
                
                <button
                  onClick={resetCalculator}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Reset
                </button>
              </div>

              {/* Result Display */}
              {result && (
                <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
                  <div className="text-center space-y-4">
                    <div>
                      <p className="text-gray-600 text-sm mb-2">Your Age</p>
                      <p className="text-4xl font-bold text-gray-800">
                        {result.years} years, {result.months} months, {result.days} days
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-purple-200 space-y-2">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">{result.totalMonths}</p>
                          <p className="text-xs text-gray-600">Total Months</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">{result.totalWeeks.toLocaleString()}</p>
                          <p className="text-xs text-gray-600">Total Weeks</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                          <p className="text-2xl font-bold text-purple-600">{result.totalDays.toLocaleString()}</p>
                          <p className="text-xs text-gray-600">Total Days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              How to Use
            </h2>
            
            <div className="space-y-3 text-gray-700">
              <p>
                📅 <strong>Select your birth date</strong> using the date picker above.
              </p>
              <p>
                🔢 <strong>Click "Calculate Age"</strong> to see your exact age in multiple formats.
              </p>
              <p>
                ♻️ <strong>Click "Reset"</strong> to clear and start over.
              </p>
            </div>

            <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-400 rounded">
              <p className="text-sm text-gray-700">
                <strong>💡 Fun Fact:</strong> This calculator shows your age in years, months, days, weeks, and total days lived. Perfect for birthday planning or just satisfying your curiosity!
              </p>
          </div>
        </div>
      </div>
    </div>
  );
}