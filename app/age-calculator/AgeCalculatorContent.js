'use client';

import { useState, useEffect, useRef } from 'react';

export default function AgeCalculatorContent() {
  const [startDay, setStartDay] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');
  const [startTime, setStartTime] = useState('hh:mm aa');
  const [includeStartTime, setIncludeStartTime] = useState(false);
  const [startTimeSelection, setStartTimeSelection] = useState({ group: null, cursorPos: 0 });
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [startDateInput, setStartDateInput] = useState('mm/dd/yyyy');
  const [startDateSelection, setStartDateSelection] = useState({ group: null, cursorPos: 0 });
  
  const [endDay, setEndDay] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endYear, setEndYear] = useState('');
  const [endTime, setEndTime] = useState('hh:mm aa');
  const [includeEndTime, setIncludeEndTime] = useState(false);
  const [endTimeSelection, setEndTimeSelection] = useState({ group: null, cursorPos: 0 });
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const [endDateInput, setEndDateInput] = useState('mm/dd/yyyy');
  const [endDateSelection, setEndDateSelection] = useState({ group: null, cursorPos: 0 });
  
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'error' });
  const [dateError, setDateError] = useState(''); // 内联错误提示
  const [showStartCalendarPicker, setShowStartCalendarPicker] = useState(false);
  const [showEndCalendarPicker, setShowEndCalendarPicker] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 });
  const startCalendarButtonRef = useRef(null);
  const endCalendarButtonRef = useRef(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const showToast = (message, type = 'error') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'error' });
    }, 3000);
  };

  const parseTime = (timeString) => {
    // Parse "hh:mm aa" format (e.g., "02:30 PM")  
    const match = timeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)/);
    if (!match) return null;
    
    let hours = parseInt(match[1]);
    const minutes = parseInt(match[2]);
    const period = match[3].toUpperCase();
    
    // Validate hours (1-12) and minutes (0-59)
    if (hours < 1 || hours > 12 || minutes < 0 || minutes > 59) {
      return null;
    }
    
    // Convert to 24-hour format
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return [hours, minutes, period];
  };

  const validateTime = (timeString) => {
    if (!timeString || timeString === 'hh:mm aa') return false;
    const result = parseTime(timeString);
    return result !== null;
  };

  const parseDate = (dateString) => {
    // Parse "mm/dd/yyyy" format
    const match = dateString.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (!match) return null;
    
    const month = parseInt(match[1]);
    const day = parseInt(match[2]);
    const year = parseInt(match[3]);
    
    // Validate
    if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1 || year > 9999) {
      return null;
    }
    
    // Check for valid date
    const date = new Date(year, month - 1, day);
    if (date.getMonth() !== month - 1 || date.getDate() !== day) {
      return null;
    }
    
    return [month, day, year];
  };

  const validateDate = (dateString) => {
    if (!dateString || dateString === 'mm/dd/yyyy') return false;
    const result = parseDate(dateString);
    return result !== null;
  };

  const calculateAge = () => {
    // Try to parse from date inputs if available, otherwise use separate fields
    let startDateObj = null;
    let endDateObj = null;
    
    // Try to parse startDateInput (mm/dd/yyyy format)
    if (validateDate(startDateInput)) {
      const parts = parseDate(startDateInput);
      if (parts) {
        startDateObj = new Date(parts[2], parts[0] - 1, parts[1]);
      }
    }
    
    // Try to parse endDateInput (mm/dd/yyyy format)
    if (validateDate(endDateInput)) {
      const parts = parseDate(endDateInput);
      if (parts) {
        endDateObj = new Date(parts[2], parts[0] - 1, parts[1]);
      }
    }
    
    // Fallback to separate date fields if masked inputs not complete
    if (!startDateObj && startDay && startMonth && startYear) {
      startDateObj = new Date(startYear, parseInt(startMonth) - 1, parseInt(startDay));
    }
    
    if (!endDateObj && endDay && endMonth && endYear) {
      endDateObj = new Date(endYear, parseInt(endMonth) - 1, parseInt(endDay));
    }
    
    if (!startDateObj || !endDateObj) {
      return;
    }
    
    let startDate = startDateObj;
    let endDate = endDateObj;
    
    // Validate times if included
    if (includeStartTime && !validateTime(startTime)) {
      showToast('Invalid start time format! Use HH:MM AM/PM (e.g., 02:30 PM)', 'error');
      return;
    }
    
    if (includeEndTime && !validateTime(endTime)) {
      showToast('Invalid end time format! Use HH:MM AM/PM (e.g., 02:30 PM)', 'error');
      return;
    }
      
    // If including time, parse and set the time
    if (includeStartTime && startTime) {
      const timeResult = parseTime(startTime);
      if (timeResult) {
        startDate.setHours(timeResult[0], timeResult[1], 0, 0);
      }
    } else {
      // If not including time, set to midnight
      startDate.setHours(0, 0, 0, 0);
    }
    
    if (includeEndTime && endTime) {
      const timeResult = parseTime(endTime);
      if (timeResult) {
        endDate.setHours(timeResult[0], timeResult[1], 0, 0);
      }
    } else {
      // If not including time, set to midnight
      endDate.setHours(0, 0, 0, 0);
    }
    
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
    const totalHours = Math.floor((endDate - startDate) / (1000 * 60 * 60));
    
    // 计算总分钟数
    const totalMinutes = Math.floor((endDate - startDate) / (1000 * 60));
    
    // 计算总秒数
    const totalSeconds = Math.floor((endDate - startDate) / 1000);
    
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
  };

  // 实时验证单个日期输入
  useEffect(() => {
    // 检查开始日期是否完整
    const startDateComplete = startDateInput !== 'mm/dd/yyyy' && !startDateInput.includes('m') && !startDateInput.includes('d') && !startDateInput.includes('y');
    
    if (startDateComplete) {
      // 如果开始日期完整，验证是否有效
      if (!validateDate(startDateInput)) {
        setDateError('Invalid start date! This date does not exist.');
        setResult(null);
        return;
      }
    } else if (startDateInput !== 'mm/dd/yyyy') {
      // 开始日期不完整但已开始输入，清除错误
      setDateError('');
    }
    
    // 检查结束日期是否完整
    const endDateComplete = endDateInput !== 'mm/dd/yyyy' && !endDateInput.includes('m') && !endDateInput.includes('d') && !endDateInput.includes('y');
    
    if (endDateComplete) {
      // 如果结束日期完整，验证是否有效
      if (!validateDate(endDateInput)) {
        setDateError('Invalid end date! This date does not exist.');
        setResult(null);
        return;
      }
    } else if (endDateInput !== 'mm/dd/yyyy') {
      // 结束日期不完整但已开始输入，清除错误
      setDateError('');
    }
    
    // 如果两个日期都完整且都有效，清除错误并计算
    const datesFromMaskedInput = startDateComplete && endDateComplete;
    const datesFromSeparateFields = startDay && startMonth && startYear && endDay && endMonth && endYear;
    
    // Check if times are valid if included
    const timesValid = 
      (!includeStartTime || (includeStartTime && validateTime(startTime))) &&
      (!includeEndTime || (includeEndTime && validateTime(endTime)));
    
    if ((datesFromMaskedInput || datesFromSeparateFields) && timesValid) {
      setDateError(''); // 清除错误
      calculateAge();
    } else {
      // 只清除结果，不清除错误（错误应该保留以提示用户）
      setResult(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDay, startMonth, startYear, startTime, includeStartTime, endDay, endMonth, endYear, endTime, includeEndTime, startDateInput, endDateInput]);

  const handleTimeInput = (value, setTime) => {
    // Mask format: hh:mm aa (positions 0-1: hours, 3-4: minutes, 6-7: am/pm)
    const mask = ['h', 'h', ':', 'm', 'm', ' ', 'a', 'a'];
    let result = Array.from(mask);
    let inputIndex = 0;
    
    // Process input character by character
    for (let i = 0; i < value.length && inputIndex < 8; i++) {
      const char = value[i];
      
      // Skip mask characters
      if (char === ':' || char === ' ') {
        inputIndex = result.indexOf(mask[inputIndex]) + 1;
        continue;
      }
      
      // Find next placeholder position
      while (inputIndex < 8 && (result[inputIndex] !== 'h' && result[inputIndex] !== 'm' && result[inputIndex] !== 'a')) {
        inputIndex++;
      }
      
      if (inputIndex >= 8) break;
      
      const maskChar = mask[inputIndex];
      
      if (maskChar === 'h') {
        // Hours: 0-1 for first digit, 0-2 for second digit
        if (/[0-9]/.test(char)) {
          const digit = parseInt(char);
          if (inputIndex === 0) {
            // First hour digit: 0 or 1
            if (digit <= 1) {
              result[inputIndex] = char;
              inputIndex++;
            }
          } else if (inputIndex === 1) {
            // Second hour digit: depends on first digit
            const firstDigit = parseInt(result[0]);
            if ((firstDigit === 0 && digit >= 1) || (firstDigit === 1 && digit <= 2)) {
              result[inputIndex] = char;
              inputIndex++;
            } else if (digit <= 9) {
              // Auto-correct: if first digit is 0, replace with this digit
              result[0] = '0';
              result[1] = char;
              inputIndex = 2;
            }
          }
        }
      } else if (maskChar === 'm') {
        // Minutes: 0-5 for first digit, 0-9 for second digit
        if (/[0-9]/.test(char)) {
          const digit = parseInt(char);
          if (inputIndex === 3) {
            // First minute digit: 0-5
            if (digit <= 5) {
              result[inputIndex] = char;
              inputIndex++;
            }
          } else if (inputIndex === 4) {
            // Second minute digit: 0-9
            result[inputIndex] = char;
            inputIndex++;
          }
        }
      } else if (maskChar === 'a') {
        // AM/PM: A, M, P
        if (/[AaPp]/.test(char)) {
          result[inputIndex] = char.toUpperCase();
          inputIndex++;
        } else if (/[Mm]/.test(char)) {
          if (inputIndex === 6 && result[6] === 'A') {
            // "AM" case
            result[inputIndex] = char.toUpperCase();
            inputIndex++;
          } else if (inputIndex === 7 && (result[6] === 'A' || result[6] === 'P')) {
            // Second character of AM or PM
            result[inputIndex] = char.toUpperCase();
            inputIndex++;
          }
        }
      }
    }
    
    // Handle backspace by checking if input is shorter
    if (value.length < result.join('').length) {
      // Find where to restore placeholders
      let newResult = Array.from(mask);
      let inputIdx = 0;
      
      for (let i = 0; i < value.length; i++) {
        const char = value[i];
        
        if (char === ':' || char === ' ') continue;
        
        while (inputIdx < 8 && (newResult[inputIdx] !== 'h' && newResult[inputIdx] !== 'm' && newResult[inputIdx] !== 'a')) {
          inputIdx++;
        }
        
        if (inputIdx >= 8) break;
        
        const maskChar = mask[inputIdx];
        
        if (maskChar === 'h') {
          if (/[0-9]/.test(char)) {
            const digit = parseInt(char);
            if (inputIdx === 0 && digit <= 1) {
              newResult[inputIdx] = char;
              inputIdx++;
            } else if (inputIdx === 1) {
              const firstDigit = parseInt(newResult[0]);
              if ((firstDigit === 0 && digit >= 1) || (firstDigit === 1 && digit <= 2)) {
                newResult[inputIdx] = char;
                inputIdx++;
              } else if (digit <= 9) {
                newResult[0] = '0';
                newResult[1] = char;
                inputIdx = 2;
              }
            }
          }
        } else if (maskChar === 'm') {
          if (/[0-9]/.test(char)) {
            const digit = parseInt(char);
            if (inputIdx === 3 && digit <= 5) {
              newResult[inputIdx] = char;
              inputIdx++;
            } else if (inputIdx === 4) {
              newResult[inputIdx] = char;
              inputIdx++;
            }
          }
        } else if (maskChar === 'a') {
          if (/[AaPp]/.test(char)) {
            newResult[inputIdx] = char.toUpperCase();
            inputIdx++;
          } else if (/[Mm]/.test(char) && inputIdx === 7) {
            newResult[inputIdx] = char.toUpperCase();
            inputIdx++;
          }
        }
      }
      result = newResult;
    }
    
    setTime(result.join(''));
  };

  const formatTimeDisplay = (hours, minutes) => {
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
  };

  const handleGroupTimeInput = (input, currentTime, setTime, setSelection, currentSelection) => {
    if (!input) return;
    
    const char = input.toUpperCase();
    const currentArray = currentTime.split('');
    const group = currentSelection.group;
    
    if (group === 'hh') {
      // Hours group (positions 0-1)
      if (/[0-9]/.test(char)) {
        const digit = parseInt(char);
        // If first input, could be 0-1
        // If we already have first digit
        const currentHH = currentTime.substring(0, 2);
        if (currentHH === 'hh') {
          // First time filling
          if (digit === 0) {
            currentArray[0] = '0';
            currentArray[1] = 'h';
          } else if (digit === 1) {
            currentArray[0] = '1';
            currentArray[1] = 'h';
          } else {
            currentArray[0] = '0';
            currentArray[1] = String(digit);
          }
        } else if (currentArray[1] === 'h') {
          // Second digit
          const firstDigit = parseInt(currentArray[0]);
          if ((firstDigit === 0 && digit >= 1) || (firstDigit === 1 && digit <= 2)) {
            currentArray[1] = String(digit);
          }
        } else {
          // Replace whole group
          if (digit <= 1) {
            currentArray[0] = String(digit);
            currentArray[1] = 'h';
          } else {
            currentArray[0] = '0';
            currentArray[1] = String(digit);
          }
        }
      }
    } else if (group === 'mm') {
      // Minutes group (positions 3-4)
      if (/[0-9]/.test(char)) {
        const digit = parseInt(char);
        const currentMM = currentTime.substring(3, 5);
        if (currentMM === 'mm') {
          if (digit <= 5) {
            currentArray[3] = String(digit);
            currentArray[4] = 'm';
          } else {
            currentArray[3] = '0';
            currentArray[4] = String(digit);
          }
        } else if (currentArray[4] === 'm') {
          if (digit <= 9) {
            currentArray[4] = String(digit);
          }
        } else {
          if (digit <= 5) {
            currentArray[3] = String(digit);
            currentArray[4] = 'm';
          } else {
            currentArray[3] = '0';
            currentArray[4] = String(digit);
          }
        }
      }
    } else if (group === 'aa') {
      // AM/PM group (positions 6-7)
      if (char === 'A') {
        currentArray[6] = 'A';
        currentArray[7] = 'M';
      } else if (char === 'P') {
        currentArray[6] = 'P';
        currentArray[7] = 'M';
      }
    }
    
    setTime(currentArray.join(''));
  };


  const handleGroupDateInput = (char, dateStr, setDate, setSelection, selection) => {
    const currentDate = dateStr.split('');
    const group = selection.group;
    
    if (group === 'mm') {
      // Month group (positions 0-1)
      if (/[0-9]/.test(char)) {
        const digit = parseInt(char);
        const currentMM = dateStr.substring(0, 2);
        
        if (currentMM === 'mm') {
          if (digit === 0 || digit === 1) {
            currentDate[0] = String(digit);
            currentDate[1] = 'm';
          } else {
            currentDate[0] = '0';
            currentDate[1] = String(digit);
          }
        } else if (currentDate[1] === 'm') {
          // Second digit
          const firstDigit = parseInt(currentDate[0]);
          if ((firstDigit === 0 && digit >= 1 && digit <= 9) || (firstDigit === 1 && (digit === 0 || digit === 1 || digit === 2))) {
            currentDate[1] = String(digit);
          }
        } else {
          // Replace whole group
          if (digit === 0 || digit === 1) {
            currentDate[0] = String(digit);
            currentDate[1] = 'm';
          } else {
            currentDate[0] = '0';
            currentDate[1] = String(digit);
          }
        }
      }
    } else if (group === 'dd') {
      // Day group (positions 3-4)
      if (/[0-9]/.test(char)) {
        const digit = parseInt(char);
        const currentDD = dateStr.substring(3, 5);
        
        if (currentDD === 'dd') {
          if (digit === 0 || digit === 1 || digit === 2 || digit === 3) {
            currentDate[3] = String(digit);
            currentDate[4] = 'd';
          } else if (digit >= 4 && digit <= 9) {
            currentDate[3] = '0';
            currentDate[4] = String(digit);
          }
        } else if (currentDate[4] === 'd') {
          const firstDigit = parseInt(currentDate[3]);
          // 限制：0x可以是01-09，1x可以是10-19，2x可以是20-29，3x只能是30-31
          if ((firstDigit === 0 && digit >= 1 && digit <= 9) ||
              (firstDigit === 1 && digit >= 0 && digit <= 9) ||
              (firstDigit === 2 && digit >= 0 && digit <= 9) ||
              (firstDigit === 3 && digit >= 0 && digit <= 1)) {
            currentDate[4] = String(digit);
          }
        } else {
          if (digit === 0 || digit === 1 || digit === 2 || digit === 3) {
            currentDate[3] = String(digit);
            currentDate[4] = 'd';
          } else if (digit >= 4 && digit <= 9) {
            currentDate[3] = '0';
            currentDate[4] = String(digit);
          }
        }
      }
    } else if (group === 'yyyy') {
      // Year group (positions 6-9)
      if (/[0-9]/.test(char)) {
        const currentYYYY = dateStr.substring(6, 10);
        if (currentYYYY === 'yyyy') {
          currentDate[6] = char;
          currentDate[7] = 'y';
          currentDate[8] = 'y';
          currentDate[9] = 'y';
        } else {
          // 移除所有 'y' 占位符，只保留数字，然后移位
          const digits = currentYYYY.split('').filter(c => c !== 'y');
          digits.push(char);
          // 如果超过4位，移除最左边的数字
          if (digits.length > 4) {
            digits.shift();
          }
          // 填充到currentDate
          for (let i = 0; i < 4; i++) {
            currentDate[6 + i] = digits[i] || 'y';
          }
        }
      }
    }
    
    setDate(currentDate.join(''));
  };

  const renderDateInput = (dateStr, setDate, selection, setSelection, dateType = 'start') => {
    const monthInputRef = useRef(null);
    const dayInputRef = useRef(null);
    const yearInputRef = useRef(null);

    const handleGroupClick = (group) => {
      setSelection({ group, cursorPos: 0 });
      // 聚焦对应的输入框
      if (group === 'mm' && monthInputRef.current) {
        monthInputRef.current.focus();
        monthInputRef.current.select();
      } else if (group === 'dd' && dayInputRef.current) {
        dayInputRef.current.focus();
        dayInputRef.current.select();
      } else if (group === 'yyyy' && yearInputRef.current) {
        yearInputRef.current.focus();
        yearInputRef.current.select();
      }
    };

    const handleInputChange = (e, group) => {
      const value = e.target.value;
      // 只允许数字
      const numericValue = value.replace(/[^0-9]/g, '');
      
      if (numericValue) {
        // 模拟键盘输入
        for (let i = 0; i < numericValue.length; i++) {
          handleGroupDateInput(numericValue[i], dateStr, setDate, setSelection, { group });
        }
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault();
        setSelection({ group: null, cursorPos: 0 });
        e.target.blur();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const groups = ['mm', 'dd', 'yyyy'];
        const currentIdx = groups.indexOf(selection.group);
        
        if (e.key === 'ArrowLeft' && currentIdx > 0) {
          setSelection({ group: groups[currentIdx - 1], cursorPos: 0 });
        } else if (e.key === 'ArrowRight' && currentIdx < 2) {
          setSelection({ group: groups[currentIdx + 1], cursorPos: 0 });
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const groups = ['mm', 'dd', 'yyyy'];
        const currentIdx = groups.indexOf(selection.group);
        
        if (e.shiftKey) {
          const prevIdx = currentIdx === 0 ? 2 : currentIdx - 1;
          setSelection({ group: groups[prevIdx], cursorPos: 0 });
        } else {
          const nextIdx = currentIdx === 2 ? 0 : currentIdx + 1;
          setSelection({ group: groups[nextIdx], cursorPos: 0 });
        }
      } else if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleGroupDateInput(e.key, dateStr, setDate, setSelection, selection);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        const group = selection.group;
        const dateArray = dateStr.split('');
        
        if (group === 'mm') {
          dateArray[0] = 'm';
          dateArray[1] = 'm';
        } else if (group === 'dd') {
          dateArray[3] = 'd';
          dateArray[4] = 'd';
        } else if (group === 'yyyy') {
          dateArray[6] = 'y';
          dateArray[7] = 'y';
          dateArray[8] = 'y';
          dateArray[9] = 'y';
        }
        setDate(dateArray.join(''));
      }
    };
    
    const handleBlur = () => {
      setSelection({ group: null, cursorPos: 0 });
    };

    const month = dateStr.substring(0, 2);
    const day = dateStr.substring(3, 5);
    const year = dateStr.substring(6, 10);
    
    const isValid = dateStr !== 'mm/dd/yyyy' && validateDate(dateStr);
    const isInvalid = dateStr !== 'mm/dd/yyyy' && !validateDate(dateStr);

    return (
      <>
        <div>
          <div className={`flex items-center gap-1.5 p-2.5 border-2 rounded-lg transition-all min-w-[240px] ${
            isValid 
              ? 'border-green-500 bg-green-50' 
              : isInvalid 
              ? 'border-red-400 bg-red-50' 
              : 'border-green-300 bg-green-50 focus-within:border-green-600'
          }`}>
          {/* Month Group */}
          <input
            ref={monthInputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={month}
            onChange={(e) => handleInputChange(e, 'mm')}
            onClick={() => handleGroupClick('mm')}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className={`px-2 py-1 rounded font-mono font-bold text-base tracking-wide transition-colors w-14 text-center cursor-pointer ${
              selection.group === 'mm'
                ? 'bg-green-600 text-white ring-2 ring-green-400'
                : 'bg-white text-gray-700 border border-green-200 hover:bg-green-100'
            }`}
            tabIndex={selection.group === 'mm' ? 0 : -1}
          />

          {/* Slash */}
          <span className="text-green-400 font-bold">/</span>

          {/* Day Group */}
          <input
            ref={dayInputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={day}
            onChange={(e) => handleInputChange(e, 'dd')}
            onClick={() => handleGroupClick('dd')}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className={`px-2 py-1 rounded font-mono font-bold text-base tracking-wide transition-colors w-14 text-center cursor-pointer ${
              selection.group === 'dd'
                ? 'bg-green-600 text-white ring-2 ring-green-400'
                : 'bg-white text-gray-700 border border-green-200 hover:bg-green-100'
            }`}
            tabIndex={selection.group === 'dd' ? 0 : -1}
          />

          {/* Slash */}
          <span className="text-green-400 font-bold">/</span>

          {/* Year Group */}
          <input
            ref={yearInputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={year}
            onChange={(e) => handleInputChange(e, 'yyyy')}
            onClick={() => handleGroupClick('yyyy')}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className={`px-2 py-1 rounded font-mono font-bold text-base tracking-wide transition-colors w-20 text-center cursor-pointer ${
              selection.group === 'yyyy'
                ? 'bg-green-600 text-white ring-2 ring-green-400'
                : 'bg-white text-gray-700 border border-green-200 hover:bg-green-100'
            }`}
            tabIndex={selection.group === 'yyyy' ? 0 : -1}
          />

          {/* Clear Button - disabled when date is empty */}
          <button
            onClick={() => {
              setDate('mm/dd/yyyy');
              setDateError(''); // 清除错误信息
            }}
            disabled={dateStr === 'mm/dd/yyyy'}
            className={`ml-1 px-1.5 py-1 rounded transition-colors flex-shrink-0 ${
              dateStr === 'mm/dd/yyyy'
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-red-500 hover:text-red-700 hover:bg-red-50'
            }`}
            title={dateStr === 'mm/dd/yyyy' ? 'No date to clear' : 'Clear date'}
          >
            ✕
          </button>

          {/* Calendar Icon Button */}
          <button
            ref={dateType === 'start' ? startCalendarButtonRef : endCalendarButtonRef}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setCalendarPosition({
                top: rect.top + rect.height / 2,
                left: rect.left + rect.width / 2
              });
              if (dateType === 'start') {
                setShowStartCalendarPicker(!showStartCalendarPicker);
              } else {
                setShowEndCalendarPicker(!showEndCalendarPicker);
              }
            }}
            className="ml-1 px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition-colors flex-shrink-0"
            title="Open calendar picker"
          >
            📅
          </button>
        </div>
        </div>
      </>
    );
  };

  const renderTimeInput = (time, setTime, selection, setSelection, disabled = false) => {
    const hourInputRef = useRef(null);
    const minuteInputRef = useRef(null);
    const ampmInputRef = useRef(null);
    const [showAmPmDropdown, setShowAmPmDropdown] = useState(false);

    const handleGroupClick = (group) => {
      if (disabled) return;
      setSelection({ group, cursorPos: 0 });
      // 聚焦对应的输入框
      if (group === 'hh' && hourInputRef.current) {
        hourInputRef.current.focus();
        hourInputRef.current.select();
        setShowAmPmDropdown(false);
      } else if (group === 'mm' && minuteInputRef.current) {
        minuteInputRef.current.focus();
        minuteInputRef.current.select();
        setShowAmPmDropdown(false);
      } else if (group === 'aa') {
        // 切换 AM/PM 下拉菜单
        setShowAmPmDropdown(!showAmPmDropdown);
      }
    };

    const handleAmPmSelect = (value) => {
      const timeArray = time.split('');
      timeArray[6] = value[0];
      timeArray[7] = value[1];
      setTime(timeArray.join(''));
      setShowAmPmDropdown(false);
      setSelection({ group: null, cursorPos: 0 });
    };

    const handleInputChange = (e, group) => {
      const value = e.target.value;
      
      if (group === 'hh' || group === 'mm') {
        // 只允许数字
        const numericValue = value.replace(/[^0-9]/g, '');
        if (numericValue) {
          for (let i = 0; i < numericValue.length; i++) {
            handleGroupTimeInput(numericValue[i], time, setTime, setSelection, { group });
          }
        }
      } else if (group === 'aa') {
        // AM/PM
        const upperValue = value.toUpperCase();
        if (upperValue.includes('A') || upperValue.includes('P')) {
          handleGroupTimeInput(upperValue[0], time, setTime, setSelection, { group });
        }
      }
    };

    const handleBlur = () => {
      setSelection({ group: null, cursorPos: 0 });
      // 延迟关闭下拉菜单，以便点击选项能够生效
      setTimeout(() => setShowAmPmDropdown(false), 200);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const groups = ['hh', 'mm', 'aa'];
        const currentIdx = groups.indexOf(selection.group);
        
        if (e.key === 'ArrowLeft' && currentIdx > 0) {
          setSelection({ group: groups[currentIdx - 1], cursorPos: 0 });
        } else if (e.key === 'ArrowRight' && currentIdx < 2) {
          setSelection({ group: groups[currentIdx + 1], cursorPos: 0 });
        }
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const groups = ['hh', 'mm', 'aa'];
        const currentIdx = groups.indexOf(selection.group);
        
        if (e.shiftKey) {
          // Shift+Tab: go backwards with wraparound
          const prevIdx = currentIdx === 0 ? 2 : currentIdx - 1;
          setSelection({ group: groups[prevIdx], cursorPos: 0 });
        } else {
          // Tab: go forwards with wraparound
          const nextIdx = currentIdx === 2 ? 0 : currentIdx + 1;
          setSelection({ group: groups[nextIdx], cursorPos: 0 });
        }
      } else if ((e.key >= '0' && e.key <= '9') || e.key.toUpperCase() === 'A' || e.key.toUpperCase() === 'P') {
        e.preventDefault();
        handleGroupTimeInput(e.key, time, setTime, setSelection, selection);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        const group = selection.group;
        const timeArray = time.split('');
        
        if (group === 'hh') {
          timeArray[0] = 'h';
          timeArray[1] = 'h';
        } else if (group === 'mm') {
          timeArray[3] = 'm';
          timeArray[4] = 'm';
        } else if (group === 'aa') {
          timeArray[6] = 'a';
          timeArray[7] = 'a';
        }
        setTime(timeArray.join(''));
      }
    };

    const hours = time.substring(0, 2);
    const minutes = time.substring(3, 5);
    const ampm = time.substring(6, 8);

    return (
      <>
        <div className={`flex items-center gap-1.5 p-2.5 border-2 rounded-lg min-w-[200px] transition-colors ${
          disabled 
            ? 'border-gray-300 bg-gray-50' 
            : 'border-blue-300 bg-blue-50'
        }`}>
            {/* Hour Group */}
            <input
              ref={hourInputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={hours}
              onChange={(e) => handleInputChange(e, 'hh')}
              onClick={() => handleGroupClick('hh')}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              disabled={disabled}
              className={`px-2 py-1 rounded font-mono font-bold text-base tracking-wide transition-colors border w-14 text-center cursor-pointer ${
                disabled
                  ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                  : selection.group === 'hh'
                  ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-400'
                  : 'bg-white text-gray-700 border-blue-200 hover:bg-blue-100'
              }`}
              tabIndex={disabled || selection.group !== 'hh' ? -1 : 0}
            />

            {/* Colon */}
            <span className={`font-bold ${disabled ? 'text-gray-400' : 'text-blue-400'}`}>:</span>

            {/* Minute Group */}
            <input
              ref={minuteInputRef}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={minutes}
              onChange={(e) => handleInputChange(e, 'mm')}
              onClick={() => handleGroupClick('mm')}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              disabled={disabled}
              className={`px-2 py-1 rounded font-mono font-bold text-base tracking-wide transition-colors border w-14 text-center cursor-pointer ${
                disabled
                  ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                  : selection.group === 'mm'
                  ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-400'
                  : 'bg-white text-gray-700 border-blue-200 hover:bg-blue-100'
              }`}
              tabIndex={disabled || selection.group !== 'mm' ? -1 : 0}
            />

            {/* Divider */}
            <span className={disabled ? 'text-gray-400' : 'text-blue-400'}>|</span>

            {/* AM/PM Group - 自定义下拉选择 */}
            <div className="relative">
              <button
                ref={ampmInputRef}
                type="button"
                onClick={() => handleGroupClick('aa')}
                disabled={disabled}
                className={`px-2 py-1 rounded font-mono font-bold text-base tracking-wide transition-colors border w-16 text-center cursor-pointer ${
                  disabled
                    ? 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                    : showAmPmDropdown || selection.group === 'aa'
                    ? 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-400'
                    : 'bg-white text-gray-700 border-blue-200 hover:bg-blue-100'
                }`}
              >
                {ampm}
              </button>
              
              {/* 自定义下拉菜单 */}
              {showAmPmDropdown && !disabled && (
                <div className="absolute top-full left-0 mt-1 bg-white border-2 border-blue-400 rounded-lg shadow-lg z-50 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => handleAmPmSelect('AM')}
                    className="w-16 px-2 py-1.5 text-center font-mono font-bold text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors border-b border-gray-200"
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAmPmSelect('PM')}
                    className="w-16 px-2 py-1.5 text-center font-mono font-bold text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  >
                    PM
                  </button>
                </div>
              )}
            </div>
          </div>
      </>
    );
  };

  const setToday = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    setEndDateInput(`${month}/${day}/${year}`);
    showToast('End date set to today!', 'success');
  };

  const handleKeyPress = (e) => {
    // Check if all required date fields are filled
    const datesComplete = startDay && startMonth && startYear && endDay && endMonth && endYear;
    
    // Check if times are required and filled
    const timesValid = 
      (!includeStartTime || (includeStartTime && startTime)) &&
      (!includeEndTime || (includeEndTime && endTime));
    
    if (e.key === 'Enter' && datesComplete && timesValid) {
      calculateAge();
    }
  };

  const resetCalculator = () => {
    setStartDay('');
    setStartMonth('');
    setStartYear('');
    setStartDateInput('mm/dd/yyyy');
    setStartDateSelection({ group: null, cursorPos: 0 });
    setStartTime('hh:mm aa');
    setIncludeStartTime(false);
    setStartTimeSelection({ group: null, cursorPos: 0 });
    
    setEndDay('');
    setEndMonth('');
    setEndYear('');
    setEndDateInput('mm/dd/yyyy');
    setEndDateSelection({ group: null, cursorPos: 0 });
    setEndTime('hh:mm aa');
    setIncludeEndTime(false);
    setEndTimeSelection({ group: null, cursorPos: 0 });
    setShowStartCalendar(false);
    setShowEndCalendar(false);
    setResult(null);
    setDateError(''); // 清除错误信息
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
          <div className="text-center">
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              Start Date
            </label>
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:flex-wrap sm:justify-center">
              {/* Date Input */}
              {renderDateInput(startDateInput, setStartDateInput, startDateSelection, setStartDateSelection, 'start')}
              
              {/* Time Input */}
              {renderTimeInput(startTime, setStartTime, startTimeSelection, setStartTimeSelection, !includeStartTime)}
              
              {/* Include Time Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="time-toggle-start"
                  checked={includeStartTime}
                  onChange={(e) => {
                    setIncludeStartTime(e.target.checked);
                    if (!e.target.checked) {
                      setStartTime('hh:mm aa');
                      setStartTimeSelection({ group: null, cursorPos: 0 });
                    }
                  }}
                  className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                />
                <label htmlFor="time-toggle-start" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Include time
                </label>
              </div>
            </div>
          </div>

          {/* End Date Input */}
          <div className="text-center">
            <label className="text-sm font-semibold text-gray-700 block mb-2">
              End Date
            </label>
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:flex-wrap sm:justify-center">
              {/* Date Input */}
              {renderDateInput(endDateInput, setEndDateInput, endDateSelection, setEndDateSelection, 'end')}
              
              {/* Time Input */}
              {renderTimeInput(endTime, setEndTime, endTimeSelection, setEndTimeSelection, !includeEndTime)}
              
              {/* Include Time Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="time-toggle-end"
                  checked={includeEndTime}
                  onChange={(e) => {
                    setIncludeEndTime(e.target.checked);
                    if (!e.target.checked) {
                      setEndTime('hh:mm aa');
                      setEndTimeSelection({ group: null, cursorPos: 0 });
                    }
                  }}
                  className="w-4 h-4 text-purple-600 rounded cursor-pointer"
                />
                <label htmlFor="time-toggle-end" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Include time
                </label>
              </div>
            </div>
          </div>

          {/* 内联错误提示 */}
          {dateError && (
            <div className="text-center">
              <div className="inline-block bg-red-100 border-2 border-red-400 text-red-700 px-4 py-2 rounded-lg text-sm font-medium">
                ⚠️ {dateError}
              </div>
            </div>
          )}

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

      {/* Simple Calendar Picker for Start Date */}
      {showStartCalendarPicker && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" onClick={() => setShowStartCalendarPicker(false)}>
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 z-50 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Select Start Date</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const today = new Date();
                    const month = String(today.getMonth() + 1).padStart(2, '0');
                    const day = String(today.getDate()).padStart(2, '0');
                    const year = today.getFullYear();
                    setStartDateInput(`${month}/${day}/${year}`);
                    setShowStartCalendarPicker(false);
                  }}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors"
                >
                  Today
                </button>
                <button onClick={() => setShowStartCalendarPicker(false)} className="text-xl text-gray-500 hover:text-gray-700">×</button>
              </div>
            </div>
            <SimpleCalendar 
              onDateSelect={(month, day, year) => {
                setStartDateInput(`${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`);
                setShowStartCalendarPicker(false);
              }}
              currentDate={validateDate(startDateInput) ? parseDate(startDateInput) : null}
            />
          </div>
        </div>
      )}

      {/* Simple Calendar Picker for End Date */}
      {showEndCalendarPicker && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4" onClick={() => setShowEndCalendarPicker(false)}>
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 z-50 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Select End Date</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const today = new Date();
                    const month = String(today.getMonth() + 1).padStart(2, '0');
                    const day = String(today.getDate()).padStart(2, '0');
                    const year = today.getFullYear();
                    setEndDateInput(`${month}/${day}/${year}`);
                    setShowEndCalendarPicker(false);
                  }}
                  className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm font-medium transition-colors"
                >
                  Today
                </button>
                <button onClick={() => setShowEndCalendarPicker(false)} className="text-xl text-gray-500 hover:text-gray-700">×</button>
              </div>
            </div>
            <SimpleCalendar 
              onDateSelect={(month, day, year) => {
                setEndDateInput(`${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`);
                setShowEndCalendarPicker(false);
              }}
              currentDate={validateDate(endDateInput) ? parseDate(endDateInput) : null}
            />
          </div>
        </div>
      )}
    </>
  );
}

