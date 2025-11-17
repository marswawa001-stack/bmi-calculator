'use client';

export default function Logo({ className = "w-8 h-8" }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#4F46E5', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#A5B4FC', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#grad1)" />
      <path
        d="M65,100 C65,80 85,80 100,100 C115,120 135,120 135,100 C135,80 115,80 100,100 C85,120 65,120 65,100Z"
        stroke="white"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
