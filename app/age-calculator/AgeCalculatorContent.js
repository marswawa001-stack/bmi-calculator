'use client';

import { useState } from 'react';
import FeedbackButton from '../components/FeedbackButton';

export default function AgeCalculatorContent() {
  const [startDay, setStartDay] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  
  const [endDay, setEndDay] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');
  
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const calculateAge = () => {
    if (startDay && startMonth && startYear && endDay && endMonth && endYear) {
      const startDate = new Date(startYear, parseInt(startMonth) - 1, parseInt(startDay));
      const endDate = new Date(endYear, parseInt(endMonth) - 1, parseInt(endDay));
      
      if (startDate > endDate) {
        showToast('Start date must be before end date!', 'error');
        return;
      }

      if (startDate.getTime() === endDate.getTime()) {
        showToast('Start date and end date cannot be the same!', 'error');
        return;
      }
      
      // 计算年、月、日
      let years = endDate.getFullYear() - startDate.getFullYear();
      let months = endDate.getMonth() - startDate.getMonth();
      let days = endDate.getDate() - startDate.getDate();
      
      // 如果日期为负数，从月份借
      if (days < 0) {
        months--;
        const lastMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
        days += lastMonth.getDate();
      }
      
      // 如果月份为负数，从年份借
      if (months < 0) {
        years--;
        months += 12;
      }
      
      // 计算总天数
      const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
      
      // 计算总周数和剩余天数
      const totalWeeks = Math.floor(totalDays / 7);
      const remainingDays = totalDays % 7;
      
      // 计算总月数
      const totalMonths = years * 12 + months;
      
      // 计算总小时数
      const totalHours = totalDays * 24;
      
      // 计算总分钟数
      const totalMinutes = totalHours * 60;
      
      // 计算总秒数
      const totalSeconds = totalMinutes * 60;
      
      setResult({ 
        years, 
        months, 
        days, 
        totalMonths,
        totalDays, 
        totalWeeks,
        remainingDays,
        totalHours,
        totalMinutes,
        totalSeconds
      });
    }
  };

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'error' });
    }, 3000);
  };

  const setToday = () => {
    const today = new Date();
    setEndDay(String(today.getDate()));
    setEndMonth(String(today.getMonth() + 1));
    setEndYear(String(today.getFullYear()));
    showToast('End date set to today!', 'success');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && startDay && startMonth && startYear && endDay && endMonth && endYear) {
      calculateAge();
    }
  };

  const resetCalculator = () => {
    setStartDay('');
    setStartMonth('');
    setStartYear('');
    setEndDay('');
    setEndMonth('');
    setEndYear('');
    setResult(null);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);

  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-medium z-50 animate-fade-in ${
          toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          {toast.message}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="space-y-6">
          {/* Start Date Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Start Date
            </label>
            <div className="grid grid-cols-3 gap-4">
              {/* Day Selector */}
              <div>
                <label htmlFor="start-day-select" className="block text-xs font-medium text-gray-600 mb-2">Day</label>
                <select
                  id="start-day-select"
                  value={startDay}
                  onChange={(e) => setStartDay(e.target.value)}
                  onKeyPress={handleKeyPress}
                  aria-label="Select start day"
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-900"
                >
                  <option value="">Select Day</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Month Selector */}
              <div>
                <label htmlFor="start-month-select" className="block text-xs font-medium text-gray-600 mb-2">Month</label>
                <select
                  id="start-month-select"
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  onKeyPress={handleKeyPress}
                  aria-label="Select start month"
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-900"
                >
                  <option value="">Select Month</option>
                  {monthNames.map((m, i) => (
                    <option key={i + 1} value={i + 1}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Year Selector */}
              <div>
                <label htmlFor="start-year-select" className="block text-xs font-medium text-gray-600 mb-2">Year</label>
                <select
                  id="start-year-select"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  onKeyPress={handleKeyPress}
                  aria-label="Select start year"
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-900"
                >
                  <option value="">Select Year</option>
                  {years.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* End Date Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              End Date
            </label>
            <div className="grid grid-cols-3 gap-4">
              {/* Day Selector */}
              <div>
                <label htmlFor="end-day-select" className="block text-xs font-medium text-gray-600 mb-2">Day</label>
                <select
                  id="end-day-select"
                  value={endDay}
                  onChange={(e) => setEndDay(e.target.value)}
                  onKeyPress={handleKeyPress}
                  aria-label="Select end day"
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-900"
                >
                  <option value="">Select Day</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Month Selector */}
              <div>
                <label htmlFor="end-month-select" className="block text-xs font-medium text-gray-600 mb-2">Month</label>
                <select
                  id="end-month-select"
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                  onKeyPress={handleKeyPress}
                  aria-label="Select end month"
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-900"
                >
                  <option value="">Select Month</option>
                  {monthNames.map((m, i) => (
                    <option key={i + 1} value={i + 1}>{m}</option>
                  ))}
                </select>
              </div>

              {/* Year Selector */}
              <div>
                <label htmlFor="end-year-select" className="block text-xs font-medium text-gray-600 mb-2">Year</label>
                <select
                  id="end-year-select"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  onKeyPress={handleKeyPress}
                  aria-label="Select end year"
                  className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-gray-900"
                >
                  <option value="">Select Year</option>
                  {years.map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Today Button */}
            <button
              onClick={setToday}
              className="mt-3 w-full px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg transition-colors border border-blue-200"
              aria-label="Set today as end date"
            >
              Set Today as End Date
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={calculateAge}
              disabled={!startDay || !startMonth || !startYear || !endDay || !endMonth || !endYear}
              className={`flex-1 font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg ${
                startDay && startMonth && startYear && endDay && endMonth && endYear
                  ? 'bg-purple-600 hover:bg-purple-700 text-white hover:shadow-xl cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Calculate Difference
            </button>
            
            <button
              onClick={resetCalculator}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Reset
            </button>
          </div>

          {/* Feedback Button - Centered */}
          <div className="flex justify-center mt-6">
            <FeedbackButton calculatorName="Age Calculator" />
          </div>

          {/* Result Display */}
          {result && (
            <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200">
              <div className="space-y-4">
                {/* Primary Result */}
                <div className="text-center pb-4 border-b-2 border-purple-200">
                  <p className="text-gray-600 text-sm mb-2">Time Difference</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {result.years} {result.years === 1 ? 'year' : 'years'} {result.months} {result.months === 1 ? 'month' : 'months'} {result.days} {result.days === 1 ? 'day' : 'days'}
                  </p>
                </div>

                {/* Alternative Formats */}
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Or</p>
                    <p className="text-lg font-bold text-purple-600">
                      {result.totalMonths.toLocaleString()} {result.totalMonths === 1 ? 'month' : 'months'} {result.days} {result.days === 1 ? 'day' : 'days'}
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Or</p>
                    <p className="text-lg font-bold text-purple-600">
                      {result.totalWeeks.toLocaleString()} {result.totalWeeks === 1 ? 'week' : 'weeks'} {result.remainingDays} {result.remainingDays === 1 ? 'day' : 'days'}
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Or</p>
                    <p className="text-lg font-bold text-purple-600">
                      {result.totalDays.toLocaleString()} {result.totalDays === 1 ? 'day' : 'days'}
                    </p>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="pt-4 border-t-2 border-purple-200">
                  <p className="text-xs text-gray-600 mb-3 font-semibold">DETAILED BREAKDOWN</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-white p-2 rounded">
                      <p className="text-gray-600 text-xs">Total Hours</p>
                      <p className="font-bold text-purple-600">{result.totalHours.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <p className="text-gray-600 text-xs">Total Minutes</p>
                      <p className="font-bold text-purple-600">{result.totalMinutes.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-2 rounded col-span-2">
                      <p className="text-gray-600 text-xs">Total Seconds</p>
                      <p className="font-bold text-purple-600">{result.totalSeconds.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
