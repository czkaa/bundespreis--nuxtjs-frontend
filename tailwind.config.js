module.exports = {
  content: ['./site/**/*.php', './content/**/*.txt'],
  theme: {
    fontFamily: {
      sans: ['SeasonVF', 'sans-serif'],
      serif: ['SeasonVF', 'serif'],
    },
    fontSize: {
      root: '16px',
      'root-md': '13px',

      xs: ['1.16rem', { lineHeight: '1.14', letterSpacing: '0' }], // customized xs
      sm: ['1.66rem', { lineHeight: '1.1', letterSpacing: '0' }], // customized sm
      'sm-sans': ['1.7rem', { lineHeight: '1.07', letterSpacing: '0' }], // customized sm

      md: ['2.25rem', { lineHeight: '1.2', letterSpacing: '0' }], // customized base
      lg: ['3.75rem', { lineHeight: '0.866', letterSpacing: '-0.01em' }], // customized lg
      xl: ['5.625rem', { lineHeight: '0.8', letterSpacing: '-0.02em' }], // customized xl
    },
    screens: {
      lg: { min: '1280px' },
      sm: { max: '900px' },
      md: { max: '1000px' },
      'hover-hover': { raw: '(hover: hover)' },
    },
    extend: {
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        'indent-sm': '3rem',
        'indent-md': '6rem',
        'frame-h': 'min(100vh, 100dvh)',
        'frame-w': 'min(100vw, 100dvw)',
        tag: '3rem',
      },
      transitionDuration: {
        intro: '2s',
      },
    },
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        '.font-sans': {
          'font-variation-settings': '"wght" 500, "SERF" 0',
        },
        '.font-serif': {
          'font-variation-settings': '"wght" 500, "SERF" 100',
        },
      });
    },
  ],
};
