import resolveConfig from 'tailwindcss/resolveConfig';
import * as tailwindConfig from '../tailwind.config.js';

const config = tailwindConfig.default || tailwindConfig;
const fullConfig = resolveConfig(config);

export const durationIntro = parseInt(
  fullConfig.theme.transitionDuration.intro
);

export const durationGap = parseInt(fullConfig.theme.transitionDuration.intro);
