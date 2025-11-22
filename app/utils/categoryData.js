export const categoryData = {
  health: {
    name: 'Health',
    icon: '❤️',
    description: 'Health-related calculators to help you monitor and maintain your wellbeing',
    keywords: 'health calculator, bmi calculator, age calculator, health tools, wellness calculator, body mass index, health monitoring',
    color: 'from-red-50 to-red-100',
    textColor: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconBg: 'bg-red-100',
    calculators: [
      {
        id: 'bmi-calculator',
        name: 'BMI Calculator',
        description: 'Calculate your Body Mass Index and see your health category',
        icon: '💪',
        path: '/bmi-calculator',
        popular: true
      },
      {
        id: 'age-calculator',
        name: 'Age Calculator',
        description: 'Calculate your exact age in years, months, and days',
        icon: '🎂',
        path: '/age-calculator',
        popular: false
      }
    ]
  },
  finance: {
    name: 'Finance',
    icon: '💰',
    description: 'Financial calculators for budgeting, investing, and more',
    keywords: 'finance calculator, loan calculator, investment calculator, budget calculator, savings calculator, interest calculator, financial planning',
    color: 'from-green-50 to-green-100',
    textColor: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconBg: 'bg-green-100',
    calculators: []
  },
  math: {
    name: 'Math',
    icon: '📐',
    description: 'Mathematical calculators for various calculations',
    keywords: 'math calculator, algebra calculator, geometry calculator, scientific calculator, mathematical tools, equation solver',
    color: 'from-blue-50 to-blue-100',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-100',
    calculators: [
      {
        id: 'average-percentage-calculator',
        name: 'Average Percentage Calculator',
        description: 'Calculate simple or weighted average of multiple percentages',
        icon: '📊',
        path: '/average-percentage-calculator',
        popular: false
      }
    ]
  },
  conversion: {
    name: 'Conversion',
    icon: '🔄',
    description: 'Unit conversion calculators for everyday measurements',
    keywords: 'unit converter, length converter, weight converter, temperature converter, volume converter, metric conversion, measurement converter',
    color: 'from-purple-50 to-purple-100',
    textColor: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconBg: 'bg-purple-100',
    calculators: []
  },
  everyday: {
    name: 'Everyday Life',
    icon: '🏠',
    description: 'Calculators for everyday tasks and needs',
    keywords: 'everyday calculator, household calculator, daily tools, practical calculator, cooking calculator, daily use tools',
    color: 'from-yellow-50 to-yellow-100',
    textColor: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    iconBg: 'bg-yellow-100',
    calculators: []
  },
  sports: {
    name: 'Sports',
    icon: '⚽',
    description: 'Sports-related calculators and performance metrics',
    keywords: 'sports calculator, fitness calculator, performance calculator, training calculator, athlete tools, sports analytics',
    color: 'from-orange-50 to-orange-100',
    textColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    iconBg: 'bg-orange-100',
    calculators: []
  },
  physics: {
    name: 'Physics',
    icon: '⚛️',
    description: 'Physics calculators for scientific computations',
    keywords: 'physics calculator, scientific calculator, force calculator, energy calculator, motion calculator, physics tools',
    color: 'from-indigo-50 to-indigo-100',
    textColor: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    iconBg: 'bg-indigo-100',
    calculators: []
  },
  chemistry: {
    name: 'Chemistry',
    icon: '🧪',
    description: 'Chemistry calculators for chemical calculations',
    keywords: 'chemistry calculator, molecular calculator, chemical calculator, mole calculator, stoichiometry calculator, chemistry tools',
    color: 'from-pink-50 to-pink-100',
    textColor: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    iconBg: 'bg-pink-100',
    calculators: []
  },
  biology: {
    name: 'Biology',
    icon: '🧬',
    description: 'Biology calculators for life science calculations',
    keywords: 'biology calculator, genetic calculator, life science calculator, DNA calculator, evolution calculator, biology tools',
    color: 'from-teal-50 to-teal-100',
    textColor: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    iconBg: 'bg-teal-100',
    calculators: [
      {
        id: 'annealing-temperature-calculator',
        name: 'Annealing Temperature Calculator',
        description: 'Estimate PCR primer annealing temperature (Ta) from primer and target melting temperatures (Tm). Supports °C / °F / K.',
        icon: '🧪',
        path: '/annealing-temperature-calculator',
        popular: false
      }
    ]
  },
  construction: {
    name: 'Construction',
    icon: '🏗️',
    description: 'Construction calculators for building and design',
    keywords: 'construction calculator, building calculator, material calculator, cost estimator, construction tools, project calculator',
    color: 'from-gray-50 to-gray-100',
    textColor: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    iconBg: 'bg-gray-100',
    calculators: []
  },
  ecology: {
    name: 'Ecology',
    icon: '🌱',
    description: 'Environmental and ecology related calculators',
    keywords: 'ecology calculator, environmental calculator, carbon calculator, sustainability calculator, green calculator, eco tools',
    color: 'from-lime-50 to-lime-100',
    textColor: 'text-lime-600',
    bgColor: 'bg-lime-50',
    borderColor: 'border-lime-200',
    iconBg: 'bg-lime-100',
    calculators: []
  },
  statistics: {
    name: 'Statistics',
    icon: '📊',
    description: 'Statistical analysis calculators',
    keywords: 'statistics calculator, p-value calculator, statistical calculator, probability calculator, data analysis, statistical tools',
    color: 'from-cyan-50 to-cyan-100',
    textColor: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    iconBg: 'bg-cyan-100',
    calculators: [
      {
        id: 'p-value-calculator',
        name: 'P-Value Calculator',
        description: 'Calculate p-values for statistical hypothesis testing',
        icon: '📈',
        path: '/p-value-calculator',
        popular: false
      }
    ]
  },
  geometry: {
    name: 'Geometry',
    icon: '📐',
    description: 'Geometric shape and area calculators',
    keywords: 'geometry calculator, area calculator, perimeter calculator, volume calculator, shape calculator, geometry tools',
    color: 'from-rose-50 to-rose-100',
    textColor: 'text-rose-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    iconBg: 'bg-rose-100',
    calculators: []
  },
  other: {
    name: 'Other',
    icon: '🎯',
    description: 'Other useful calculators',
    keywords: 'calculator, online tools, utility calculator, misc calculator, general calculator, helpful tools',
    color: 'from-slate-50 to-slate-100',
    textColor: 'text-slate-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    iconBg: 'bg-slate-100',
    calculators: [
      {
        id: 'test-grade-calculator',
        name: 'Test Grade Calculator',
        description: 'Calculate your test score and letter grade with customizable grading scale',
        icon: '📊',
        path: '/test-grade-calculator',
        popular: false
      }
    ]
  }
};
