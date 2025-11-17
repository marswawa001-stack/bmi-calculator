'use client';

export default function Logo({ className = "w-8 h-8" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 背景圆形 */}
      <circle cx="100" cy="100" r="95" fill="#4F46E5" />
      
      {/* 外圆环 */}
      <circle cx="100" cy="100" r="95" stroke="#E0E7FF" strokeWidth="2" fill="none" />
      
      {/* 计算器网格背景 */}
      <g opacity="0.15">
        <line x1="60" y1="60" x2="140" y2="60" stroke="white" strokeWidth="1" />
        <line x1="60" y1="80" x2="140" y2="80" stroke="white" strokeWidth="1" />
        <line x1="60" y1="100" x2="140" y2="100" stroke="white" strokeWidth="1" />
        <line x1="60" y1="120" x2="140" y2="120" stroke="white" strokeWidth="1" />
        <line x1="60" y1="140" x2="140" y2="140" stroke="white" strokeWidth="1" />
      </g>
      
      {/* 主要元素：计算符号 */}
      {/* 加号 */}
      <g transform="translate(75, 75)">
        <line x1="0" y1="-8" x2="0" y2="8" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <line x1="-8" y1="0" x2="8" y2="0" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </g>
      
      {/* 减号 */}
      <g transform="translate(125, 75)">
        <line x1="-8" y1="0" x2="8" y2="0" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </g>
      
      {/* 乘号 */}
      <g transform="translate(75, 125)">
        <line x1="-7" y1="-7" x2="7" y2="7" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <line x1="7" y1="-7" x2="-7" y2="7" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </g>
      
      {/* 除号 */}
      <g transform="translate(125, 125)">
        <circle cx="0" cy="-4" r="2" fill="white" />
        <line x1="-6" y1="4" x2="6" y2="4" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <circle cx="0" cy="10" r="2" fill="white" />
      </g>
      
      {/* 装饰性的光晕效果 */}
      <circle cx="100" cy="100" r="95" stroke="#818CF8" strokeWidth="1" fill="none" opacity="0.3" />
    </svg>
  );
}
