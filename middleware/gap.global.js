import { GAP_DURATION } from '../utils/tailwind';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const gap = useGapStore();
  const routeStore = useRouteStore();
  const intro = useIntroStore();

  const findTemplate = (route) => {
    if (!route?.name) return null;
    /* preistragende needs to be checked first because it also contains 'slug' */
    if (route.name.includes('preistragende')) {
      return 'preistragende';
    } else if (route.name.includes('slug')) {
      return 'landing';
    } else if (route.name.includes('info')) {
      return 'info';
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

  if (to.fullPath === from.fullPath && toTemplate === 'home') {
    intro.setIntro(true);
  }

  if (fromTemplate === toTemplate) {
    if (toTemplate === 'preistragende' || toLanguage !== fromLanguage) {
      gap.setGap(false);
      await new Promise((resolve) => setTimeout(resolve, GAP_DURATION * 2));
      setTimeout(() => {
        gap.setGap(true);
      }, GAP_DURATION);
    }
  } else if (toTemplate === 'home') {
    gap.setGap(false);
  } else {
    gap.setGap(false);
    await new Promise((resolve) => setTimeout(resolve, GAP_DURATION * 2));
    setTimeout(() => {
      gap.setGap(true);
    }, GAP_DURATION);
  }

  routeStore.setTemplate(toTemplate);
  routeStore.setRoute(to.fullPath);

  gap.setGap(true);
});
