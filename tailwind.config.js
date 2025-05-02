module.exports = {
  content: ['./site/**/*.php', './content/**/*.txt'],
  theme: {
    fontFamily: {
      sans: ['SeasonVF', 'sans-serif'],
      serif: ['SeasonVF', 'serif'],
    },
    fontSize: {
      root: '1.1vw',
      'root-md': 'max(2.5vw, 10px)',

      xs: ['1.16rem', { lineHeight: '1.14', letterSpacing: '0' }], // customized xs
      sm: ['1.66rem', { lineHeight: '1.1', letterSpacing: '0' }], // customized sm
      'sm-sans': ['1.7rem', { lineHeight: '1.07', letterSpacing: '0' }], // customized sm

      md: ['2.25rem', { lineHeight: '1.2', letterSpacing: '0' }], // customized base
      lg: ['3.75rem', { lineHeight: '0.866', letterSpacing: '-0.01em' }], // customized lg
      'lg-md': ['2.5rem', { lineHeight: '0.866', letterSpacing: '-0.01em' }], // customized lg
      xl: ['5.625rem', { lineHeight: '0.8', letterSpacing: '-0.02em' }], // customized xl
      'xl-md': ['3.5rem', { lineHeight: '0.8', letterSpacing: '-0.02em' }], // customized xl
    },
    screens: {
      lg: { min: '1280px' },
      sm: { max: '600px' },
      md: { max: '900px' },
      'hover-hover': { raw: '(hover: hover)' },
    },
    extend: {
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '2rem',
        xl: '4rem',

        'indent-sm': '4rem',
        'indent-md': '8rem',
        'frame-h': 'min(100vh, 100dvh)',
        'frame-w': 'min(100vw, 100dvw)',
        tag: '4.5rem',
        main: 'var(--main)',
        column: 'calc((100vw - var(--main)) / 2)',
        outer: '7.5rem',
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
          'font-variation-settings': '"wght" 510, "SERF" 0',
        },
        '.font-serif': {
          'font-variation-settings': '"wght" 500, "SERF" 100',
        },
      });
    },
  ],
};
