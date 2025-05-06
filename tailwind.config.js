module.exports = {
  content: ['./site/**/*.php', './content/**/*.txt'],
  theme: {
    fontFamily: {
      sans: ['SeasonVF', 'sans-serif'],
      serif: ['SeasonVF', 'serif'],
    },
    fontSize: {
      root: '1vw',
      'root-md': '1.5vw',
      'root-sm': 'max(2vw, 11px)',

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
      md: { max: '900px' },
      sm: { max: '700px' },

      'hover-hover': { raw: '(hover: hover)' },
    },
    extend: {
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',

        'indent-sm': '4.18rem',
        'indent-md': '8rem',
        'frame-h': 'min(100vh, 100dvh)',
        'frame-w': 'min(100vw, 100dvw)',
        tag: 'var(--tag-h)',
        main: 'var(--main-w)',
        column: 'var(--column-w)',
        'translate-w': 'var(--translate-w)',
        'content-h': 'var(--content-h)',
        'image-w': 'var(--image-w)',
        'offset-content': 'var(--offset-content)',
      },
      transitionDuration: {
        intro: '1s',
        gap: '1s',
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
