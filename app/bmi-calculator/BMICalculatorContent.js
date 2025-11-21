'use client';

import { useState, useEffect } from 'react';

export default function BMICalculatorContent() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState(''); // Add gender state
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

  // Auto-calculate when inputs are valid
  useEffect(() => {
    if (isCalculateEnabled()) {
      calculateBMI();
    }
  }, [weight, height, unit]);

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
    const minWeight = isMetric ? 10 : 22; // kg or lb (includes children)
    const maxWeight = isMetric ? 500 : 1100; // kg or lb
    
    if (weightValue < minWeight || weightValue > maxWeight) {
      return { valid: false, error: `Must be between ${minWeight} and ${maxWeight} ${isMetric ? 'kg' : 'lb'}` };
    }
    return { valid: true, error: '' };
  };

  // 验证身高是否在有效范围内
  const validateHeight = (val) => {
    const validation = validateInput(val);
    if (!validation.valid) return validation;
    
    const heightValue = parseFloat(val);
    const isMetric = unit === 'metric';
    const minHeight = isMetric ? 30 : 0.98; // cm or ft (includes young children)
    const maxHeight = isMetric ? 300 : 9.84; // cm or ft
    
    if (heightValue < minHeight || heightValue > maxHeight) {
      return { valid: false, error: `Must be between ${minHeight} and ${maxHeight} ${isMetric ? 'cm' : 'ft'}` };
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

  const calculateBMIWithGender = (bmi, gender) => {
    // Adjust BMI categories based on gender if needed
    // For now, we use standard categories but can show gender-specific insights
    return bmi;
  };

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (!w || !h) return;

    const { weight: weightMetric, height: heightMetric } = convertToMetric(w, h, unit === 'metric');
    const hm = heightMetric / 100;
    
    if (weightMetric && hm) {
      const bmi = (weightMetric / (hm * hm)).toFixed(1);
      const bmiValue = parseFloat(bmi);
      const bmiPrime = (bmiValue / 25).toFixed(2); // BMI Prime = BMI / 25 (where 25 is ideal upper limit)
      let category = '';
      let color = '';
      let advice = '';

      if (bmiValue < 18.5) {
        category = 'Underweight';
        color = 'text-blue-600';
        advice = 'You may need to gain weight. Consult a healthcare provider for personalized advice.';
      } else if (bmiValue < 25) {
        // Use <25 so that 24.9 is considered Normal (consistent with chart)
        category = 'Normal weight';
        color = 'text-green-600';
        advice = 'You have a healthy weight. Maintain it with regular exercise and balanced diet.';
      } else if (bmiValue < 30) {
        // Use <30 so that 29.9 is Overweight and 30+ is Obese
        category = 'Overweight';
        color = 'text-yellow-600';
        advice = 'Consider increasing physical activity and adjusting your diet.';
      } else {
        category = 'Obese';
        color = 'text-red-600';
        advice = 'It\'s recommended to consult a healthcare provider for a personalized plan.';
      }
      
      const newResult = { bmi, bmiPrime, category, color, advice, weight: w, height: h, unit, gender, timestamp: new Date().toLocaleString() };
      setResult(newResult);

      const updatedHistory = [newResult, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('bmi_history', JSON.stringify(updatedHistory));
    }
  };

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setGender('');
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
      { label: 'Underweight', min: 15, max: 18.5, color: 'bg-blue-100', textColor: 'text-blue-600' },
      { label: 'Normal', min: 18.5, max: 25, color: 'bg-green-100', textColor: 'text-green-600' },
      { label: 'Overweight', min: 25, max: 30, color: 'bg-yellow-100', textColor: 'text-yellow-600' },
      { label: 'Obese', min: 30, max: 38, color: 'bg-red-100', textColor: 'text-red-600' },
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
          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gender (Optional)
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setGender('male')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                  gender === 'male'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-indigo-300'
                }`}
              >
                👨 Male
              </button>
              <button
                onClick={() => setGender('female')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                  gender === 'female'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:border-indigo-300'
                }`}
              >
                👩 Female
              </button>
            </div>
          </div>

          {/* Weight Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Weight ({unit === 'metric' ? 'kg' : 'lb'})
            </label>
            <div className="relative">
              <input
                type="text"
                value={weight}
                onChange={(e) => {
                  const val = e.target.value;
                  setWeight(val);
                  
                  if (val === '') {
                    setWeightError('');
                    setResult(null);
                  } else {
                    const validation = validateWeight(val);
                    setWeightError(validation.error);
                  }
                }}
                onKeyPress={(e) => e.key === 'Enter' && isCalculateEnabled() && calculateBMI()}
                placeholder={unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
                className={`w-full px-4 py-3 pr-10 border-2 rounded-lg focus:outline-none transition-colors text-lg text-gray-900 ${
                  weightError ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'
                }`}
              />
              {weight && (
                <button
                  onClick={() => {
                    setWeight('');
                    setWeightError('');
                    setResult(null);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {/* Fixed height container for error message */}
            <div className="h-5 mt-1">
              <p className={`text-xs text-red-600 transition-opacity duration-200 ${
                weightError ? 'opacity-100' : 'opacity-0'
              }`}>
                {weightError ? `⚠️ ${weightError}` : ' '}
              </p>
            </div>
            <p className="text-xs text-gray-500">Valid range: {unit === 'metric' ? '10 - 500 kg' : '22 - 1100 lb'}</p>
          </div>

          {/* Height Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Height ({unit === 'metric' ? 'cm' : 'ft'})
            </label>
            <div className="relative">
              <input
                type="text"
                value={height}
                onChange={(e) => {
                  const val = e.target.value;
                  setHeight(val);
                  
                  if (val === '') {
                    setHeightError('');
                    setResult(null);
                  } else {
                    const validation = validateHeight(val);
                    setHeightError(validation.error);
                  }
                }}
                onKeyPress={(e) => e.key === 'Enter' && isCalculateEnabled() && calculateBMI()}
                placeholder={unit === 'metric' ? 'e.g., 170' : 'e.g., 5.58'}
                className={`w-full px-4 py-3 pr-10 border-2 rounded-lg focus:outline-none transition-colors text-lg text-gray-900 ${
                  heightError ? 'border-red-500 focus:border-red-500' : 'border-gray-200 focus:border-indigo-500'
                }`}
              />
              {height && (
                <button
                  onClick={() => {
                    setHeight('');
                    setHeightError('');
                    setResult(null);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {/* Fixed height container for error message */}
            <div className="h-5 mt-1">
              <p className={`text-xs text-red-600 transition-opacity duration-200 ${
                heightError ? 'opacity-100' : 'opacity-0'
              }`}>
                {heightError ? `⚠️ ${heightError}` : ' '}
              </p>
            </div>
            <p className="text-xs text-gray-500">Valid range: {unit === 'metric' ? '30 - 300 cm' : '0.98 - 9.84 ft'}</p>
          </div>

          {/* Clear Button */}
          <div className="flex justify-center">
            <button
              onClick={resetCalculator}
              className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Clear all changes
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
                
                {/* BMI Prime Display */}
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <p className="text-sm text-gray-600 mb-1">BMI Prime</p>
                  <p className="text-xl font-bold text-gray-800">
                    {result.bmiPrime}
                    <span className="text-sm font-normal text-gray-500 ml-2">(BMI ÷ 25)</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {result.bmiPrime < 0.74 && '< 0.74: Below normal range'}
                    {result.bmiPrime >= 0.74 && result.bmiPrime < 1 && '0.74 - 1.0: Normal range'}
                    {result.bmiPrime >= 1 && result.bmiPrime < 1.2 && '1.0 - 1.2: Slightly overweight'}
                    {result.bmiPrime >= 1.2 && '>= 1.2: Significantly above normal'}
                  </p>
                </div>
              </div>

              {/* Health Advice */}
              <div className={`p-4 rounded-lg ${result.color} bg-opacity-10 border-l-4 ${result.color}`}>
                <p className="text-gray-700">
                  <strong>💡 Personalized Advice:</strong> {result.advice}
                </p>
                {result.gender && (
                  <p className="text-gray-700 mt-2 text-sm">
                    <strong>Gender:</strong> {result.gender === 'male' ? 'Male' : 'Female'} - This data helps personalize health recommendations.
                  </p>
                )}
              </div>

              {/* BMI Range Visualization */}
              <div className="mt-6 pt-6 border-t border-gray-300">
                <p className="text-sm font-semibold text-gray-700 mb-3">BMI Range Chart</p>
                
                {/* Scale Labels Above Bar */}
                <div className="relative text-xs text-gray-500 font-medium h-2.5 leading-none -mb-1">
                  {[
                    { value: 15, label: '15' },
                    { value: 18.5, label: '18.5' },
                    { value: 25, label: '25' },
                    { value: 30, label: '30' },
                    { value: 38, label: '38' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="absolute transform -translate-x-1/2"
                      style={{ left: `${((item.value - 15) / (38 - 15)) * 100}%` }}
                    >
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
                
                {/* Range Bar with Indicator Pointer */}
                <div className="relative mt-0 pt-4">
                  {/* BMI Indicator Pointer - Only show if within range */}
                  {result.bmi && (
                    (() => {
                      // Calculate position based on actual range widths
                      const ranges = getBMIRangeInfo();
                      const minValue = 15; // Minimum BMI on chart
                      const maxValue = 38; // Maximum BMI on chart
                      const bmiValue = parseFloat(result.bmi);
                      
                      // Only show indicator if within range
                      if (bmiValue < minValue || bmiValue > maxValue) {
                        return null;
                      }
                      
                      const position = ((bmiValue - minValue) / (maxValue - minValue)) * 100;
                      
                      // Determine color based on BMI category
                      let pointerColor = '#1f2937'; // gray-800
                      let glowColor = 'rgba(31, 41, 55, 0.3)'; // gray-800
                      
                      if (bmiValue < 18.5) {
                        pointerColor = '#2563eb'; // blue-600
                        glowColor = 'rgba(37, 99, 235, 0.5)';
                      } else if (bmiValue < 25) {
                        pointerColor = '#16a34a'; // green-600
                        glowColor = 'rgba(22, 163, 74, 0.5)';
                      } else if (bmiValue < 30) {
                        pointerColor = '#ca8a04'; // yellow-600
                        glowColor = 'rgba(202, 138, 4, 0.5)';
                      } else {
                        pointerColor = '#dc2626'; // red-600
                        glowColor = 'rgba(220, 38, 38, 0.5)';
                      }
                      
                      return (
                        <div
                          className="absolute transition-all duration-300 z-10 group"
                          style={{ left: `${position}%`, bottom: '-12px', transform: 'translateX(-50%)' }}
                        >
                          {/* Pointer Indicator pointing upward */}
                          <div 
                            className="cursor-pointer transition-all duration-200 group-hover:scale-110"
                            style={{ 
                              width: '0',
                              height: '0',
                              borderLeft: '10px solid transparent',
                              borderRight: '10px solid transparent',
                              borderBottom: `12px solid ${pointerColor}`,
                              filter: `drop-shadow(0 0 6px ${glowColor})`,
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
                        className={`${range.color} flex items-center justify-center overflow-hidden`}
                        style={{ flex: range.max - range.min }}
                        title={`${range.label}: ${range.min}-${range.max}`}
                      >
                        <span className={`text-[8px] sm:text-[10px] md:text-xs font-bold ${range.textColor} whitespace-nowrap px-1`}>
                          {range.label === 'Underweight' ? 'UW' : range.label === 'Overweight' ? 'OW' : range.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Out of Range Warning - Below Chart */}
                {(() => {
                  const bmiValue = parseFloat(result.bmi);
                  const minValue = 15;
                  const maxValue = 38;
                  const isOutOfRange = bmiValue < minValue || bmiValue > maxValue;
                  
                  if (isOutOfRange) {
                    return (
                      <div className="mt-3 p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
                        <p className="text-sm text-orange-800 font-medium">
                          ⚠️ Your BMI value ({result.bmi}) is {bmiValue < minValue ? 'below' : 'above'} the standard chart range (15-38)
                        </p>
                      </div>
                    );
                  }
                  return null;
                })()}
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
                    {record.gender && ` | ${record.gender === 'male' ? 'Male' : 'Female'}`}
                  </p>
                  {record.bmiPrime && (
                    <p className="text-xs text-indigo-600 font-medium">
                      BMI Prime: {record.bmiPrime}
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-500">{record.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div className="space-y-6">
        {/* How do I calculate BMI? */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">❓ How do I calculate BMI?</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              BMI (Body Mass Index) is calculated using a simple formula:
            </p>
            <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-600">
              <p className="font-bold text-center text-lg">BMI = Weight (kg) ÷ Height (m)²</p>
            </div>
            <p>
              Simply enter your weight and height into our calculator above, and it will automatically compute your BMI. Our tool supports both metric (kg, cm) and imperial (lb, ft) units for your convenience. Regardless of which unit you choose, the calculator internally converts to metric and uses the standard formula above.
            </p>
          </div>
        </div>

        {/* Normal BMI */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">✅ Normal BMI</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              A normal BMI is typically considered to be between <strong>18.5 and 24.9</strong>. This range indicates that your weight is proportionate to your height and is generally associated with lower health risks.
            </p>
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
              <p className="font-semibold text-green-800">💚 Normal BMI Range: 18.5 - 24.9</p>
              <p className="text-sm mt-2">Maintaining a normal BMI is associated with better overall health outcomes and reduced risk of chronic diseases.</p>
            </div>
            <p>
              To maintain a normal BMI, focus on:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Regular physical activity (at least 150 minutes per week)</li>
              <li>A balanced diet rich in fruits, vegetables, and whole grains</li>
              <li>Adequate sleep and stress management</li>
              <li>Regular health check-ups</li>
            </ul>
          </div>
        </div>

        {/* What are the BMI ranges? */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">📊 What are the BMI ranges?</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <p className="font-bold text-blue-800">Underweight</p>
                <p className="text-sm text-gray-700 mt-1">BMI: Below 18.5</p>
                <p className="text-xs text-gray-600 mt-2">May indicate insufficient weight. Consider consulting healthcare provider.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                <p className="font-bold text-green-800">Normal Weight</p>
                <p className="text-sm text-gray-700 mt-1">BMI: 18.5 - 24.9</p>
                <p className="text-xs text-gray-600 mt-2">Healthy weight range. Maintain with regular exercise and balanced diet.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-600">
                <p className="font-bold text-yellow-800">Overweight</p>
                <p className="text-sm text-gray-700 mt-1">BMI: 25.0 - 29.9</p>
                <p className="text-xs text-gray-600 mt-2">Slightly above healthy range. Consider increasing activity and adjusting diet.</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-600">
                <p className="font-bold text-red-800">Obese</p>
                <p className="text-sm text-gray-700 mt-1">BMI: 30.0 and above</p>
                <p className="text-xs text-gray-600 mt-2">Increased health risks. Consult healthcare provider for personalized guidance.</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              <em>Note: BMI is a screening tool and does not directly measure body fat or account for muscle mass, bone density, or other factors.</em>
            </p>
          </div>
        </div>

        {/* Using our body mass index calculator */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🔧 Using our body mass index calculator</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Our BMI calculator is easy to use and provides instant results:
            </p>
            <ol className="list-decimal list-inside space-y-3 ml-2">
              <li><strong>Select Your Unit:</strong> Choose between metric (kg, cm) or imperial (lb, ft) units at the top.</li>
              <li><strong>Enter Your Gender (Optional):</strong> Select your gender to help personalize health recommendations.</li>
              <li><strong>Input Your Weight:</strong> Enter your weight in the selected unit.</li>
              <li><strong>Input Your Height:</strong> Enter your height in the selected unit.</li>
              <li><strong>Auto-Calculate:</strong> Your BMI will be calculated automatically as you type valid values.</li>
              <li><strong>View Results:</strong> Your BMI, category, and personalized advice will appear instantly below the inputs.</li>
            </ol>
            <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-600 mt-4">
              <p className="text-sm font-semibold">💡 Pro Tip: BMI is calculated automatically as you enter values. Your calculation history is saved automatically, allowing you to track your progress over time.</p>
            </div>
          </div>
        </div>

        {/* Other considerations */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🎯 Other considerations</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              While BMI is a useful screening tool, it's important to consider other factors:
            </p>
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800">🏋️ Muscle Mass</p>
                <p className="text-sm mt-1">Muscular individuals may have a higher BMI but lower body fat percentage. BMI doesn't distinguish between muscle and fat.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800">🧬 Genetic Factors</p>
                <p className="text-sm mt-1">Genetics influence metabolism, body composition, and weight distribution. What's healthy varies from person to person.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800">📏 Body Composition</p>
                <p className="text-sm mt-1">Distribution of fat, bone, and muscle affects overall health. Two people with the same BMI may have different health profiles.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800">👴 Age and Gender</p>
                <p className="text-sm mt-1">BMI interpretation may differ based on age and gender. Children, elderly, and certain populations may have different healthy ranges.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800">🏥 Medical Conditions</p>
                <p className="text-sm mt-1">Certain medical conditions can affect weight and BMI. Always consult healthcare professionals for comprehensive health assessment.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">❔ FAQs</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <p className="font-semibold text-gray-800">Q: Is BMI accurate for everyone?</p>
              <p className="text-sm text-gray-700 mt-2">A: BMI is a screening tool, not a diagnostic measure. It may not be accurate for athletes, elderly people, children, or pregnant women. Always consult healthcare professionals for personalized assessment.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <p className="font-semibold text-gray-800">Q: How often should I calculate my BMI?</p>
              <p className="text-sm text-gray-700 mt-2">A: You can track BMI monthly or quarterly as part of your health monitoring routine. Significant changes should prompt a consultation with your healthcare provider.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <p className="font-semibold text-gray-800">Q: Can BMI predict health?</p>
              <p className="text-sm text-gray-700 mt-2">A: BMI is correlated with health risks but doesn't predict individual health. Other factors like blood pressure, cholesterol, fitness level, and family history are equally important.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <p className="font-semibold text-gray-800">Q: What should I do if my BMI is outside the normal range?</p>
              <p className="text-sm text-gray-700 mt-2">A: Consult with a healthcare provider or registered dietitian. They can provide personalized guidance based on your individual health profile and circumstances.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <p className="font-semibold text-gray-800">Q: Does BMI account for muscle mass?</p>
              <p className="text-sm text-gray-700 mt-2">A: No, BMI only uses height and weight. For a complete body composition analysis, consider additional measurements like waist circumference or body fat percentage.</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Q: Can I use this calculator for children?</p>
              <p className="text-sm text-gray-700 mt-2">A: This calculator is designed for adults. Children and teens have different BMI categories based on age and gender percentiles. Consult your pediatrician for children's BMI assessment.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
