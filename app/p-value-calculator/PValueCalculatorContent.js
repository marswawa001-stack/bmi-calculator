'use client';

import { useState, useEffect } from 'react';

// Statistical distribution functions
const erf = (x) => {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  
  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x);
  
  const t = 1.0 / (1.0 + p * x);
  const t2 = t * t;
  const t3 = t2 * t;
  const t4 = t2 * t2;
  const t5 = t4 * t;
  
  const y = 1.0 - (((((a5 * t5 + a4 * t4) + a3 * t3) + a2 * t2) + a1 * t) * Math.exp(-x * x));
  return sign * y;
};

const normalCDF = (x) => {
  return (1.0 + erf(x / Math.sqrt(2.0))) / 2.0;
};

const logGamma = (x) => {
  const coefficients = [
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7
  ];
  
  if (x < 0.5) {
    return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * x)) - logGamma(1 - x);
  }
  
  x -= 1;
  let base = x + 7.5;
  let sum = 0.99999999999980993;
  
  for (let i = 0; i < coefficients.length; i++) {
    sum += coefficients[i] / (x + i + 1);
  }
  
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(base) - base + Math.log(sum);
};

// Incomplete gamma function for chi-square CDF
const lowerIncompleteGamma = (a, x) => {
  // Series representation for P(a,x)
  if (x < 0 || a <= 0) return 0;
  if (x === 0) return 0;
  
  const ITMAX = 100;
  const EPS = 3e-7;
  
  let sum = 1 / a;
  let del = sum;
  let ap = a;
  
  for (let n = 1; n <= ITMAX; n++) {
    ap++;
    del *= x / ap;
    sum += del;
    if (Math.abs(del) < Math.abs(sum) * EPS) {
      return sum * Math.exp(-x + a * Math.log(x) - logGamma(a));
    }
  }
  
  return sum * Math.exp(-x + a * Math.log(x) - logGamma(a));
};

const upperIncompleteGamma = (a, x) => {
  // Continued fraction for Q(a,x) = 1 - P(a,x)
  if (x < 0 || a <= 0) return 0;
  
  const ITMAX = 100;
  const EPS = 3e-7;
  const FPMIN = 1e-30;
  
  let b = x + 1 - a;
  let c = 1 / FPMIN;
  let d = 1 / b;
  let h = d;
  
  for (let i = 1; i <= ITMAX; i++) {
    const an = -i * (i - a);
    b += 2;
    d = an * d + b;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = b + an / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < EPS) break;
  }
  
  return Math.exp(-x + a * Math.log(x) - logGamma(a)) * h;
};

const chiSquareCDF = (x, df) => {
  // Chi-square CDF = P(df/2, x/2)
  if (x <= 0) return 0;
  if (df <= 0) return 0;
  
  const a = df / 2;
  const z = x / 2;
  
  // Choose series or continued fraction based on x vs a+1
  if (z < a + 1) {
    // Use series (more accurate for small x)
    return lowerIncompleteGamma(a, z);
  } else {
    // Use continued fraction (more accurate for large x)
    return 1 - upperIncompleteGamma(a, z);
  }
};

// Regularized incomplete beta function using continued fraction (Lentz method)
const incompleteBeta = (a, b, x) => {
  if (x < 0 || x > 1) return 0;
  if (x === 0) return 0;
  if (x === 1) return 1;
  
  // Use symmetry for better convergence when x > 0.5
  if (x > (a + 1) / (a + b + 2)) {
    return 1 - incompleteBeta(b, a, 1 - x);
  }
  
  const lbeta = logGamma(a) + logGamma(b) - logGamma(a + b);
  const front = Math.exp(Math.log(x) * a + Math.log(1 - x) * b - lbeta);
  
  // Continued fraction using modified Lentz's method
  const FPMIN = 1e-30;
  const EPS = 3e-7;
  
  let qab = a + b;
  let qap = a + 1;
  let qam = a - 1;
  let c = 1;
  let d = 1 - qab * x / qap;
  
  if (Math.abs(d) < FPMIN) d = FPMIN;
  d = 1 / d;
  let h = d;
  
  for (let m = 1; m <= 200; m++) {
    const m2 = 2 * m;
    let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    h = h * d * c;
    
    aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < FPMIN) d = FPMIN;
    c = 1 + aa / c;
    if (Math.abs(c) < FPMIN) c = FPMIN;
    d = 1 / d;
    const del = d * c;
    h = h * del;
    
    if (Math.abs(del - 1) < EPS) break;
  }
  
  return front * h / a;
};

