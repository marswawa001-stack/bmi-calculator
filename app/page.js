export default function Home() {
  const calculators = [
    {
      id: 'bmi',
      title: 'BMI Calculator',
      icon: '💪',
      description: 'Calculate your Body Mass Index and understand your healthy weight range.',
      color: 'from-blue-500 to-indigo-600',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-700',
      link: '/bmi-calculator',
    },
    {
      id: 'age',
      title: 'Age Calculator',
      icon: '🎂',
      description: 'Calculate your exact age in years, months, days, and even total weeks lived.',
      color: 'from-purple-500 to-pink-600',
      hoverColor: 'hover:from-purple-600 hover:to-pink-700',
      link: '/age-calculator',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">
            Free Online Calculators
          </h1>
          <p className="text-xl text-indigo-100 mb-2">
            Fast, accurate, and easy-to-use calculators
          </p>
          <p className="text-lg text-indigo-200">
            100% free - No sign-up required - Works on all devices
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Choose a Calculator
          </h2>
          <p className="text-gray-600">
            Select from our collection of free tools below
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {calculators.map((calc) => {
            return (
              <a key={calc.id} href={calc.link} className="group block">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                  <div className={`bg-gradient-to-r ${calc.color} ${calc.hoverColor} p-6 transition-all duration-300`}>
                    <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                      {calc.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {calc.title}
                    </h3>
                  </div>

                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {calc.description}
                    </p>
                    
                    <div className="flex items-center text-indigo-600 font-semibold group-hover:text-indigo-700">
                      <span>Start Calculating</span>
                      <svg 
                        className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-2xl shadow-lg px-8 py-6">
            <p className="text-gray-500 text-sm mb-2">Coming Soon</p>
            <p className="text-gray-700 font-medium">
              More calculators: Loan, Calorie, Currency Converter
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Use Our Calculators?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Get instant results with our optimized calculators. No waiting, no loading.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                100% Private
              </h3>
              <p className="text-gray-600">
                All calculations happen in your browser. Your data never leaves your device.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Mobile Friendly
              </h3>
              <p className="text-gray-600">
                Works perfectly on all devices - desktop, tablet, and mobile.
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            2024 Free Calculators. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Made with love for everyone who needs quick calculations
          </p>
        </div>
      </footer>
    </div>
  );
}