'use client';

import { useState, useEffect } from 'react';

export default function BMICalculatorContent() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [history, setHistory] = useState([]);

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
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && calculateBMI()}
              placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-lg text-gray-900"
            />
          </div>

          {/* Height Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Height ({unit === 'metric' ? 'cm' : 'ft'})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && calculateBMI()}
              placeholder={unit === 'metric' ? 'e.g., 170' : 'e.g., 5.58'}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-lg text-gray-900"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={calculateBMI}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
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
                
                {/* Range Bar with Arrow Indicator */}
                <div className="relative mb-8">
                  {/* BMI Range Bar */}
                  <div className="flex gap-1 h-8 rounded-lg overflow-hidden shadow">
                    {getBMIRangeInfo().map((range, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 ${range.color} flex items-center justify-center text-xs font-bold ${range.textColor}`}
                        title={`${range.label}: ${range.min}-${range.max}`}
                      >
                        {range.label}
                      </div>
                    ))}
                  </div>

                  {/* Arrow Indicator */}
                  {result.bmi && (
                    (() => {
                      // Calculate position: BMI goes from 0 to 60
                      const maxBMI = 60;
                      const position = Math.min((parseFloat(result.bmi) / maxBMI) * 100, 100);
                      
                      return (
                        <div
                          className="absolute top-10 flex flex-col items-center transition-all duration-300"
                          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
                        >
                          {/* Arrow */}
                          <div className="text-2xl drop-shadow-lg">👇</div>
                          {/* Value Label */}
                          <div className="mt-1 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap drop-shadow-lg">
                            {result.bmi}
                          </div>
                        </div>
                      );
                    })()
                  )}
                </div>

                {/* Scale Labels */}
                <div className="flex justify-between text-xs text-gray-500 font-medium">
                  <span>0</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>60+</span>
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
