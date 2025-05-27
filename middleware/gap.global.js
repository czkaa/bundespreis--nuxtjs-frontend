import { GAP_DURATION } from '../utils/tailwind';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const gap = useGapStore();
  const routeStore = useRouteStore();
  const intro = useIntroStore();

  const findTemplate = (route) => {
    if (!route?.name) return null;
    /* preistragende and info needs to be checked first because it also contains 'slug' */
    if (route.name.includes('preistragende')) {
      return 'preistragende';
    } else if (route.name.includes('info')) {
      return 'info';
    } else if (route.name.includes('slug')) {
      return 'landing';
    } else {
      return 'home';
    }
  };

  const findLanguage = (route) => {
    if (!route?.name) return 'de';
    if (route.name.includes('_de')) {
      return 'de';
    } else {
      return 'en';
    }
  };

  const fromTemplate = findTemplate(from);
  const toTemplate = findTemplate(to);

  const toLanguage = findLanguage(to);
  const fromLanguage = findLanguage(from);

  // initial render, always open unless it is home
  if (to.fullPath === from.fullPath) {
    if (toTemplate === 'home') {
      intro.setIntro(true);
      gap.setGap(false);
    } else {
      gap.setGap(true);
    }
    // later, alway set false when going home
  } else if (toTemplate === 'home') {
    gap.setGap(false);
    await new Promise((resolve) => setTimeout(resolve, GAP_DURATION));
    // if navigating from one  temlate to the other
  } else if (fromTemplate === toTemplate) {
    // close and open gap only if navigating to a different language or preistragende (but not for landing and info)
    if (toTemplate === 'preistragende' || toLanguage !== fromLanguage) {
      gap.setGap(false);
      await new Promise((resolve) => setTimeout(resolve, GAP_DURATION));
      setTimeout(() => {
        gap.setGap(true);
      }, GAP_DURATION);
    }
    // coming from home, a different animation is needed because gap is already closed
  } else if (fromTemplate === 'home') {
    setTimeout(() => {
      gap.setGap(true);
    }, GAP_DURATION / 2);
  } else {
    gap.setGap(false);
    await new Promise((resolve) => setTimeout(resolve, GAP_DURATION));
    setTimeout(() => {
      gap.setGap(true);
    }, GAP_DURATION);
  }

  routeStore.setTemplate(toTemplate);
});
