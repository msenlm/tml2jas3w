tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        red:     { 500: '#FF3300' },
        cyan:    { 500: '#00E7E7' },
        blue:    { 500: '#0033FF' },
        purple:  { 500: '#7300FF' },
        magenta: { 500: '#FF00DB' },
        gray: {
          900: '#000000', 700: '#333333', 600: '#333333', 500: '#757575',
          400: '#BBBBBB', 300: '#D4D4D4', 200: '#EEEEEE', 100: '#F9F9F9',
        },
      },
      fontFamily: {
        sans: ['"Object Sans"', '"Inter"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['"Inference Sans"', '"Impact"', '"Arial Narrow"', 'sans-serif'],
        'dm-sans': ['"DM Sans"', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '7xl': ['119px', { lineHeight: '1', letterSpacing: '-4px' }],
        '6xl': ['95px', { lineHeight: '1', letterSpacing: '-3.8px' }],
        '5xl': ['76px', { lineHeight: '1.1', letterSpacing: '-3.04px' }],
        '4xl': ['61px', { lineHeight: '1.1', letterSpacing: '-2.44px' }],
        '2xl': ['39px', { lineHeight: '1.1', letterSpacing: '-0.78px' }],
        xl:   ['31px', { lineHeight: '1.1', letterSpacing: '-0.31px' }],
        lg:   ['25px', { lineHeight: '1.4' }],
        base: ['16px', { lineHeight: '1.4' }],
        sm:   ['14px', { lineHeight: '1.2' }],
        xs:   ['12px', { lineHeight: '1.4' }],
      },
      spacing: { 'header': '75px' },
      height: { 'header': '75px' },
    },
  },
};
