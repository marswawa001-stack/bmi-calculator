'use client';

import { useState, useEffect } from 'react';

export default function AnnealingCalculatorContent() {
  const [tmPrimer, setTmPrimer] = useState('');
  const [tmProduct, setTmProduct] = useState('');
  const [unitPrimer, setUnitPrimer] = useState('C');
  const [unitProduct, setUnitProduct] = useState('C');
  const [result, setResult] = useState(null);
  const [resultUnit, setResultUnit] = useState('C');
  const [primerValidation, setPrimerValidation] = useState(null);
  const [productValidation, setProductValidation] = useState(null);
  const [relationalValidation, setRelationalValidation] = useState(null);
  const [resultValidation, setResultValidation] = useState(null);

  const getUnitSymbol = (unit) => {
    if (unit === 'C') return '°C';
    if (unit === 'F') return '°F';
    return 'K';
  };

  const convertToC = (value, unit) => {
    const v = parseFloat(value);
    if (Number.isNaN(v)) return null;
    if (unit === 'C') return v;
    if (unit === 'F') return (v - 32) * (5 / 9);
    if (unit === 'K') return v - 273.15;
    return v;
  };

  const convertFromC = (valueC, unit) => {
    if (unit === 'C') return valueC;
    if (unit === 'F') return valueC * 9 / 5 + 32;
    if (unit === 'K') return valueC + 273.15;
    return valueC;
  };

  const formatTemp = (valueC, unit, decimals = 1) => {
    const v = convertFromC(valueC, unit);
    const fixed = unit === 'K' ? v.toFixed(2) : v.toFixed(decimals);
    return `${fixed}${getUnitSymbol(unit)}`;
  };

  // Format a temperature difference (delta). Delta conversion should NOT apply
  // absolute offsets (no +273.15 for K, no +32 for F). Only scale where appropriate.
  const formatDelta = (deltaC, unit, decimals = 1) => {
    if (unit === 'C') {
      return `${deltaC.toFixed(decimals)}${getUnitSymbol('C')}`;
    }
    if (unit === 'K') {
      // Celsius degree and Kelvin degree are same magnitude for differences
      return `${deltaC.toFixed(decimals)}K`;
    }
    if (unit === 'F') {
      const v = (deltaC * 9) / 5;
      return `${v.toFixed(decimals)}${getUnitSymbol('F')}`;
    }
    return `${deltaC.toFixed(decimals)}${getUnitSymbol('C')}`;
  };

  const cToF = (c) => (c * 9) / 5 + 32;
  const cToK = (c) => c + 273.15;

  const getRecommendedRangeLabel = (type, unit) => {
    let optimal_min, optimal_max, recommended_min, recommended_max, acceptable_min, acceptable_max;
    if (type === 'primer') {
      optimal_min = 52;
      optimal_max = 58;
      recommended_min = 52;
      recommended_max = 64;
      acceptable_min = 50;
      acceptable_max = 68;
    } else {
      optimal_min = 70;
      optimal_max = 90;
      recommended_min = 60;
      recommended_max = 95;
      acceptable_min = 55;
      acceptable_max = 100;
    }
    const convert = (v) => {
      if (unit === 'F') return Number((v * 9 / 5 + 32).toFixed(1));
      if (unit === 'K') return Number((v + 273.15).toFixed(2));
      return v;
    };
    const symbol = unit === 'F' ? '°F' : unit === 'K' ? 'K' : '°C';
    return {
      optimal: `Optimal: ${convert(optimal_min)}-${convert(optimal_max)}${symbol}`,
      recommended: `Recommended: ${convert(recommended_min)}-${convert(recommended_max)}${symbol}`,
      acceptable: `Acceptable: ${convert(acceptable_min)}-${convert(acceptable_max)}${symbol}`
    };
  };

  // Validate Primer Tm: 50-68°C (hard limits)
  const validatePrimerTm = (val, unit) => {
    if (val === '') return null;
    
    const numVal = parseFloat(val);
    if (Number.isNaN(numVal) || numVal <= 0) {
      return { type: 'error', message: 'Primer Tm must be a positive number', showResult: false };
    }

    const numValC = convertToC(numVal, unit);
    if (numValC === null) {
      return { type: 'error', message: 'Invalid temperature value', showResult: false };
    }

    // Hard limits: 50-68°C
    if (numValC < 50) {
      return { type: 'error', message: `Primer Tm is too low (${formatTemp(numValC, unit)}). Acceptable range is ${formatTemp(50, unit)} - ${formatTemp(68, unit)}, ideal range is ${formatTemp(52, unit)} - ${formatTemp(58, unit)}. Please redesign primers or check input.`, showResult: false };
    }
    if (numValC > 68) {
      return { type: 'error', message: `Primer Tm is too high (${formatTemp(numValC, unit)}). Exceeds acceptable range (${formatTemp(50, unit)} - ${formatTemp(68, unit)}), prone to secondary annealing. Please redesign primers.`, showResult: false };
    }

    // Detailed range evaluation
    if (numValC < 52) {
      return { type: 'warning', message: `Primer Tm is low (${formatTemp(numValC, unit)}). At lower limit of acceptable range (${formatTemp(50, unit)} - ${formatTemp(68, unit)}). Ideal range is ${formatTemp(52, unit)} - ${formatTemp(58, unit)}. Recommend optimizing primer design for best results.`, showResult: true };
    }
    if (numValC <= 58) {
      return { type: 'ideal', message: `Primer Tm is in ideal range (${formatTemp(numValC, unit)})`, showResult: true };
    }
    if (numValC <= 64) {
      return { type: 'good', message: `Primer Tm is in recommended range (${formatTemp(numValC, unit)})`, showResult: true };
    }
    
    return { type: 'notice', message: `Primer Tm is slightly high (${formatTemp(numValC, unit)}). Usable but note risk of secondary annealing. Ideal range is ${formatTemp(52, unit)} - ${formatTemp(58, unit)}.`, showResult: true };
  };

  // Validate Product Tm: 55-100°C (hard limits)
  const validateProductTm = (val, unit) => {
    if (val === '') return null;
    
    const numVal = parseFloat(val);
    if (Number.isNaN(numVal) || numVal <= 0) {
      return { type: 'error', message: 'Product Tm must be a positive number', showResult: false };
    }

    const numValC = convertToC(numVal, unit);
    if (numValC === null) {
      return { type: 'error', message: 'Invalid temperature value', showResult: false };
    }

    // Hard limits: 55-100°C
    if (numValC < 55) {
      return { type: 'error', message: `Product Tm is too low (${formatTemp(numValC, unit)}). Out of PCR operation range (${formatTemp(55, unit)} - ${formatTemp(100, unit)}). Please check input.`, showResult: false };
    }
    if (numValC > 100) {
      return { type: 'error', message: `Product Tm exceeds PCR operation range (${formatTemp(55, unit)} - ${formatTemp(100, unit)}). Please check input or redesign. (Current: ${formatTemp(numValC, unit)})`, showResult: false };
    }

    // Detailed range evaluation
    if (numValC < 60) {
      return { type: 'warning', message: `Product Tm is low (${formatTemp(numValC, unit)}). May be very short fragment (<100bp). Please confirm design.`, showResult: true };
    }
    if (numValC < 70) {
      return { type: 'notice', message: `Product Tm is low (${formatTemp(numValC, unit)}). Suitable for short fragments (${formatTemp(60, unit)} - ${formatTemp(70, unit)}).`, showResult: true };
    }
    if (numValC > 95) {
      return { type: 'notice', message: `Product Tm is close to boiling point (${formatTemp(95, unit)} - ${formatTemp(100, unit)}). Please confirm input. May require special PCR conditions.`, showResult: true };
    }
    
    return { type: 'ideal', message: `Product Tm is in standard range (${formatTemp(70, unit)} - ${formatTemp(90, unit)})`, showResult: true };
  };

  // Validate relationship between Primer and Product Tm
  const validateRelation = (primerC, productC, unitPrimer, unitProduct) => {
    if (primerC === null || productC === null) return null;

    const diff = productC - primerC;

    const productDisp = formatTemp(productC, unitProduct);
    const primerDisp = formatTemp(primerC, unitPrimer);
    const diffDisp = formatDelta(diff, unitProduct);

    if (diff < -15) {
      return { type: 'severe', message: `SEVERE WARNING: Product Tm (${productDisp}) is far below Primer Tm (${primerDisp}). Difference: ${diffDisp}. This is abnormal and may indicate design error.`, showResult: true };
    }
    if (diff < -10) {
      return { type: 'warning', message: `WARNING: Product Tm (${productDisp}) is significantly below Primer Tm (${primerDisp}). Difference: ${diffDisp}. Please verify design.`, showResult: true };
    }
    if (diff < -5) {
      return { type: 'notice', message: `Product Tm (${productDisp}) is below Primer Tm (${primerDisp}). Difference: ${diffDisp}.`, showResult: true };
    }
    if (diff < 5) {
      return { type: 'notice', message: `Tip: Product Tm (${productDisp}) and Primer Tm (${primerDisp}) have small difference (${diffDisp}). Ideal difference should be ≥${formatDelta(10, unitProduct)}. Consider optimizing design.`, showResult: true };
    }
    if (diff < 10) {
      return { type: 'good', message: `Product Tm is higher than Primer Tm. Difference: ${diffDisp} is in acceptable range, approaching ideal design.`, showResult: true };
    }
    if (diff <= 30) {
      return { type: 'ideal', message: `Product-Primer Tm difference is ${diffDisp}. In ideal range (${formatDelta(10, unitProduct)} - ${formatDelta(30, unitProduct)}).`, showResult: true };
    }
    if (diff <= 40) {
      return { type: 'good', message: `Product Tm is significantly higher than Primer Tm. Difference: ${diffDisp}. Suitable for long fragment amplification or high GC sequences.`, showResult: true };
    }
    
    return { type: 'notice', message: `Tip: Product-Primer Tm difference is large (${diffDisp}). Please confirm input is correct. If correct, may be applicable to special long fragment amplification.`, showResult: true };
  };

  // Validate calculated Ta*
  const validateTa = (ta) => {
    // Return only type here; messages are generated at render time using chosen result unit
    if (ta < 40) {
      return { type: 'severe', showResult: true };
    }
    if (ta < 50) {
      return { type: 'warning', showResult: true };
    }
    if (ta <= 68) {
      return { type: 'ideal', showResult: true };
    }
    if (ta <= 72) {
      return { type: 'good', showResult: true };
    }
    if (ta <= 75) {
      return { type: 'notice', showResult: true };
    }
    return { type: 'severe', showResult: true };
  };

  const getTaMessage = (type, unit) => {
    if (!type) return '';
    if (type === 'severe') return `At this temperature: • Non-specific amplification risk is extremely high • Primer dimers are severe • PCR specificity is extremely poor. Recommendation: Redesign primers/product to increase Tm values.`;
    if (type === 'warning') return `Below recommended range (${formatTemp(50, unit)} - ${formatTemp(68, unit)}). May cause non-specific amplification. Recommendation: Optimize through gradient PCR or redesign primers.`;
    if (type === 'ideal') return `In standard recommended range (${formatTemp(50, unit)} - ${formatTemp(68, unit)}).`;
    if (type === 'good') return `Moderately high. Suitable for high GC sequences or high-specificity amplification.`;
    if (type === 'notice') return `High. Primers may be difficult to bind target sequence effectively. Recommendation: Lower primer Tm or increase product Tm.`;
    return `Too high. Primers will have difficulty binding target sequence. Recommendation: Redesign primer/product combination.`;
  };

  // Get status icon and color
  const getStatusDisplay = (type) => {
    const display = {
      error: { icon: '❌', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-500' },
      severe: { icon: '⚠️', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-500' },
      warning: { icon: '⚠️', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-500' },
      notice: { icon: '💡', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-500' },
      good: { icon: '✓', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-500' },
      ideal: { icon: '✅', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-500' }
    };
    return display[type] || display.good;
  };

  // Real-time validation and calculation
  useEffect(() => {
    const primerC = tmPrimer ? convertToC(Number(tmPrimer), unitPrimer) : null;
    const productC = tmProduct ? convertToC(Number(tmProduct), unitProduct) : null;

    const primerValid = validatePrimerTm(tmPrimer, unitPrimer);
    const productValid = validateProductTm(tmProduct, unitProduct);
    
    setPrimerValidation(primerValid);
    setProductValidation(productValid);

    // Relational validation
    let relationalValid = null;
    if (primerC !== null && productC !== null && primerValid?.showResult && productValid?.showResult) {
      relationalValid = validateRelation(primerC, productC, unitPrimer, unitProduct);
    }
    setRelationalValidation(relationalValid);

    // Calculate Ta if all validations allow
    if (primerValid?.showResult && productValid?.showResult && primerC !== null && productC !== null) {
      const ta = 0.3 * primerC + 0.7 * productC - 14.9;
      
      if (ta > 0) {
        const taValidation = validateTa(ta);
        setResultValidation(taValidation);

        setResult({
          taC: Number(ta.toFixed(2)),
          taF: Number(cToF(ta).toFixed(2)),
          taK: Number(cToK(ta).toFixed(2)),
          validation: taValidation,
          diff: productC - primerC
        });
      } else {
        setResult(null);
        setResultValidation(null);
      }
    } else {
      setResult(null);
      setResultValidation(null);
    }
  }, [tmPrimer, tmProduct, unitPrimer, unitProduct]);

  const canClear = tmPrimer !== '' || tmProduct !== '' || unitPrimer !== 'C' || unitProduct !== 'C' || result !== null;

  const clearAll = () => {
    setTmPrimer('');
    setTmProduct('');
    setUnitPrimer('C');
    setUnitProduct('C');
    setResult(null);
    setResultUnit('C');
    setPrimerValidation(null);
    setProductValidation(null);
    setRelationalValidation(null);
    setResultValidation(null);
  };

  const getResultValue = () => {
    if (!result) return null;
    if (resultUnit === 'C') return result.taC;
    if (resultUnit === 'F') return result.taF;
    return result.taK;
  };

  const getResultRange = () => {
    if (!result) return null;
    // Standard range: 50-68°C
    const rangeMin = 50;
    const rangeMax = 68;
    
    if (resultUnit === 'F') {
      return { 
        min: Number((rangeMin * 9 / 5 + 32).toFixed(2)), 
        max: Number((rangeMax * 9 / 5 + 32).toFixed(2)) 
      };
    }
    if (resultUnit === 'K') {
      return { 
        min: Number((rangeMin + 273.15).toFixed(2)), 
        max: Number((rangeMax + 273.15).toFixed(2)) 
      };
    }
    return { min: rangeMin, max: rangeMax };
  };

  const handleInputChange = (e, setter) => {
    let value = e.target.value;
    
    if (value !== '' && !/^\d*\.?\d*$/.test(value)) {
      return;
    }

    if (value.includes('.')) {
      const parts = value.split('.');
      if (parts[1].length > 2) {
        return;
      }
    }

    setter(value);
  };

  return (
    <>
      <style>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Annealing Temperature Calculator</h2>
          </div>

          {/* Primer Tm */}
          <div>
            <label className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2 w-full">
              <span>Primer Melting Temperature (Tmp)</span>
              <span className="flex flex-wrap gap-1 align-middle">
                {/* only keep small tags below */}
                  <span className="font-bold text-xs text-green-900 bg-green-100 px-1 py-px rounded">{getRecommendedRangeLabel('primer', unitPrimer).optimal}</span>
                  <span className="font-bold text-xs text-blue-900 bg-blue-100 px-1 py-px rounded">{getRecommendedRangeLabel('primer', unitPrimer).recommended}</span>
                  <span className="font-bold text-xs text-yellow-900 bg-yellow-100 px-1 py-px rounded">{getRecommendedRangeLabel('primer', unitPrimer).acceptable}</span>
              </span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={tmPrimer}
                onChange={(e) => handleInputChange(e, setTmPrimer)}
                placeholder="Acceptable: 50-68°C"
                className={`w-full px-4 py-3 pr-32 border-2 rounded-lg focus:outline-none text-lg text-gray-900 transition ${
                  primerValidation?.type === 'error' ? 'border-red-500 bg-red-50' :
                  primerValidation?.type === 'warning' ? 'border-orange-500 bg-orange-50' :
                  primerValidation?.type === 'notice' ? 'border-yellow-500 bg-yellow-50' :
                  primerValidation?.type === 'ideal' ? 'border-green-500 bg-green-50' :
                  'border-gray-200 focus:border-indigo-500'
                }`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <span className="text-gray-900 font-medium text-sm">{getUnitSymbol(unitPrimer)}</span>
                <select
                  value={unitPrimer}
                  onChange={(e) => {
                    const oldUnit = unitPrimer;
                    const newUnit = e.target.value;
                    if (tmPrimer) {
                      const valueInC = convertToC(Number(tmPrimer), oldUnit);
                      if (valueInC !== null) {
                        const newValue = convertFromC(valueInC, newUnit);
                        setTmPrimer(Number(newValue.toFixed(2)).toString());
                      }
                    }
                    setUnitPrimer(newUnit);
                  }}
                  className="appearance-none bg-transparent cursor-pointer text-gray-900 focus:outline-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3e%3cpath fill='%23111' d='M1 1l5 5 5-5'/%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right center',
                    backgroundSize: '12px',
                    paddingRight: '14px',
                    width: '12px'
                  }}
                >
                  <option value="C">Celsius (°C)</option>
                  <option value="F">Fahrenheit (°F)</option>
                  <option value="K">Kelvin (K)</option>
                </select>
              </div>
            </div>
            {primerValidation && (
              <div className={`text-xs mt-2 flex items-start gap-2 p-2 rounded ${primerValidation.type === 'error' || primerValidation.type === 'severe' ? 'bg-red-50' : primerValidation.type === 'warning' ? 'bg-orange-50' : primerValidation.type === 'notice' ? 'bg-yellow-50' : 'bg-green-50'}`}>
                <span className="flex-shrink-0 mt-0.5">{getStatusDisplay(primerValidation.type).icon}</span>
                <span className={`${getStatusDisplay(primerValidation.type).color}`}>{primerValidation.message}</span>
              </div>
            )}
          </div>

          {/* Product Tm */}
          <div>
            <label className="flex items-center justify-between text-sm font-semibold text-gray-700 mb-2 w-full">
              <span>Product Melting Temperature (Tmt)</span>
              <span className="flex flex-wrap gap-1 align-middle">
                {/* only keep small tags below */}
                  <span className="font-bold text-xs text-green-900 bg-green-100 px-1 py-px rounded">{getRecommendedRangeLabel('product', unitProduct).optimal}</span>
                  <span className="font-bold text-xs text-blue-900 bg-blue-100 px-1 py-px rounded">{getRecommendedRangeLabel('product', unitProduct).recommended}</span>
                  <span className="font-bold text-xs text-yellow-900 bg-yellow-100 px-1 py-px rounded">{getRecommendedRangeLabel('product', unitProduct).acceptable}</span>
              </span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={tmProduct}
                onChange={(e) => handleInputChange(e, setTmProduct)}
                placeholder="Acceptable: 55-100°C"
                className={`w-full px-4 py-3 pr-32 border-2 rounded-lg focus:outline-none text-lg text-gray-900 transition ${
                  productValidation?.type === 'error' ? 'border-red-500 bg-red-50' :
                  productValidation?.type === 'warning' ? 'border-orange-500 bg-orange-50' :
                  productValidation?.type === 'notice' ? 'border-yellow-500 bg-yellow-50' :
                  productValidation?.type === 'ideal' ? 'border-green-500 bg-green-50' :
                  'border-gray-200 focus:border-indigo-500'
                }`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                <span className="text-gray-900 font-medium text-sm">{getUnitSymbol(unitProduct)}</span>
                <select
                  value={unitProduct}
                  onChange={(e) => {
                    const oldUnit = unitProduct;
                    const newUnit = e.target.value;
                    if (tmProduct) {
                      const valueInC = convertToC(Number(tmProduct), oldUnit);
                      if (valueInC !== null) {
                        const newValue = convertFromC(valueInC, newUnit);
                        setTmProduct(Number(newValue.toFixed(2)).toString());
                      }
                    }
                    setUnitProduct(newUnit);
                  }}
                  className="appearance-none bg-transparent cursor-pointer text-gray-900 focus:outline-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3e%3cpath fill='%23111' d='M1 1l5 5 5-5'/%3e%3c/svg%3e")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right center',
                    backgroundSize: '12px',
                    paddingRight: '14px',
                    width: '12px'
                  }}
                >
                  <option value="C">Celsius (°C)</option>
                  <option value="F">Fahrenheit (°F)</option>
                  <option value="K">Kelvin (K)</option>
                </select>
              </div>
            </div>
            {productValidation && (
              <div className={`text-xs mt-2 flex items-start gap-2 p-2 rounded ${productValidation.type === 'error' || productValidation.type === 'severe' ? 'bg-red-50' : productValidation.type === 'warning' ? 'bg-orange-50' : productValidation.type === 'notice' ? 'bg-yellow-50' : 'bg-green-50'}`}>
                <span className="flex-shrink-0 mt-0.5">{getStatusDisplay(productValidation.type).icon}</span>
                <span className={`${getStatusDisplay(productValidation.type).color}`}>{productValidation.message}</span>
              </div>
            )}
          </div>

          {/* Relational Validation */}
          {relationalValidation && (
            <div className={`p-3 rounded-lg flex items-start gap-2 border-l-4 ${
              relationalValidation.type === 'severe' ? 'bg-red-50 border-red-500 text-red-700' :
              relationalValidation.type === 'warning' ? 'bg-orange-50 border-orange-500 text-orange-700' :
              relationalValidation.type === 'notice' ? 'bg-yellow-50 border-yellow-500 text-yellow-700' :
              'bg-green-50 border-green-500 text-green-700'
            }`}>
              <span className="flex-shrink-0 mt-0.5">{getStatusDisplay(relationalValidation.type).icon}</span>
              <span className="text-sm">{relationalValidation.message}</span>
            </div>
          )}

          {/* Clear Button */}
          <div className="flex justify-center">
            <button
              onClick={clearAll}
              disabled={!canClear}
              className={`w-44 px-4 py-2 rounded-lg font-semibold transition ${canClear ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
            >
              Clear All
            </button>
          </div>

          {/* Result Card */}
          {result && (
            <div className={`mt-6 p-6 rounded-xl border-2 transition ${
              result.validation.type === 'ideal' || result.validation.type === 'good' ? 'bg-green-50 border-green-200' :
              result.validation.type === 'notice' ? 'bg-yellow-50 border-yellow-200' :
              result.validation.type === 'warning' ? 'bg-orange-50 border-orange-200' :
              'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold text-gray-700">Calculated Annealing Temperature (Ta*)</p>
                <div className="flex gap-2">
                  {['C', 'F', 'K'].map((unit) => (
                    <button
                      key={unit}
                      onClick={() => setResultUnit(unit)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                        resultUnit === unit 
                          ? unit === 'C' ? 'bg-blue-500 text-white' : unit === 'F' ? 'bg-green-500 text-white' : 'bg-purple-500 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {getUnitSymbol(unit)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className={`text-4xl font-bold ${
                  resultUnit === 'C' ? 'text-blue-600' : resultUnit === 'F' ? 'text-green-600' : 'text-purple-600'
                }`}>{getResultValue()}</p>
                <p className={`text-lg font-semibold mt-1 ${
                  resultUnit === 'C' ? 'text-blue-600' : resultUnit === 'F' ? 'text-green-600' : 'text-purple-600'
                }`}>{getUnitSymbol(resultUnit)}</p>
              </div>

              {/* Result Status - Only show if not ideal */}
              {result.validation.type !== 'ideal' && result.validation.type !== 'good' && (
                <div className={`mt-4 p-3 rounded-lg border-l-4 ${
                  result.validation.type === 'severe' ? 'bg-red-50 border-red-500 text-red-800' :
                  result.validation.type === 'warning' ? 'bg-orange-50 border-orange-500 text-orange-800' :
                  result.validation.type === 'notice' ? 'bg-yellow-50 border-yellow-500 text-yellow-800' :
                  'bg-green-50 border-green-500 text-green-800'
                }`}>
                  <p className="text-sm">
                    <span className="mr-2">{getStatusDisplay(result.validation.type).icon}</span>
                    Annealing temperature ({formatTemp(result.taC, resultUnit)}): {result.validation.message ? result.validation.message : getTaMessage(result.validation.type, resultUnit)}
                  </p>
                </div>
              )}

              {/* Recommended Range */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Standard Recommended Range:</span> {getResultRange()?.min}{getUnitSymbol(resultUnit)} ~ {getResultRange()?.max}{getUnitSymbol(resultUnit)}
                </p>
              </div>

              {/* Tips */}
              <div className="mt-4 pt-4 border-t border-gray-300 space-y-2">
                <p className="text-xs font-semibold text-gray-700 uppercase">Experimental Tips:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Tm formula: Ta = 0.3 × Tmp + 0.7 × Tmt - 14.9 (Rychlik et al., 1990)</li>
                  <li>• Recommended annealing range: {formatTemp(50, resultUnit)} - {formatTemp(68, resultUnit)} for optimal PCR specificity</li>
                  <li>• Use gradient PCR to fine-tune temperature around calculated value</li>
                  <li>• If non-specific bands appear, increase temperature or redesign primers</li>
                  <li>• Primer Tm (Tmp) should use the lower Tm value in primer pair</li>
                  <li>• Product Tm (Tmt) refers to the DNA fragment between primers</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