const tDistributionCDF = (t, df) => {
  // t-distribution CDF formula:
  // For t >= 0: CDF = 1 - 0.5 * I_x(df/2, 1/2)
  // For t < 0:  CDF = 0.5 * I_x(df/2, 1/2)
  // where x = df / (df + t²)
  
  if (df <= 0) return 0;
  
  const x = df / (df + t * t);
  const regularizedBeta = incompleteBeta(df / 2, 0.5, x);
  
  if (t >= 0) {
    return 1 - 0.5 * regularizedBeta;
  } else {
    return 0.5 * regularizedBeta;
  }
};

const fDistributionCDF = (f, df1, df2) => {
  // F-distribution CDF using relationship with beta distribution
  // CDF = I_x(df1/2, df2/2) where x = (df1*F)/(df1*F + df2)
  
  if (f <= 0) return 0;
  if (df1 <= 0 || df2 <= 0) return 0;
  
  const x = (df1 * f) / (df1 * f + df2);
  return incompleteBeta(df1 / 2, df2 / 2, x);
};

export default function PValueCalculatorContent() {
  const [testType, setTestType] = useState('z-test');
  const [tailType, setTailType] = useState('two-tailed');
  const [chiTailType, setChiTailType] = useState('right-tailed'); // For chi-square
  const [alpha, setAlpha] = useState(0.05);
  
  // Statistics mode
  const [statistic, setStatistic] = useState('');
  const [df, setDf] = useState('');
  
  // F-test mode
  const [fStatistic, setFStatistic] = useState('');
  const [df1, setDf1] = useState('');
  const [df2, setDf2] = useState('');
  
  // Chi-square mode
  const [chiSquare, setChiSquare] = useState('');
  const [chiDf, setChiDf] = useState('');
  
  // Results
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  
  const validateInput = (val) => {
    if (val === '') return true;
    if (!/^(\d+\.?\d*|\.\d+)$/.test(val)) return false;
    return parseFloat(val) > 0;
  };
  
  const validateDF = (val) => {
    if (val === '') return true;
    if (!/^(\d+\.?\d*|\.\d+)$/.test(val)) return false;
    const num = parseFloat(val);
    return num > 0 && num <= 10000;
  };
  
  // Auto-recalculate when tail type changes if there's already a result
  useEffect(() => {
    if (result) {
      calculatePValue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tailType, chiTailType]);
  
  // Auto-calculate when inputs change
  useEffect(() => {
    const canCalculate = () => {
      if (testType === 'chi-square') {
        return chiSquare && chiDf && validateInput(chiSquare) && validateDF(chiDf);
      } else if (testType === 't-test') {
        return statistic && df && validateInput(statistic) && validateDF(df);
      } else if (testType === 'z-test') {
        return statistic && validateInput(statistic);
      } else if (testType === 'f-test') {
        return fStatistic && df1 && df2 && validateInput(fStatistic) && validateDF(df1) && validateDF(df2);
      }
      return false;
    };
    
    if (canCalculate()) {
      calculatePValue();
    } else {
      setResult(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testType, statistic, df, fStatistic, df1, df2, chiSquare, chiDf]);
  
  const calculatePValue = () => {
    setError('');
    
    if (testType === 't-test') {
      if (!validateInput(statistic) || !validateDF(df)) {
        if (!validateDF(df) && df && parseFloat(df) > 10000) {
          setError('Degrees of freedom cannot exceed 10000!');
        } else {
          setError('Please enter valid positive numbers for t-statistic and degrees of freedom');
        }
        return;
      }
      
      const t = parseFloat(statistic);
      const degrees = parseFloat(df);
      
      let pValue;
      
      if (tailType === 'two-tailed') {
          // Two-tailed: P(|T| > |t|)
          const cdfValue = tDistributionCDF(Math.abs(t), degrees);
          pValue = Math.min((1 - cdfValue) * 2, 1);
        } else if (tailType === 'left-tailed') {
          // Left-tailed: P(T < t)
          const cdfValue = tDistributionCDF(t, degrees);
          pValue = cdfValue;
        } else {
          // Right-tailed: P(T > t)
          const cdfValue = tDistributionCDF(t, degrees);
          pValue = 1 - cdfValue;
        }
        
        setResult({
          type: 't-test',
          statistic: t,
          df: degrees,
          pValue: pValue.toFixed(9),
          tailType,
        });
    } else if (testType === 'z-test') {
      if (!validateInput(statistic)) {
        setError('Please enter a valid z-statistic');
        return;
      }
      
      const z = parseFloat(statistic);
      let pValue;
      
      if (tailType === 'two-tailed') {
        // Two-tailed: P(|Z| > |z|)
        const cdfValue = normalCDF(Math.abs(z));
        pValue = Math.min((1 - cdfValue) * 2, 1);
      } else if (tailType === 'left-tailed') {
        // Left-tailed: P(Z < z)
        const cdfValue = normalCDF(z);
        pValue = cdfValue;
      } else {
        // Right-tailed: P(Z > z)
        const cdfValue = normalCDF(z);
        pValue = 1 - cdfValue;
      }
      
      setResult({
        type: 'z-test',
        statistic: z,
        pValue: pValue.toFixed(9),
        tailType,
      });
    } else if (testType === 'chi-square') {
      if (!validateInput(chiSquare) || !validateDF(chiDf)) {
        if (!validateDF(chiDf) && chiDf && parseFloat(chiDf) > 10000) {
          setError('Degrees of freedom cannot exceed 10000!');
        } else {
          setError('Please enter valid positive numbers for chi-square and degrees of freedom');
        }
        return;
      }
      
      const chi = parseFloat(chiSquare);
      const degrees = parseFloat(chiDf);
      
      const cdfValue = chiSquareCDF(chi, degrees);
      let pValue;
      
      if (chiTailType === 'right-tailed') {
        // P(χ² > observed) - Most common for goodness-of-fit
        pValue = 1 - cdfValue;
      } else if (chiTailType === 'left-tailed') {
        // P(χ² < observed) - For variance tests
        pValue = cdfValue;
      } else {
        // Two-tailed - P(|χ² - df| > |observed - df|)
        const expected = degrees;
        const diff = Math.abs(chi - expected);
        // Calculate probability in both tails
        if (chi > expected) {
          pValue = 2 * (1 - cdfValue);
        } else {
          pValue = 2 * cdfValue;
        }
        pValue = Math.min(pValue, 1);
      }
      
      setResult({
        type: 'chi-square',
        statistic: chi,
        df: degrees,
        pValue: pValue.toFixed(9),
        tailType: chiTailType,
      });
    } else if (testType === 'f-test') {
      if (!validateInput(fStatistic) || !validateDF(df1) || !validateDF(df2)) {
        if ((!validateDF(df1) && df1 && parseFloat(df1) > 10000) || (!validateDF(df2) && df2 && parseFloat(df2) > 10000)) {
          setError('Degrees of freedom cannot exceed 10000!');
        } else {
          setError('Please enter valid positive numbers for F-statistic and degrees of freedom');
        }
        return;
      }
      
      const f = parseFloat(fStatistic);
      const degrees1 = parseFloat(df1);
      const degrees2 = parseFloat(df2);
      
      const cdfValue = fDistributionCDF(f, degrees1, degrees2);
      let pValue;
      
      if (tailType === 'two-tailed') {
        // Two-tailed F-test (rare, for equality of variances)
        if (f >= 1) {
          pValue = 2 * Math.min(1 - cdfValue, 0.5);
        } else {
          pValue = 2 * Math.min(cdfValue, 0.5);
        }
      } else if (tailType === 'left-tailed') {
        // Left-tailed: P(F < f)
        pValue = cdfValue;
      } else {
        // Right-tailed: P(F > f) - Most common for F-test
        pValue = 1 - cdfValue;
      }
      
      setResult({
        type: 'f-test',
        statistic: f,
        df1: degrees1,
        df2: degrees2,
        pValue: pValue.toFixed(9),
        tailType,
      });
    }
  };
  
  const resetCalculator = () => {
    setStatistic('');
    setDf('');
    setFStatistic('');
    setDf1('');
    setDf2('');
    setChiSquare('');
    setChiDf('');
    setResult(null);
    setError('');
  };
  
  const interpretPValue = (pVal) => {
    const p = parseFloat(pVal);
    if (p < 0.001) return "Very strong evidence against the null hypothesis (p < 0.001)";
    if (p < 0.01) return "Strong evidence against the null hypothesis (p < 0.01)";
    if (p < 0.05) return "Moderate evidence against the null hypothesis (p < 0.05)";
    if (p < 0.1) return "Weak evidence against the null hypothesis (p < 0.1)";
    return "Insufficient evidence against the null hypothesis (p ≥ 0.1)";
  };

  const isCalculateDisabled = () => {
    if (testType === 'chi-square') {
      return !chiSquare || !chiDf;
    } else if (testType === 't-test') {
      return !statistic || !df;
    } else if (testType === 'z-test') {
      return !statistic;
    } else if (testType === 'f-test') {
      return !fStatistic || !df1 || !df2;
    }
    return true;
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Calculator Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculate P-Value</h2>
        
        {/* Test Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Test Type</label>
          <div className="grid grid-cols-4 gap-3">
            {['z-test', 't-test', 'chi-square', 'f-test'].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setTestType(type);
                  setResult(null);
                  setError('');
                }}
                className={`py-3 px-4 rounded-lg font-semibold transition ${
                  testType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.replace('-', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        
        {/* Type of P-Value Selection (for t, z, and f tests) */}
        {(testType === 't-test' || testType === 'z-test' || testType === 'f-test') && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Type of P-Value</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => {
                  setTailType('two-tailed');
                }}
                className={`py-3 px-4 rounded-lg font-semibold transition ${
                  tailType === 'two-tailed'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Two-tailed
                <span className="block text-xs font-normal mt-1">different from reference</span>
              </button>
              <button
                onClick={() => {
                  setTailType('left-tailed');
                }}
                className={`py-3 px-4 rounded-lg font-semibold transition ${
                  tailType === 'left-tailed'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Left-tailed
                <span className="block text-xs font-normal mt-1">lower than reference</span>
              </button>
              <button
                onClick={() => {
                  setTailType('right-tailed');
                }}
                className={`py-3 px-4 rounded-lg font-semibold transition ${
                  tailType === 'right-tailed'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Right-tailed
                <span className="block text-xs font-normal mt-1">greater than reference</span>
              </button>
            </div>
          </div>
        )}
        
        {/* P-Value Type Selection (for chi-square test) */}
        {testType === 'chi-square' && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Type of P-Value</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => {
                  setChiTailType('two-tailed');
                }}
                className={`py-3 px-4 rounded-lg font-semibold transition ${
                  chiTailType === 'two-tailed'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Two-tailed
                <span className="block text-xs font-normal mt-1">different from reference</span>
              </button>
              <button
                onClick={() => {
                  setChiTailType('left-tailed');
                }}
                className={`py-3 px-4 rounded-lg font-semibold transition ${
                  chiTailType === 'left-tailed'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Left-tailed
                <span className="block text-xs font-normal mt-1">lower than reference</span>
              </button>
              <button
                onClick={() => {
                  setChiTailType('right-tailed');
                }}
                className={`py-3 px-4 rounded-lg font-semibold transition ${
                  chiTailType === 'right-tailed'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Right-tailed
                <span className="block text-xs font-normal mt-1">greater than reference</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Significance Level Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Significance Level (α)
          </label>
          <div className="grid grid-cols-4 gap-3">
            {[
              { value: 0.10, label: '0.10 (10%)' },
              { value: 0.05, label: '0.05 (5%)' },
              { value: 0.01, label: '0.01 (1%)' },
              { value: 0.001, label: '0.001 (0.1%)' }
            ].map((level) => (
              <button
                key={level.value}
                onClick={() => {
                  setAlpha(level.value);
                  setResult(null);
                }}
                className={`py-3 px-4 rounded-lg font-semibold transition ${
                  alpha === level.value
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Input Fields */}
        <div className="mb-6 p-6 bg-blue-50 rounded-xl">
          {testType === 'f-test' ? (
            <>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your F-score
                  </label>
                  <input
                    type="number"
                    value={fStatistic}
                    onChange={(e) => setFStatistic(e.target.value)}
                    placeholder="e.g., 2.5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-gray-800 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Numerator degrees of freedom (d₁)
                  </label>
                  <input
                    type="number"
                    value={df1}
                    onChange={(e) => setDf1(e.target.value)}
                    placeholder="e.g., 5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-gray-800 bg-white"
                  />
                  {df1 && parseFloat(df1) > 10000 && (
                    <p className="text-red-600 text-sm mt-1 font-semibold">⚠️ Cannot exceed 10000!</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Denominator degrees of freedom (d₂)
                  </label>
                  <input
                    type="number"
                    value={df2}
                    onChange={(e) => setDf2(e.target.value)}
                    placeholder="e.g., 10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-gray-800 bg-white"
                  />
                  {df2 && parseFloat(df2) > 10000 && (
                    <p className="text-red-600 text-sm mt-1 font-semibold">⚠️ Cannot exceed 10000!</p>
                  )}
                </div>
              </div>
            </>
          ) : testType === 'chi-square' ? (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your χ²-score
                  </label>
                  <input
                    type="number"
                    value={chiSquare}
                    onChange={(e) => setChiSquare(e.target.value)}
                    placeholder="e.g., 5.23"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-gray-800 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Degrees of Freedom
                  </label>
                  <input
                    type="number"
                    value={chiDf}
                    onChange={(e) => setChiDf(e.target.value)}
                    placeholder="e.g., 3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-gray-800 bg-white"
                  />
                  {chiDf && parseFloat(chiDf) > 10000 && (
                    <p className="text-red-600 text-sm mt-1 font-semibold">⚠️ Cannot exceed 10000!</p>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {testType === 't-test' ? 'Your t-score' : 'Your Z-score'}
                  </label>
                  <input
                    type="number"
                    value={statistic}
                    onChange={(e) => setStatistic(e.target.value)}
                    placeholder={testType === 't-test' ? "e.g., 2.31" : "e.g., 1.96"}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-gray-800 bg-white"
                  />
                </div>
                {testType === 't-test' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Degrees of Freedom
                    </label>
                    <input
                      type="number"
                      value={df}
                      onChange={(e) => setDf(e.target.value)}
                      placeholder="e.g., 18"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 text-gray-800 bg-white"
                    />
                    {df && parseFloat(df) > 10000 && (
                      <p className="text-red-600 text-sm mt-1 font-semibold">⚠️ Cannot exceed 10000!</p>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {/* Buttons */}
        <div className="flex justify-center">
          <button
            onClick={resetCalculator}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Clear all changes
          </button>
        </div>
      </div>
      
      {/* Results */}
      {result && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Results</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <p className="text-gray-600 text-sm mb-1">Test Type</p>
              <p className="text-2xl font-bold text-blue-600">{result.type}</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <p className="text-gray-600 text-sm mb-1">P-Value</p>
              <p className="text-2xl font-bold text-green-600">{result.pValue}</p>
            </div>
          </div>
          
          {/* Statistical Decision */}
          <div className={`rounded-xl p-6 mb-6 ${parseFloat(result.pValue) < alpha ? 'bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-300' : 'bg-gradient-to-br from-gray-50 to-slate-50 border-2 border-gray-300'}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Significance Level (α)</p>
                <p className="text-2xl font-bold text-gray-800">{alpha}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Decision</p>
                <p className={`text-xl font-bold ${parseFloat(result.pValue) < alpha ? 'text-red-600' : 'text-gray-600'}`}>
                  {parseFloat(result.pValue) < alpha ? '✓ Reject H₀' : '✗ Fail to Reject H₀'}
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-700">
                {parseFloat(result.pValue) < alpha ? (
                  <>
                    <strong className="text-red-600">Statistically Significant:</strong> The p-value ({result.pValue}) is less than α ({alpha}), so we reject the null hypothesis. There is sufficient evidence to conclude that the effect is real.
                  </>
                ) : (
                  <>
                    <strong className="text-gray-600">Not Statistically Significant:</strong> The p-value ({result.pValue}) is greater than or equal to α ({alpha}), so we fail to reject the null hypothesis. There is insufficient evidence to conclude that the effect is real.
                  </>
                )}
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-400 rounded p-4 mb-6">
            <p className="text-gray-700">
              <strong>Interpretation:</strong> {interpretPValue(result.pValue)}
            </p>
          </div>
          
          <div className="text-sm text-gray-600 space-y-2">
            {result.statistic && <p><strong>Test Statistic:</strong> {result.statistic}</p>}
            {result.df && <p><strong>Degrees of Freedom:</strong> {result.df}</p>}
            {result.df1 && result.df2 && <p><strong>Degrees of Freedom:</strong> DF1 = {result.df1}, DF2 = {result.df2}</p>}
            {result.tailType && <p><strong>Test Direction:</strong> {result.tailType}</p>}
          </div>
        </div>
      )}
      
      
    </div>
  );
}
