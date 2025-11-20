'use client';

import { useState, useMemo } from 'react';
import FeedbackButton from '../components/FeedbackButton';

export default function TestGradeCalculatorContent() {
  const [totalQuestions, setTotalQuestions] = useState('');
  const [wrongAnswers, setWrongAnswers] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState('');
  const [inputMode, setInputMode] = useState('wrong');
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });
  const [showScaleEditor, setShowScaleEditor] = useState(false);

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

  const gradeRanges = [
    { letter: 'A+', min: 97, max: 100 },
    { letter: 'A', min: 93, max: 96 },
    { letter: 'A-', min: 90, max: 92 },
    { letter: 'B+', min: 87, max: 89 },
    { letter: 'B', min: 83, max: 86 },
    { letter: 'B-', min: 80, max: 82 },
    { letter: 'C+', min: 77, max: 79 },
    { letter: 'C', min: 73, max: 76 },
    { letter: 'C-', min: 70, max: 72 },
    { letter: 'D+', min: 67, max: 69 },
    { letter: 'D', min: 63, max: 66 },
    { letter: 'D-', min: 60, max: 62 },
    { letter: 'F', min: 0, max: 59 },
  ];

  const gradeTable = useMemo(() => {
    if (!totalQuestions || isNaN(totalQuestions)) return [];
    const total = parseFloat(totalQuestions);
    const table = [];
    for (let i = total; i >= 0; i--) {
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
    return table;
  }, [totalQuestions]);

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

  const calculateGrade = () => {
    if (!totalQuestions) {
      showToast('Please enter the total number of questions', 'error');
      return;
    }

    const totalQuestionsNum = parseFloat(totalQuestions);
    const totalValidation = validateInput(totalQuestions);

    if (!totalValidation.valid) {
      showToast(totalValidation.error, 'error');
      return;
    }

    if (totalQuestionsNum <= 0) {
      showToast('Total questions must be greater than 0', 'error');
      return;
    }

    if (!wrongAnswers && !correctAnswers) {
      showToast('Please enter either wrong answers or correct answers', 'error');
      return;
    }

    let correct;

    if (inputMode === 'wrong') {
      if (wrongAnswers) {
        const wrongValidation = validateInput(wrongAnswers);
        if (!wrongValidation.valid) {
          showToast(wrongValidation.error, 'error');
          return;
        }

        const wrong = parseFloat(wrongAnswers);
        if (wrong > totalQuestionsNum) {
          showToast('Wrong answers cannot exceed total questions', 'error');
          return;
        }
        correct = totalQuestionsNum - wrong;
      } else {
        showToast('Please enter number of wrong answers', 'error');
        return;
      }
    } else {
      if (correctAnswers) {
        const correctValidation = validateInput(correctAnswers);
        if (!correctValidation.valid) {
          showToast(correctValidation.error, 'error');
          return;
        }

        correct = parseFloat(correctAnswers);
        if (correct > totalQuestionsNum) {
          showToast('Correct answers cannot exceed total questions', 'error');
          return;
        }
      } else {
        showToast('Please enter number of correct answers', 'error');
        return;
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

    setResult({
      correct: Math.round(correct * 100) / 100,
      wrong: Math.round((totalQuestionsNum - correct) * 100) / 100,
      total: totalQuestionsNum,
      percentage: Math.round(percentage * 100) / 100,
      grade,
      isPassing,
    });
  };

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
    setInputMode('wrong');
  };

  const handleInputChange = (value, setter) => {
    if (value === '' || /^(\d+\.?\d*|\.\d+)?$/.test(value)) {
      setter(value);
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
          <input type="text" value={totalQuestions} onChange={(e) => handleInputChange(e.target.value, setTotalQuestions)} onKeyDown={(e) => e.key === 'Enter' && calculateGrade()} placeholder="e.g., 40" className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-900 font-medium placeholder-gray-500" />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Input Mode</label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="wrong" checked={inputMode === 'wrong'} onChange={(e) => setInputMode(e.target.value)} className="w-4 h-4 text-blue-600" />
              <span className="ml-2 text-gray-700">Wrong Answers</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="correct" checked={inputMode === 'correct'} onChange={(e) => setInputMode(e.target.value)} className="w-4 h-4 text-blue-600" />
              <span className="ml-2 text-gray-700">Correct Answers</span>
            </label>
          </div>
        </div>

        {inputMode === 'wrong' ? (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Wrong Answers</label>
            <input type="text" value={wrongAnswers} onChange={(e) => handleInputChange(e.target.value, setWrongAnswers)} onKeyDown={(e) => e.key === 'Enter' && calculateGrade()} placeholder="e.g., 5" className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-900 font-medium placeholder-gray-500" />
          </div>
        ) : (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Correct Answers</label>
            <input type="text" value={correctAnswers} onChange={(e) => handleInputChange(e.target.value, setCorrectAnswers)} onKeyDown={(e) => e.key === 'Enter' && calculateGrade()} placeholder="e.g., 35" className="w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-gray-900 font-medium placeholder-gray-500" />
          </div>
        )}

        <div className="flex gap-4">
          <button onClick={calculateGrade} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg">Calculate Grade</button>
          <button onClick={resetCalculator} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-all">Reset</button>
        </div>

        {/* Feedback Button - Centered */}
        <div className="flex justify-center mt-6">
          <FeedbackButton calculatorName="Test Grade Calculator" />
        </div>

        {result && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Results</h2>
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

      {/* Grade Table */}
      {totalQuestions && !isNaN(totalQuestions) && (
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Grade Table</h3>
          <p className="text-sm text-gray-600 mb-4">This table shows the grade for every possible score:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2 px-3 font-semibold text-gray-700 sticky left-0 bg-white">Score</th>
                  {gradeTable.map((row, idx) => (
                    <th key={idx} className="text-center py-2 px-2 font-semibold text-gray-700 min-w-[60px]">{row.correct}/{totalQuestions}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-3 font-semibold text-gray-700 sticky left-0 bg-white">%</td>
                  {gradeTable.map((row, idx) => (
                    <td key={idx} className="text-center py-2 px-2 text-gray-700">{row.percentage}%</td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-3 font-semibold text-gray-700 sticky left-0 bg-white">Grade</td>
                  {gradeTable.map((row, idx) => (
                    <td key={idx} className={`text-center py-2 px-2 font-bold ${row.grade.includes('A') ? 'text-green-600' : row.grade.includes('B') ? 'text-blue-600' : row.grade.includes('C') ? 'text-yellow-600' : row.grade.includes('D') ? 'text-orange-600' : 'text-red-600'}`}>{row.grade}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Grade Scale */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div><h3 className="font-bold text-gray-800 mb-2">How do I calculate my test grade?</h3><p className="text-gray-600">To calculate your test grade: Determine the total number of points available on the test. Add up the number of points you earned. Divide the number of points earned by the total number of points available. Multiply the result by 100 to get a percentage score.</p></div>
          <div><h3 className="font-bold text-gray-800 mb-2">Is 60% a passing grade?</h3><p className="text-gray-600">This depends on your school or teacher&apos;s grading scale. In most US schools, 60% corresponds to a D- or D, which is typically considered a passing grade. However, some institutions may require a higher minimum (like 65% or 70%). Always check with your teacher beforehand.</p></div>
          <div><h3 className="font-bold text-gray-800 mb-2">What if my school uses a different grading scale?</h3><p className="text-gray-600">The grading scale used by this calculator is the standard US system. However, grading scales can vary among schools, classes, and teachers. Always verify which system is used in your case. You can use the percentage score from this calculator with your school&apos;s specific scale.</p></div>
          <div><h3 className="font-bold text-gray-800 mb-2">Can I get partial credit?</h3><p className="text-gray-600">Yes! This calculator accepts decimal values, so you can enter half-points or partial credit. For example, you can enter 37.5 correct answers out of 40 questions.</p></div>
        </div>
      </div>

      {/* Understanding Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl shadow-xl p-8 mb-8 border-l-4 border-indigo-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Understanding Test Grading</h2>
        <div className="space-y-4">
          <div><h3 className="font-bold text-gray-800 mb-2">📚 Standard Grading Scale</h3><p className="text-gray-700">This calculator uses the standard US grading scale widely adopted by schools and universities. The scale ranges from A+ (97-100%) at the top to F (below 60%) at the bottom, with fine-grained distinctions using + and - modifiers for more precise grade reporting.</p></div>
          <div><h3 className="font-bold text-gray-800 mb-2">🎯 Percentage to Grade Conversion</h3><p className="text-gray-700">Once you calculate your percentage score, the calculator automatically converts it to a letter grade based on the standard scale. This makes it easy to understand your performance at a glance and helps you track your academic progress over time.</p></div>
          <div><h3 className="font-bold text-gray-800 mb-2">✓ Passing Grades</h3><p className="text-gray-700">Generally, a D- (60%) or higher is considered a passing grade in most US institutions, though some schools may have different requirements. This calculator clearly indicates whether your score is a passing or failing grade based on the standard 60% threshold.</p></div>
        </div>
      </div>
    </>
  );
}
