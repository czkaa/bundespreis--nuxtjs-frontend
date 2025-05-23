import { GAP_DURATION } from '../utils/tailwind';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const gap = useGapStore();
  const routeStore = useRouteStore();
  const intro = useIntroStore();

  const findTemplate = (route) => {
    if (!route?.name) return null;
    if (route.name.includes('landing')) {
      return 'landing';
    } else if (route.name.includes('info')) {
      return 'info';
    } else if (route.name.includes('preistragende')) {
      return 'preistragende';
    } else {
      return 'home';
    }
  };

  const fromTemplate = findTemplate(from);
  const toTemplate = findTemplate(to);
  if (to.fullPath === from.fullPath && to.params?.slug?.length === 0) {
    intro.setIntro(true);
  }

  if (fromTemplate === toTemplate) {
    if (toTemplate === 'preistragende') {
      gap.setGap(false);
      await new Promise((resolve) => setTimeout(resolve, GAP_DURATION * 1.5));
      gap.setGap(true);
    }
  } else if (toTemplate === 'home') {
    gap.setGap(false);
  } else {
    gap.setGap(false);
    await new Promise((resolve) => setTimeout(resolve, GAP_DURATION * 1.5));
    gap.setGap(true);
  }

  routeStore.setTemplate(toTemplate);
  routeStore.setRoute(to);
});
