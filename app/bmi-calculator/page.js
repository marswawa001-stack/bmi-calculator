'use client';

import { useState } from 'react';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    
    if (w && h) {
      const bmi = (w / (h * h)).toFixed(1);
      let category = '';
      let color = '';
      
      if (bmi < 18.5) {
        category = 'Underweight';
        color = 'text-blue-600';
      } else if (bmi < 24.9) {
        category = 'Normal weight';
        color = 'text-green-600';
      } else if (bmi < 29.9) {
        category = 'Overweight';
        color = 'text-yellow-600';
      } else {
        category = 'Obese';
        color = 'text-red-600';
      }
      
      setResult({ bmi, category, color });
    }
  };

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            💪 BMI Calculator
          </h1>
          <p className="text-gray-600">
            Calculate your Body Mass Index quickly and easily
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="space-y-6">
            {/* Weight Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g., 70"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-lg text-gray-900"
              />
            </div>

            {/* Height Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Height (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g., 170"
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
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-2">Your BMI</p>
                  <p className="text-5xl font-bold text-gray-800 mb-3">
                    {result.bmi}
                  </p>
                  <p className={`text-xl font-semibold ${result.color}`}>
                    {result.category}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Understanding BMI
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start">
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong>Underweight:</strong> BMI less than 18.5
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong>Normal weight:</strong> BMI 18.5 to 24.9
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong>Overweight:</strong> BMI 25 to 29.9
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="w-3 h-3 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <div>
                <strong>Obese:</strong> BMI 30 or greater
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> BMI is a screening tool and does not diagnose body fatness or health. Consult with a healthcare provider for personalized advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}