'use client';

import { useState, useEffect } from 'react';

export default function BMICalculatorContent() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [history, setHistory] = useState([]);
  const [weightError, setWeightError] = useState('');
  const [heightError, setHeightError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('bmi_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const convertToMetric = (w, h, isMetric) => {
    if (isMetric) {
      return { weight: w, height: h };
    }
    const weightKg = w * 0.453592;
    const heightCm = h * 30.48;
    return { weight: weightKg, height: heightCm };
  };

  // 验证输入值是否有效
  const validateInput = (val) => {
    if (val === '') return { valid: false, error: '' };
    if (!/^(\d+\.?\d*|\.\d+)$/.test(val)) {
      return { valid: false, error: 'Please enter only positive numbers' };
    }
    if (parseFloat(val) <= 0) {
      return { valid: false, error: 'Must be greater than 0' };
    }
    return { valid: true, error: '' };
  };

  // 验证体重是否在有效范围内
  const validateWeight = (val) => {
    const validation = validateInput(val);
    if (!validation.valid) return validation;
    
    const weightValue = parseFloat(val);
    const isMetric = unit === 'metric';
    const maxWeight = isMetric ? 500 : 1100; // kg or lb
    
    if (weightValue > maxWeight) {
      return { valid: false, error: `Must be between 0.1 and ${maxWeight} ${isMetric ? 'kg' : 'lb'}` };
    }
    return { valid: true, error: '' };
  };

  // 验证身高是否在有效范围内
  const validateHeight = (val) => {
    const validation = validateInput(val);
    if (!validation.valid) return validation;
    
    const heightValue = parseFloat(val);
    const isMetric = unit === 'metric';
    const maxHeight = isMetric ? 300 : 9.84; // cm or ft
    
    if (heightValue > maxHeight) {
      return { valid: false, error: `Must be between 0.1 and ${maxHeight} ${isMetric ? 'cm' : 'ft'}` };
    }
    return { valid: true, error: '' };
  };

  // 检查是否可以计算
  const isCalculateEnabled = () => {
    if (weight === '' || height === '') return false;
    const weightValidation = validateWeight(weight);
    const heightValidation = validateHeight(height);
    return weightValidation.valid && heightValidation.valid;
  };

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (!w || !h) return;

    const { weight: weightMetric, height: heightMetric } = convertToMetric(w, h, unit === 'metric');
    const hm = heightMetric / 100;
    
    if (weightMetric && hm) {
      const bmi = (weightMetric / (hm * hm)).toFixed(1);
      let category = '';
      let color = '';
      let advice = '';
      
      if (bmi < 18.5) {
        category = 'Underweight';
        color = 'text-blue-600';
        advice = 'You may need to gain weight. Consult a healthcare provider for personalized advice.';
      } else if (bmi < 24.9) {
        category = 'Normal weight';
        color = 'text-green-600';
        advice = 'You have a healthy weight. Maintain it with regular exercise and balanced diet.';
      } else if (bmi < 29.9) {
        category = 'Overweight';
        color = 'text-yellow-600';
        advice = 'Consider increasing physical activity and adjusting your diet.';
      } else {
        category = 'Obese';
        color = 'text-red-600';
        advice = 'It\'s recommended to consult a healthcare provider for a personalized plan.';
      }
      
      const newResult = { bmi, category, color, advice, weight: w, height: h, unit, timestamp: new Date().toLocaleString() };
      setResult(newResult);

      const updatedHistory = [newResult, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('bmi_history', JSON.stringify(updatedHistory));
    }
  };

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setResult(null);
    setWeightError('');
    setHeightError('');
  };

  const switchUnit = (newUnit) => {
    setUnit(newUnit);
    setWeight('');
    setHeight('');
    setResult(null);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('bmi_history');
  };

  const getBMIRangeInfo = () => {
    return [
      { label: 'Underweight', min: 0, max: 18.5, color: 'bg-blue-100', textColor: 'text-blue-600' },
      { label: 'Normal', min: 18.5, max: 25, color: 'bg-green-100', textColor: 'text-green-600' },
      { label: 'Overweight', min: 25, max: 30, color: 'bg-yellow-100', textColor: 'text-yellow-600' },
      { label: 'Obese', min: 30, max: 60, color: 'bg-red-100', textColor: 'text-red-600' },
    ];
  };

  return (
    <>
      {/* Unit Toggle */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => switchUnit('metric')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            unit === 'metric'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300'
          }`}
        >
          Metric (kg, cm)
        </button>
        <button
          onClick={() => switchUnit('imperial')}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            unit === 'imperial'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300'
          }`}
        >
          Imperial (lb, ft)
        </button>
      </div>

      {/* Calculator Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="space-y-6">
          {/* Weight Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Weight ({unit === 'metric' ? 'kg' : 'lb'})
            </label>
            <input
              type="text"
              value={weight}
              onChange={(e) => {
                const val = e.target.value;
                setWeight(val);
                
                if (val === '') {
                  setWeightError('');
                } else {
                  const validation = validateWeight(val);
                  setWeightError(validation.error);
                }
              }}
              onKeyPress={(e) => e.key === 'Enter' && isCalculateEnabled() && calculateBMI()}
              placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-lg text-gray-900 ${
                weightError ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'
              }`}
            />
            {weightError && <p className="text-xs text-red-600 mt-1">⚠️ {weightError}</p>}
            <p className="text-xs text-gray-500 mt-1">Valid range: 0.1 - {unit === 'metric' ? '500 kg' : '1100 lb'}</p>
          </div>

          {/* Height Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Height ({unit === 'metric' ? 'cm' : 'ft'})
            </label>
            <input
              type="text"
              value={height}
              onChange={(e) => {
                const val = e.target.value;
                setHeight(val);
                
                if (val === '') {
                  setHeightError('');
                } else {
                  const validation = validateHeight(val);
                  setHeightError(validation.error);
                }
              }}
              onKeyPress={(e) => e.key === 'Enter' && isCalculateEnabled() && calculateBMI()}
              placeholder={unit === 'metric' ? 'e.g., 170' : 'e.g., 5.58'}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors text-lg text-gray-900 ${
                heightError ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'
              }`}
            />
            {heightError && <p className="text-xs text-red-600 mt-1">⚠️ {heightError}</p>}
            <p className="text-xs text-gray-500 mt-1">Valid range: 0.1 - {unit === 'metric' ? '300 cm' : '9.84 ft'}</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={calculateBMI}
              disabled={!isCalculateEnabled()}
              className={`flex-1 font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg ${
                isCalculateEnabled()
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-xl cursor-pointer'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-60'
              }`}
            >
              Calculate BMI
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
            <div className="mt-6 p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border-2 border-indigo-200">
              <div className="text-center mb-6">
                <p className="text-gray-600 text-sm mb-2">Your BMI</p>
                <p className="text-6xl font-bold text-gray-800 mb-3">
                  {result.bmi}
                </p>
                <p className={`text-2xl font-semibold ${result.color}`}>
                  {result.category}
                </p>
              </div>

              {/* Health Advice */}
              <div className={`p-4 rounded-lg ${result.color} bg-opacity-10 border-l-4 ${result.color}`}>
                <p className="text-gray-700">
                  <strong>💡 Personalized Advice:</strong> {result.advice}
                </p>
              </div>

              {/* BMI Range Visualization */}
              <div className="mt-6 pt-6 border-t border-gray-300">
                <p className="text-sm font-semibold text-gray-700 mb-3">BMI Range Chart</p>
                
                {/* Scale Labels Above Bar */}
                <div className="relative text-xs text-gray-500 font-medium mb-2 h-5">
                  {[
                    { value: 0, label: '0' },
                    { value: 18.5, label: '18.5' },
                    { value: 25, label: '25' },
                    { value: 30, label: '30' },
                    { value: 60, label: '60+' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="absolute transform -translate-x-1/2"
                      style={{ left: `${(item.value / 60) * 100}%` }}
                    >
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
                
                {/* Range Bar with Indicator Line */}
                <div className="relative mb-12">
                  {/* BMI Indicator Line */}
                  {result.bmi && (
                    (() => {
                      // Calculate position based on actual range widths
                      const ranges = getBMIRangeInfo();
                      const totalWidth = ranges[ranges.length - 1].max; // 60
                      const bmiValue = parseFloat(result.bmi);
                      const position = Math.min((bmiValue / totalWidth) * 100, 100);
                      
                      // Determine color based on BMI category
                      let indicatorColor = 'bg-gray-800';
                      let glowColor = 'rgba(31, 41, 55, 0.3)'; // gray-800
                      
                      if (bmiValue < 18.5) {
                        indicatorColor = 'bg-blue-600';
                        glowColor = 'rgba(37, 99, 235, 0.5)';
                      } else if (bmiValue < 25) {
                        indicatorColor = 'bg-green-600';
                        glowColor = 'rgba(22, 163, 74, 0.5)';
                      } else if (bmiValue < 30) {
                        indicatorColor = 'bg-yellow-600';
                        glowColor = 'rgba(202, 138, 4, 0.5)';
                      } else {
                        indicatorColor = 'bg-red-600';
                        glowColor = 'rgba(220, 38, 38, 0.5)';
                      }
                      
                      return (
                        <div
                          className="absolute transition-all duration-300 z-10 group"
                          style={{ left: `${position}%`, top: '0', transform: 'translateX(-50%)' }}
                        >
                          {/* Indicator Line with glow effect */}
                          <div 
                            className={`w-1.5 h-8 ${indicatorColor} drop-shadow-lg rounded-sm transition-all duration-200 group-hover:w-2 group-hover:shadow-lg cursor-pointer`}
                            style={{ 
                              boxShadow: `0 0 8px ${glowColor}, inset 0 0 4px rgba(255, 255, 255, 0.3)` 
                            }}
                          ></div>
                        </div>
                      );
                    })()
                  )}
                  
                  {/* BMI Range Bar */}
                  <div className="flex h-8 rounded-lg overflow-hidden shadow relative">
                    {getBMIRangeInfo().map((range, idx) => (
                      <div
                        key={idx}
                        className={`${range.color}`}
                        style={{ flex: range.max - range.min }}
                        title={`${range.label}: ${range.min}-${range.max}`}
                      >
                      </div>
                    ))}
                  </div>

                  {/* Range Labels Below Bar */}
                  <div className="flex mt-1">
                    {getBMIRangeInfo().map((range, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-center text-xs font-bold ${range.textColor}`}
                        style={{ flex: range.max - range.min }}
                      >
                        {range.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* History Section */}
      {history.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              📊 Calculation History
            </h2>
            <button
              onClick={clearHistory}
              className="text-sm px-4 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg font-semibold transition-colors"
            >
              Clear History
            </button>
          </div>
          
          <div className="space-y-2">
            {history.map((record, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">
                    BMI: {record.bmi} - {record.category}
                  </p>
                  <p className="text-xs text-gray-500">
                    {record.weight} {record.unit === 'metric' ? 'kg' : 'lb'} | {record.height} {record.unit === 'metric' ? 'cm' : 'ft'}
                  </p>
                </div>
                <p className="text-xs text-gray-500">{record.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
