export default {
  content: ['./site/**/*.php', './content/**/*.txt'],
  theme: {
    fontFamily: {
      sans: ['SeasonSans', 'sans-serif'],
      serif: ['SeasonSerif', 'serif'],
    },
    fontSize: {
      root: '1vw',
      'root-md': '1.5vw',
      'root-sm': '2.25vw',

      xs: ['max(1.16rem, 12px)', { lineHeight: '1.14', letterSpacing: '0' }], // customized xs
      sm: ['max(1.66rem, 14px)', { lineHeight: '1.1', letterSpacing: '0' }], // customized sm
      'sm-sans': [
        'max(1.7rem, 14.5px)',
        { lineHeight: '1.07', letterSpacing: '0' },
      ], // customized sm

      md: ['2.25rem', { lineHeight: '1.2', letterSpacing: '0' }], // customized base
      lg: ['3.4rem', { lineHeight: '0.866', letterSpacing: '-0.01em' }], // customized lg
      // 'lg-md': ['2.5rem', { lineHeight: '0.866', letterSpacing: '-0.01em' }], // customized lg
      xl: ['4.7rem', { lineHeight: '0.8', letterSpacing: '-0.02em' }], // customized xl
      // 'xl-md': ['3.5rem', { lineHeight: '0.8', letterSpacing: '-0.02em' }], // customized xl
    },
    screens: {
      lg: { min: '1280px' },
      md: { max: '1000px' },
      sm: { max: '700px' },

      'hover-hover': { raw: '(hover: hover)' },
    },
    extend: {
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',

        'indent-sm': '4.18rem',
        'indent-md': '8.3rem',
        'frame-h': 'min(100vh, 100dvh)',
        'frame-w': 'min(100vw, 100dvw)',
        tag: 'var(--tag-h)',
        'tag-top': 'var(--tag-top)',

        main: 'var(--main-w)',
        'column-l': 'var(--column-l)',
        'column-r': 'var(--column-r)',
        'column-l-translate': 'var(--column-l-translate)',
        'column-r-translate': 'var(--column-r-translate)',

        'intro-image-w': 'var(--intro-image-w)',
        'intro-image-h': 'var(--intro-image-h)',
        'intro-container-w': 'var(--intro-container-w)',
        'intro-container-h': 'var(--intro-container-h)',

        'translate-w': 'var(--translate-w)',
        'content-h': 'var(--content-h)',
        'image-w': 'var(--image-w)',
        'offset-content': 'var(--offset-content)',
        'remaining-content': 'var(--remaining-content)',
        logotype: 'var(--logotype)',
      },
      padding: {
        intro: 'var(--intro)',
        'intro-md': 'var(--intro-md)',
      },
      transitionDuration: {
        intro: '1200ms',
        gap: '500ms',
        page: '1000ms',
        fade: '800ms',
      },
    },
  },
};
