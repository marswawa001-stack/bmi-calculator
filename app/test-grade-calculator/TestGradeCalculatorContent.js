'use client';

import { useState, useMemo, useEffect } from 'react';

export default function TestGradeCalculatorContent() {
  const [totalQuestions, setTotalQuestions] = useState('');
  const [wrongAnswers, setWrongAnswers] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState('');
  const [inputMode, setInputMode] = useState('correct');
  const [result, setResult] = useState(null);
  const [isResultValid, setIsResultValid] = useState(true);
  const [calcError, setCalcError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });
  const [showScaleEditor, setShowScaleEditor] = useState(false);
  const [queryCorrectScore, setQueryCorrectScore] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [queryError, setQueryError] = useState('');
  const [activeSegment, setActiveSegment] = useState(0);
  const [segmentCache, setSegmentCache] = useState({});

  const [gradingScale, setGradingScale] = useState({
    'A+': 97,
    'A': 93,
    'A-': 90,
    'B+': 87,
    'B': 83,
    'B-': 80,
    'C+': 77,
    'C': 73,
    'C-': 70,
    'D+': 67,
    'D': 63,
    'D-': 60,
    'F': 0,
  });
  const [scaleEditValues, setScaleEditValues] = useState({});

  // 从 gradingScale 生成 gradeRanges，支持自定义等级系统
  const gradeRanges = useMemo(() => {
    const gradeLetters = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
    const ranges = [];
    
    for (let i = 0; i < gradeLetters.length; i++) {
      const letter = gradeLetters[i];
      const min = gradingScale[letter] !== undefined ? gradingScale[letter] : 0;
      
      // 计算 max：下一个等级的最小值减去 0.01
      let max;
      if (i === 0) {
        max = 100;
      } else {
        const prevLetter = gradeLetters[i - 1];
        max = Math.max(min, (gradingScale[prevLetter] !== undefined ? gradingScale[prevLetter] : 0) - 0.01);
      }
      
      ranges.push({ letter, min, max });
    }
    
    return ranges;
  }, [gradingScale]);

  // 生成成绩表的函数，支持指定范围和采样
  const generateGradeTable = (total, startScore = 0, endScore = null) => {
    if (!endScore) endScore = total;
    
    const table = [];
    const rangeSize = endScore - startScore;
    
    // 计算采样步长
    let step = 1;
    // 只有当 total > 10000 时才采样，否则显示所有分数
    if (total > 10000 && rangeSize > 50) {
      step = Math.ceil(rangeSize / 50);
    }
    
    // 显示分数序列（可能采样），从最低分到最高分
    for (let i = startScore; i <= Math.min(Math.floor(endScore), total); i += step) {
      const correct = i;
      const percentage = Math.round((correct / total) * 100 * 100) / 100;
      let grade = 'F';
      for (const range of gradeRanges) {
        if (percentage >= range.min && percentage <= range.max) {
          grade = range.letter;
          break;
        }
      }
      table.push({ correct, wrong: total - correct, percentage, grade });
    }
    
    // 确保包含终点
    if (table.length === 0 || table[table.length - 1].correct !== Math.min(Math.floor(endScore), total)) {
      const correct = Math.min(Math.floor(endScore), total);
      const percentage = Math.round((correct / total) * 100 * 100) / 100;
      let grade = 'F';
      for (const range of gradeRanges) {
        if (percentage >= range.min && percentage <= range.max) {
          grade = range.letter;
          break;
        }
      }
      table.push({ correct, wrong: total - correct, percentage, grade });
    }
    
    return table;
  };

  // 计算分段信息
  const getSegmentInfo = useMemo(() => {
    if (!totalQuestions || isNaN(totalQuestions)) return { shouldSegment: false, segments: [] };
    const total = parseFloat(totalQuestions);
    
    // 只有 > 500 才分段
    if (total <= 500) {
      return { shouldSegment: false, segments: [] };
    }
    
    const segments = [];
    
    if (total <= 10000) {
      // ≤ 10000：第一个分段是 0-500，之后按固定粒度分段
      let segmentSize = 100;
      if (total > 5000) segmentSize = 500;
      else if (total > 2000) segmentSize = 200;
      else if (total > 1000) segmentSize = 150;
      
      // 第一个分段始终是 0-500
      segments.push({ start: 0, end: 500, label: '0-500' });
      
      // 之后按动态粒度继续分段
      for (let start = 500; start < total; start += segmentSize) {
        const end = Math.min(start + segmentSize, total);
        segments.push({ start, end, label: `${start}-${end}` });
      }
    } else {
      // > 10000：按百分比分段，目标是 20 个分段
      const segmentSize = Math.ceil(total / 20);
      for (let start = 0; start < total; start += segmentSize) {
        const end = Math.min(start + segmentSize, total);
        segments.push({ start, end, label: `${start}-${end}` });
      }
    }
    
    return { shouldSegment: true, segments };
  }, [totalQuestions]);

  // 获取当前段的表格数据（懒加载）
  const getSegmentTable = (segmentIndex) => {
    if (!totalQuestions || isNaN(totalQuestions)) return [];
    const total = parseFloat(totalQuestions);
    
    // 如果不需要分段，返回完整表格
    if (!getSegmentInfo.shouldSegment) {
      return generateGradeTable(total, 0, total);
    }
    
    // 验证 segmentIndex 的有效性
    if (segmentIndex < 0 || segmentIndex >= getSegmentInfo.segments.length) {
      return [];
    }
    
    // 需要分段时，只生成当前分段的数据
    const cacheKey = `${totalQuestions}_${segmentIndex}`;
    if (segmentCache[cacheKey]) {
      return segmentCache[cacheKey];
    }
    
    const segment = getSegmentInfo.segments[segmentIndex];
    if (!segment) {
      return [];
    }
    
    const table = generateGradeTable(total, segment.start, segment.end);
    
    // 缓存这个段的数据
    setSegmentCache(prev => ({ ...prev, [cacheKey]: table }));
    
    return table;
  };

  // 获取当前要显示的表格
  const gradeTable = useMemo(() => {
    return getSegmentTable(activeSegment);
  }, [totalQuestions, activeSegment, getSegmentInfo, segmentCache, gradeRanges]);

  const validateInput = (val) => {
    if (val === '') return { valid: false, error: '' };
    if (!/^(\d+\.?\d*|\.\d+)$/.test(val)) {
      return { valid: false, error: 'Please enter only positive numbers' };
    }
    if (parseFloat(val) < 0) {
      return { valid: false, error: 'Must be greater than or equal to 0' };
    }
    return { valid: true, error: '' };
  };

  const getGradeForScore = (correct, total) => {
    const percentage = Math.round((correct / total) * 100 * 100) / 100;
    let grade = 'F';
    for (const range of gradeRanges) {
      if (percentage >= range.min && percentage <= range.max) {
        grade = range.letter;
        break;
      }
    }
    return { correct, wrong: total - correct, percentage, grade };
  };

  // 自动更新 queryResult 当 Grade Scale 改变或查询分数改变时
  const autoUpdatedQueryResult = useMemo(() => {
    if (!queryCorrectScore || !totalQuestions || isNaN(totalQuestions)) {
      setQueryError('');
      return null;
    }
    const scoreNum = parseFloat(queryCorrectScore);
    const totalNum = parseFloat(totalQuestions);
    
    // 检查是否超过总分
    if (scoreNum > totalNum) {
      setQueryError(`Score cannot exceed total questions (${totalNum})`);
      return null;
    }
    
    // 验证分数
    const validation = validateInput(queryCorrectScore);
    if (!validation.valid || scoreNum < 0) {
      setQueryError('');
      return null;
    }
    
    setQueryError('');
    // 返回计算的结果
    return getGradeForScore(scoreNum, totalNum);
  }, [queryCorrectScore, totalQuestions, gradeRanges]);

  // 自动更新 queryResult（响应 Grade Scale 改变）
  useMemo(() => {
    if (autoUpdatedQueryResult) {
      setQueryResult(autoUpdatedQueryResult);
    } else {
      setQueryResult(null);
    }
  }, [autoUpdatedQueryResult]);

  // 自动滚动到查询结果的高亮位置
  useEffect(() => {
    if (!queryResult || !totalQuestions || isNaN(totalQuestions)) return;
    
    const totalNum = parseFloat(totalQuestions);
    const scoreNum = parseFloat(queryCorrectScore);
    
    // 延迟以确保 DOM 已更新
    setTimeout(() => {
      // 如果启用了分段，自动跳转到包含该分数的分段
      if (getSegmentInfo.shouldSegment && getSegmentInfo.segments.length > 0) {
        const segmentIndex = getSegmentInfo.segments.findIndex(
          segment => scoreNum >= segment.start && scoreNum <= segment.end
        );
        if (segmentIndex !== -1 && segmentIndex !== activeSegment) {
          setActiveSegment(segmentIndex);
          
          // 滚动分段选项卡到视图中
          setTimeout(() => {
            const segmentButtons = document.querySelectorAll('#grade-table .flex button');
            if (segmentButtons.length > segmentIndex) {
              const targetButton = segmentButtons[segmentIndex];
              targetButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
          }, 30);
        }
      }
      
      // 滚动到高亮的列（不滑动屏幕）
      setTimeout(() => {
        const tableBody = document.querySelector('#grade-table table tbody');
        if (tableBody) {
          const cells = tableBody.querySelectorAll('td');
          let targetCell = null;
          
          // 找到第一行（%行）中对应的高亮列
          if (cells.length > 0) {
            const firstRowCells = Array.from(cells).slice(0, gradeTable.length + 1);
            for (let i = 1; i < firstRowCells.length; i++) {
              const cell = firstRowCells[i];
              if (cell.classList.contains('bg-yellow-100')) {
                targetCell = cell;
                break;
              }
            }
          }
          
          if (targetCell) {
            targetCell.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        }
      }, 50);
    }, 10);
  }, [queryResult, getSegmentInfo, gradeTable, activeSegment, totalQuestions, queryCorrectScore]);

  const handleInputChange = (value, setter) => {
    if (value === '' || /^(\d+\.?\d*|\.\d+)?$/.test(value)) {
      setter(value);
    }
  };

  // 计算 Reset 按钮是否应该启用
  const shouldEnableReset = useMemo(() => {
    // 当有任何非空输入或 Input Mode 不是默认值时启用
    return totalQuestions !== '' || correctAnswers !== '' || wrongAnswers !== '' || inputMode !== 'correct';
  }, [totalQuestions, correctAnswers, wrongAnswers, inputMode]);

  // 计算验证错误信息
  const calcValidationError = useMemo(() => {
    if (!totalQuestions && !correctAnswers && !wrongAnswers) {
      return '';
    }

    if (totalQuestions && (correctAnswers || wrongAnswers)) {
      const totalQuestionsNum = parseFloat(totalQuestions);
      const totalValidation = validateInput(totalQuestions);

      if (!totalValidation.valid || totalQuestionsNum <= 0) {
        return 'Total questions must be a valid positive number';
      }

      if (inputMode === 'wrong' && wrongAnswers) {
        const wrongValidation = validateInput(wrongAnswers);
        if (!wrongValidation.valid) {
          return 'Wrong answers must be a valid number';
        }
        const wrong = parseFloat(wrongAnswers);
        if (wrong > totalQuestionsNum) {
          return `Wrong answers cannot exceed total questions (${totalQuestionsNum})`;
        }
        if (wrong < 0) {
          return 'Wrong answers cannot be negative';
        }
      }

      if (inputMode === 'correct' && correctAnswers) {
        const correctValidation = validateInput(correctAnswers);
        if (!correctValidation.valid) {
          return 'Correct answers must be a valid number';
        }
        const correct = parseFloat(correctAnswers);
        if (correct > totalQuestionsNum) {
          return `Correct answers cannot exceed total questions (${totalQuestionsNum})`;
        }
        if (correct < 0) {
          return 'Correct answers cannot be negative';
        }
      }
    }

    return '';
  }, [totalQuestions, correctAnswers, wrongAnswers, inputMode]);

  // 自动计算成绩（当输入都合法时）
  const autoCalculatedResult = useMemo(() => {
    if (!totalQuestions || !gradeRanges.length) {
      return null;
    }

    const totalQuestionsNum = parseFloat(totalQuestions);
    const totalValidation = validateInput(totalQuestions);

    if (!totalValidation.valid || totalQuestionsNum <= 0) {
      return null;
    }

    if (!wrongAnswers && !correctAnswers) {
      return null;
    }

    let correct;

    if (inputMode === 'wrong') {
      if (!wrongAnswers) {
        return null;
      }
      const wrongValidation = validateInput(wrongAnswers);
      if (!wrongValidation.valid) {
        return null;
      }
      const wrong = parseFloat(wrongAnswers);
      if (wrong > totalQuestionsNum || wrong < 0) {
        return null;
      }
      correct = totalQuestionsNum - wrong;
    } else {
      if (!correctAnswers) {
        return null;
      }
      const correctValidation = validateInput(correctAnswers);
      if (!correctValidation.valid) {
        return null;
      }
      correct = parseFloat(correctAnswers);
      if (correct > totalQuestionsNum || correct < 0) {
        return null;
      }
    }

    const percentage = (correct / totalQuestionsNum) * 100;

    let grade = 'F';
    for (const range of gradeRanges) {
      if (percentage >= range.min && percentage <= range.max) {
        grade = range.letter;
        break;
      }
    }

    const isPassing = percentage >= 60;

    return {
      correct: Math.round(correct * 100) / 100,
      wrong: Math.round((totalQuestionsNum - correct) * 100) / 100,
      total: totalQuestionsNum,
      percentage: Math.round(percentage * 100) / 100,
      grade,
      isPassing,
    };
  }, [totalQuestions, correctAnswers, wrongAnswers, inputMode, gradeRanges]);

  // 自动更新 result 并追踪有效性
  useEffect(() => {
    setCalcError(calcValidationError);
    if (autoCalculatedResult) {
      setResult(autoCalculatedResult);
      setIsResultValid(true);
    } else if (totalQuestions && (correctAnswers || wrongAnswers)) {
      // 有输入但结果无效 - 保留旧数据，标记为无效
      setIsResultValid(false);
    } else {
      // 没有输入 - 清空结果
      setResult(null);
      setIsResultValid(true);
    }
  }, [autoCalculatedResult, totalQuestions, correctAnswers, wrongAnswers, calcValidationError]);


  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'error' });
    }, 3000);
  };

  const resetCalculator = () => {
    setTotalQuestions('');
    setWrongAnswers('');
    setCorrectAnswers('');
    setResult(null);
    setIsResultValid(true);
    setInputMode('correct');
    setActiveSegment(0);
    setSegmentCache({});
    setQueryCorrectScore('');
    setQueryResult(null);
    setQueryError('');
    setCalcError('');
  };

  const handleTotalQuestionsChange = (value) => {
    if (value === '') {
      setTotalQuestions('');
      setActiveSegment(0);
      return;
    }
    if (/^(\d+\.?\d*|\.\d+)?$/.test(value)) {
      const numValue = parseFloat(value);
      if (numValue <= 0) {
        showToast('Must be greater than 0', 'error');
        return;
      }
      setTotalQuestions(value);
      setActiveSegment(0);
    }
  };

  const handleScaleChange = (letter, value) => {
    // 允许用户自由输入，存储到临时状态
    setScaleEditValues(prev => ({ ...prev, [letter]: value }));
  };

  const handleScaleInputKeyDown = (letter, e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleScaleInputBlur(letter);
      e.target.blur(); // 移除焦点，使输入框失活
    }
  };

  const handleScaleInputBlur = (letter) => {
    const value = scaleEditValues[letter] !== undefined ? scaleEditValues[letter] : gradingScale[letter];
    const numValue = parseFloat(value);
    
    // 如果为空或不是数字，恢复原值
    if (value === '' || isNaN(numValue)) {
      setScaleEditValues(prev => {
        const newValues = { ...prev };
        delete newValues[letter];
        return newValues;
      });
      return;
    }
    
    const gradeOrder = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
    const currentIndex = gradeOrder.indexOf(letter);
    const constrainedValue = Math.max(0, Math.min(100, numValue));
    
    // 验证：前一个等级（更高的等级）的最低分必须 > 当前等级的最低分
    if (currentIndex > 0) {
      const prevGrade = gradeOrder[currentIndex - 1];
      const prevMin = gradingScale[prevGrade];
      if (constrainedValue >= prevMin) {
        showToast(`${letter} limit must be less than ${prevGrade} limit`, 'error');
        setScaleEditValues(prev => {
          const newValues = { ...prev };
          delete newValues[letter];
          return newValues;
        });
        return;
      }
    }
    
    // 验证：后一个等级（更低的等级）的最低分必须 < 当前等级的最低分
    if (currentIndex < gradeOrder.length - 1) {
      const nextGrade = gradeOrder[currentIndex + 1];
      const nextMin = gradingScale[nextGrade];
      if (constrainedValue <= nextMin) {
        showToast(`${letter} limit must be greater than ${nextGrade} limit`, 'error');
        setScaleEditValues(prev => {
          const newValues = { ...prev };
          delete newValues[letter];
          return newValues;
        });
        return;
      }
    }
    
    // 验证通过，更新真实的 gradingScale
    const updatedScale = { ...gradingScale, [letter]: constrainedValue };
    setGradingScale(updatedScale);
    setScaleEditValues(prev => {
      const newValues = { ...prev };
      delete newValues[letter];
      return newValues;
    });
    // 清除缓存，使 Grade Table 根据新的等级系统重新生成
    setSegmentCache({});
    
    // 如果已有计算结果，重新计算 grade
    if (result && result.percentage !== undefined) {
      let newGrade = 'F';
      // 按照标准等级顺序检查
      for (let i = 0; i < gradeOrder.length; i++) {
        const currentGrade = gradeOrder[i];
        const nextGrade = gradeOrder[i + 1];
        const currentMin = updatedScale[currentGrade];
        const nextMin = nextGrade ? updatedScale[nextGrade] : -1;
        
        if (result.percentage >= currentMin && (nextMin === -1 || result.percentage >= nextMin)) {
          newGrade = currentGrade;
          break;
        }
      }
      setResult(prev => ({ ...prev, grade: newGrade }));
    }
  };

  const resetScale = () => {
    const defaultScale = {
      'A+': 97, 'A': 93, 'A-': 90, 'B+': 87, 'B': 83, 'B-': 80, 'C+': 77, 'C': 73, 'C-': 70, 'D+': 67, 'D': 63, 'D-': 60, 'F': 0,
    };
    setGradingScale(defaultScale);
    setScaleEditValues({});
    // 清除缓存，使 Grade Table 根据默认等级系统重新生成
    setSegmentCache({});
    
    // 如果已有计算结果，使用默认 scale 重新计算 grade
    if (result && result.percentage !== undefined) {
      let newGrade = 'F';
      const gradeOrder = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
      for (let i = 0; i < gradeOrder.length; i++) {
        const currentGrade = gradeOrder[i];
        const nextGrade = gradeOrder[i + 1];
        const currentMin = defaultScale[currentGrade];
        const nextMin = nextGrade ? defaultScale[nextGrade] : -1;
        
        if (result.percentage >= currentMin && (nextMin === -1 || result.percentage >= nextMin)) {
          newGrade = currentGrade;
          break;
        }
      }
      setResult(prev => ({ ...prev, grade: newGrade }));
    }
  };

  return (
    <>
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-6 py-3 rounded-lg shadow-lg text-white font-medium ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Calculate Your Grade */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Calculate Your Grade</h2>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Total Questions/Points</label>
          <input type="text" value={totalQuestions} onChange={(e) => handleTotalQuestionsChange(e.target.value)} placeholder="e.g., 40" className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-900 font-medium placeholder-gray-500" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Input Mode</label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="correct" checked={inputMode === 'correct'} onChange={(e) => setInputMode(e.target.value)} className="w-4 h-4 text-blue-600" />
              <span className="ml-2 text-gray-700">Correct Answers</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="wrong" checked={inputMode === 'wrong'} onChange={(e) => setInputMode(e.target.value)} className="w-4 h-4 text-blue-600" />
              <span className="ml-2 text-gray-700">Wrong Answers</span>
            </label>
          </div>
        </div>

        {inputMode === 'correct' ? (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Correct Answers</label>
            <input type="text" value={correctAnswers} onChange={(e) => handleInputChange(e.target.value, setCorrectAnswers)} placeholder="e.g., 35" className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-900 font-medium placeholder-gray-500" />
            {calcError && (
              <div className="mt-2 p-2 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm">
                <p className="font-medium">{calcError}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Wrong Answers</label>
            <input type="text" value={wrongAnswers} onChange={(e) => handleInputChange(e.target.value, setWrongAnswers)} placeholder="e.g., 5" className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-900 font-medium placeholder-gray-500" />
            {calcError && (
              <div className="mt-2 p-2 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm">
                <p className="font-medium">{calcError}</p>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center">
          <button 
            onClick={resetCalculator} 
            disabled={!shouldEnableReset}
            className={`font-bold py-3 px-8 rounded-lg transition-all ${
              shouldEnableReset 
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-800 cursor-pointer' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Reset
          </button>
        </div>

        {result && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Results</h2>
            {!isResultValid ? (
              // 输入无效 - 显示灰色禁用状态
              <div>
                <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 opacity-50 pointer-events-none`}>
                  <div className={`rounded-lg p-4 border-l-4 bg-gray-100 border-gray-400`}><p className={`text-sm text-gray-500 mb-1`}>Correct</p><p className={`text-2xl font-bold text-gray-400`}>—</p></div>
                  <div className={`rounded-lg p-4 border-l-4 bg-gray-100 border-gray-400`}><p className={`text-sm text-gray-500 mb-1`}>Wrong</p><p className={`text-2xl font-bold text-gray-400`}>—</p></div>
                  <div className={`rounded-lg p-4 border-l-4 bg-gray-100 border-gray-400`}><p className={`text-sm text-gray-500 mb-1`}>Total</p><p className={`text-2xl font-bold text-gray-400`}>—</p></div>
                  <div className={`rounded-lg p-4 border-l-4 bg-gray-100 border-gray-400`}><p className={`text-sm text-gray-500 mb-1`}>Percentage</p><p className={`text-2xl font-bold text-gray-400`}>—</p></div>
                </div>
                <div className="text-center bg-gray-100 rounded-lg p-8 mb-6"><p className="text-gray-500 mb-2">Your Grade</p><p className="text-6xl font-bold text-gray-400 mb-2">—</p><p className={`text-lg font-semibold text-gray-400`}>Invalid Input</p></div>
              </div>
            ) : (
              // 输入有效 - 显示彩色结果
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-l-4 border-blue-600"><p className="text-sm text-gray-600 mb-1">Correct</p><p className="text-2xl font-bold text-blue-600">{result.correct}</p></div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border-l-4 border-red-600"><p className="text-sm text-gray-600 mb-1">Wrong</p><p className="text-2xl font-bold text-red-600">{result.wrong}</p></div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-l-4 border-purple-600"><p className="text-sm text-gray-600 mb-1">Total</p><p className="text-2xl font-bold text-purple-600">{result.total}</p></div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-l-4 border-green-600"><p className="text-sm text-gray-600 mb-1">Percentage</p><p className="text-2xl font-bold text-green-600">{result.percentage}%</p></div>
                </div>
                <div className="text-center bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-8 mb-6"><p className="text-gray-600 mb-2">Your Grade</p><p className="text-6xl font-bold text-indigo-600 mb-2">{result.grade}</p><p className={`text-lg font-semibold ${result.isPassing ? 'text-green-600' : 'text-red-600'}`}>{result.isPassing ? '🟢 Passing Grade' : '🔴 Failing Grade'}</p></div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Grade Scale */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Grade Scale</h3>
          <button onClick={() => setShowScaleEditor(!showScaleEditor)} className="text-xs px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium transition-colors">{showScaleEditor ? 'Done' : 'Edit'}</button>
        </div>

        {showScaleEditor ? (
          <div className="space-y-3">
            <p className="text-xs text-gray-600 mb-3">Enter minimum percentage for each grade:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    {Object.keys(gradingScale).map((letter) => (
                      <th key={letter} className="text-center py-2 px-2 font-semibold text-gray-700">{letter}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {Object.entries(gradingScale).map(([letter, value]) => (
                      <td key={letter} className="text-center py-2 px-2">
                        <input type="number" min="0" max="100" value={scaleEditValues[letter] !== undefined ? scaleEditValues[letter] : value} onChange={(e) => handleScaleChange(letter, e.target.value)} onBlur={() => handleScaleInputBlur(letter)} onKeyDown={(e) => handleScaleInputKeyDown(letter, e)} disabled={letter === 'F'} className={`w-16 px-2 py-1 text-sm text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors ${letter === 'F' ? 'bg-gray-100 cursor-not-allowed text-gray-500' : 'bg-white text-gray-900 font-medium'}`} />
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-center">
              <button onClick={resetScale} className="mt-4 px-4 py-2 bg-gradient-to-r from-gray-300 to-gray-400 hover:from-gray-400 hover:to-gray-500 text-gray-800 text-sm rounded font-semibold transition-all shadow-sm">Reset to Default</button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  {gradeRanges.map((range) => (
                    <th key={range.letter} className="text-center py-2 px-2 font-semibold text-gray-700">{range.letter}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {gradeRanges.map((range) => (
                    <td key={range.letter} className="text-center py-2 px-2 text-gray-600 text-xs">
                      {gradingScale[range.letter]}%-{range.max}%
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Score Query Tool */}
      {totalQuestions && !isNaN(totalQuestions) && totalQuestions <= 1000000 && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Query Your Score</h3>
          <p className="text-sm text-gray-600 mb-4">Enter a specific score to find out the corresponding grade and percentage (results update automatically):</p>
          <div className="flex-1">
            <input
              type="text"
              value={queryCorrectScore}
              onChange={(e) => handleInputChange(e.target.value, setQueryCorrectScore)}
              placeholder={`e.g., 85 (out of ${totalQuestions})`}
              className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-900 font-medium placeholder-gray-500"
            />
          </div>

          {queryError && (
            <div className="mt-3 p-3 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-sm">
              <p className="font-medium">{queryError}</p>
            </div>
          )}

          {queryResult && (
            <div className={`mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 ${queryError ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className={`rounded-lg p-4 border-l-4 ${queryError ? 'bg-gray-100 border-gray-400' : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-600'}`}>
                <p className={`text-sm mb-1 ${queryError ? 'text-gray-500' : 'text-gray-600'}`}>Correct</p>
                <p className={`text-2xl font-bold ${queryError ? 'text-gray-400' : 'text-blue-600'}`}>{queryError ? '—' : queryResult.correct}</p>
              </div>
              <div className={`rounded-lg p-4 border-l-4 ${queryError ? 'bg-gray-100 border-gray-400' : 'bg-gradient-to-br from-red-50 to-red-100 border-red-600'}`}>
                <p className={`text-sm mb-1 ${queryError ? 'text-gray-500' : 'text-gray-600'}`}>Wrong</p>
                <p className={`text-2xl font-bold ${queryError ? 'text-gray-400' : 'text-red-600'}`}>{queryError ? '—' : queryResult.wrong}</p>
              </div>
              <div className={`rounded-lg p-4 border-l-4 ${queryError ? 'bg-gray-100 border-gray-400' : 'bg-gradient-to-br from-green-50 to-green-100 border-green-600'}`}>
                <p className={`text-sm mb-1 ${queryError ? 'text-gray-500' : 'text-gray-600'}`}>Percentage</p>
                <p className={`text-2xl font-bold ${queryError ? 'text-gray-400' : 'text-green-600'}`}>{queryError ? '—' : `${queryResult.percentage}%`}</p>
              </div>
              <div className={`rounded-lg p-4 border-l-4 ${queryError ? 'bg-gray-100 border-gray-400' : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-600'}`}>
                <p className={`text-sm mb-1 ${queryError ? 'text-gray-500' : 'text-gray-600'}`}>Grade</p>
                <p className={`text-2xl font-bold ${queryError ? 'text-gray-400' : queryResult.grade.includes('A') ? 'text-green-600' : queryResult.grade.includes('B') ? 'text-blue-600' : queryResult.grade.includes('C') ? 'text-yellow-600' : queryResult.grade.includes('D') ? 'text-orange-600' : 'text-red-600'}`}>
                  {queryError ? '—' : queryResult.grade}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Grade Table with Segments */}
      {totalQuestions && !isNaN(totalQuestions) && totalQuestions <= 1000000 && (
        <div id="grade-table" className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Grade Table</h3>
          <p className="text-sm text-gray-600 mb-4">This table shows the grade for selected scores:</p>
          
          {/* Segment Tabs (only show if needed) */}
          {getSegmentInfo.shouldSegment && (
            <div className="mb-6 overflow-x-auto">
              <div className="flex gap-2 pb-2">
                {getSegmentInfo.segments.map((segment, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSegment(idx)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                      activeSegment === idx
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {segment.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Click to view scores in this range (data loads on demand)</p>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 sticky left-0 bg-white">Score</th>
                  {gradeTable.map((row, idx) => (
                    <th key={idx} className={`text-center py-2 px-2 font-semibold text-gray-700 min-w-[60px] transition-colors ${
                      queryResult && !queryError && row.correct === queryResult.correct ? 'bg-yellow-200' : ''
                    }`}>{row.correct}/{totalQuestions}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-3 font-semibold text-gray-700 sticky left-0 bg-white">%</td>
                  {gradeTable.map((row, idx) => (
                    <td key={idx} className={`text-center py-2 px-2 text-gray-700 transition-colors ${
                      queryResult && !queryError && row.correct === queryResult.correct ? 'bg-yellow-100' : ''
                    }`}>{row.percentage}%</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-3 font-semibold text-gray-700 sticky left-0 bg-white">Grade</td>
                  {gradeTable.map((row, idx) => (
                    <td key={idx} className={`text-center py-2 px-2 font-bold transition-colors ${row.grade.includes('A') ? 'text-green-600' : row.grade.includes('B') ? 'text-blue-600' : row.grade.includes('C') ? 'text-yellow-600' : row.grade.includes('D') ? 'text-orange-600' : 'text-red-600'} ${
                      queryResult && !queryError && row.correct === queryResult.correct ? 'bg-yellow-100' : ''
                    }`}>{row.grade}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Message for very large numbers */}
      {totalQuestions && !isNaN(totalQuestions) && totalQuestions > 1000000 && (
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Grade Table Unavailable</h3>
              <p className="mt-2 text-sm text-blue-700">
                The Grade Table is not available for numbers exceeding 1,000,000 to maintain optimal performance. 
                Please use <strong>"Calculate Your Grade"</strong> to get your overall grade for this test.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* How to calculate test score */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">How to calculate test score</h2>
        <div className="space-y-4 text-gray-700">
          <p>The basic formula for calculating a test score is straightforward:</p>
          <div className="bg-indigo-50 border-l-4 border-indigo-600 p-4 rounded">
            <p className="font-semibold text-indigo-900">Test Score (%) = (Correct Answers ÷ Total Questions) × 100</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Step-by-step process:</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li><strong>Count correct answers:</strong> Determine how many questions you answered correctly.</li>
              <li><strong>Count total questions:</strong> Note the total number of questions on the test.</li>
              <li><strong>Divide:</strong> Divide your correct answers by the total questions.</li>
              <li><strong>Convert to percentage:</strong> Multiply the result by 100 to get your percentage score.</li>
              <li><strong>Find letter grade:</strong> Match your percentage to the appropriate letter grade on your school&apos;s grading scale.</li>
            </ol>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Example:</h4>
            <p className="text-gray-700">If you scored 45 correct answers out of 50 questions: (45 ÷ 50) × 100 = 90%, which is typically an A- grade.</p>
          </div>
        </div>
      </div>

      {/* Test grade calculator – how to use it? */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Test grade calculator – how to use it?</h2>
        <div className="space-y-4 text-gray-700">
          <p>Our calculator makes it easy to determine your test grade instantly. Here&apos;s how to use it:</p>
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Calculate Your Grade:</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Enter the <strong>total number of questions</strong> on your test.</li>
              <li>Select whether you want to input <strong>correct answers or wrong answers</strong>.</li>
              <li>Enter the number of correct or wrong answers you received.</li>
              <li>The calculator automatically displays your <strong>percentage and letter grade</strong>.</li>
              <li>Use the <strong>Grade Table</strong> to see all possible grades and their corresponding score ranges.</li>
            </ol>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Query Your Score:</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Enter a specific number of <strong>correct answers</strong> you want to check.</li>
              <li>The calculator instantly highlights the corresponding row in the Grade Table.</li>
              <li>See your exact percentage and letter grade for that score in real-time.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Test grade calculator – advanced usage */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Test grade calculator – advanced usage</h2>
        <div className="space-y-4 text-gray-700">
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Custom Grading Scale:</h4>
            <p>Different schools and teachers may use different grading scales. This calculator allows you to customize the grading scale to match your specific institution:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
              <li>Click the <strong>&quot;Edit Grading Scale&quot;</strong> button to modify grade thresholds.</li>
              <li>Enter the minimum percentage required for each letter grade.</li>
              <li>Your changes apply immediately to all calculations.</li>
              <li>The Grade Table updates automatically to reflect your custom scale.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Working with Decimal Values:</h4>
            <p>The calculator supports partial credit and decimal values for precise calculations:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
              <li>Enter decimal numbers like <strong>37.5</strong> for half-points.</li>
              <li>Useful when tests have different point values or partial credit is awarded.</li>
              <li>Percentage calculations remain accurate to multiple decimal places.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Handling Large Datasets:</h4>
            <p>For tests with very large question counts (over 10,000), the calculator automatically optimizes:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
              <li>Uses intelligent sampling to display a focused Grade Table.</li>
              <li>Maintains accuracy while improving performance.</li>
              <li>Query Your Score feature works seamlessly regardless of test size.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">FAQs</h2>
        <div className="space-y-6">
          <div><h3 className="font-bold text-gray-800 mb-2">What is a passing grade?</h3><p className="text-gray-600">In most US schools, a D- or D grade (60% and above) is considered the minimum passing grade. However, this varies by institution—some schools require 65% or 70% to pass. Always check your specific school&apos;s grading policy.</p></div>
          <div><h3 className="font-bold text-gray-800 mb-2">Does this calculator support different grading systems?</h3><p className="text-gray-600">Yes! The calculator comes with the standard US grading scale by default, but you can customize it for any system. Click &quot;Edit Grading Scale&quot; to set your school or teacher&apos;s specific grade thresholds.</p></div>
          <div><h3 className="font-bold text-gray-800 mb-2">Can I use decimal numbers for partial credit?</h3><p className="text-gray-600">Absolutely! The calculator fully supports decimal values. Enter 37.5 for half-points or any other fractional score. This is especially useful for weighted scoring or tests with partial credit policies.</p></div>
          <div><h3 className="font-bold text-gray-800 mb-2">What if I have a very large number of test questions?</h3><p className="text-gray-600">The calculator can handle tests with thousands of questions efficiently. For very large datasets (over 10,000 questions), it uses intelligent sampling to keep the Grade Table manageable while maintaining calculation accuracy.</p></div>
          <div><h3 className="font-bold text-gray-800 mb-2">How accurate is the percentage calculation?</h3><p className="text-gray-600">The calculator provides percentage calculations accurate to multiple decimal places. This ensures precise grade determination even in edge cases between letter grades.</p></div>
          <div><h3 className="font-bold text-gray-800 mb-2">Can I quickly check multiple scores?</h3><p className="text-gray-600">Yes! Use the &quot;Query Your Score&quot; tool to instantly check what grade you&apos;d get for any number of correct answers. The corresponding row in the Grade Table highlights automatically, making it easy to compare different scenarios.</p></div>
        </div>
      </div>
    </>
  );
}
