// utils/tailwind.js
let GAP_DURATION = 500 + 100;
let INTRO_DURATION = 1000 + 100;

// In Nuxt/Vite environments, you can use this
if (import.meta.env) {
  import('../tailwind.config.js')
    .then((module) => {
      const tailwindConfig = module.default || module;
      const durations = tailwindConfig.theme?.extend?.transitionDuration || {};

      // GAP_DURATION = durations.gap
      //   ? parseInt(durations.gap.replace('ms', ''))
      //   : 500;
      // INTRO_DURATION = durations.intro
      //   ? parseInt(durations.intro.replace('ms', ''))
      //   : 1000;
    })
    .catch((err) => {
      console.warn('Failed to load Tailwind config:', err);
    });
}

export { GAP_DURATION, INTRO_DURATION };