// Simple Calendar Component - does not use useState for performance
function SimpleCalendar({ onDateSelect, currentDate }) {
  const [month, setMonth] = useState(currentDate ? currentDate[0] : new Date().getMonth() + 1);
  const [year, setYear] = useState(currentDate ? currentDate[2] : new Date().getFullYear());

  const getDaysInMonth = (m, y) => {
    return new Date(y, m, 0).getDate();
  };

  const getFirstDayOfMonth = (m, y) => {
    return new Date(y, m - 1, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);
  const days = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 gap-2">
        <button 
          onClick={() => setMonth(month === 1 ? 12 : month - 1)}
          className="px-3 py-1 hover:bg-gray-100 rounded text-gray-800 font-bold text-lg"
        >
          ←
        </button>
        <select 
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          className="border border-gray-300 rounded px-3 py-1 text-gray-800 font-semibold bg-white cursor-pointer"
        >
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
            <option key={i + 1} value={i + 1}>{m}</option>
          ))}
        </select>
        <select 
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="border border-gray-300 rounded px-3 py-1 text-gray-800 font-semibold bg-white cursor-pointer"
        >
          {Array.from({ length: 100 }, (_, i) => year - 50 + i).map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <button 
          onClick={() => setMonth(month === 12 ? 1 : month + 1)}
          className="px-3 py-1 hover:bg-gray-100 rounded text-gray-800 font-bold text-lg"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="text-center font-bold text-gray-700 text-sm">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => (
          <button
            key={idx}
            onClick={() => day && onDateSelect(month, day, year)}
            className={`py-2 rounded text-sm font-medium ${
              day === null
                ? 'bg-gray-50 cursor-default text-transparent'
                : currentDate && currentDate[0] === month && currentDate[1] === day && currentDate[2] === year
                ? 'bg-blue-600 text-white font-bold'
                : 'hover:bg-blue-100 hover:text-blue-900 cursor-pointer text-gray-800'
            }`}
            disabled={day === null}
          >
            {day || '0'}
          </button>
        ))}
      </div>
    </div>
  );
}
