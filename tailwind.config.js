/** @type {import('tailwindcss').Config} */

// module.exports = {
//   content: [
//     "./App.{js,jsx,ts,tsx}",
//     "./src/**/*.{js,jsx,ts,tsx}",
//     "./components/**/*.{js,jsx,ts,tsx}",
//     "./pages/**/*.{js,jsx,ts,tsx}"  // Add this line!
//   ],
//   presets: [require("nativewind/preset")],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}"  // Add this line!
  ],
  theme: {
    extend: {
      colors: {
  base: {
    100: '#ffffff',
    200: '#fbfbfb',
    300: '#f2f2f2',
    content: '#39393c',
  },

  primary: {
    DEFAULT: '#453277',
    content: '#f7f4ff',
  },

  secondary: {
    DEFAULT: '#ff003f',
    content: '#fff9fb',
  },

  accent: {
    DEFAULT: '#4fa6c2',
    content: '#accad1',
  },

  neutral: {
    DEFAULT: '#232327',
    content: '#ebebeb',
  },

  info: {
    DEFAULT: '#8fa3f3',
    content: '#495a9f',
  },

  success: {
    DEFAULT: '#49c576',
    content: '#b5dac2',
  },

  warning: {
    DEFAULT: '#f4e38a',
    content: '#a4763b',
  },

  error: {
    DEFAULT: '#e54024',
    content: '#edd2cf',
  },
},

      borderRadius: {
        selector: '0.5rem',
        field: '0.25rem',
        box: '0.5rem',
      },
      spacing: {
        selector: '0.25rem',
        field: '0.25rem',
      },
      borderWidth: {
        DEFAULT: '1px',
      },
      zIndex: {
        depth: '1',
      },


    fontFamily: {
  inter: 'Inter_400Regular',
  'inter-bold': 'Inter_700Bold', 
  sora: 'Sora_400Regular',
  'sora-semibold': 'Sora_600SemiBold',
},

    },
  },
  plugins: [],
};

