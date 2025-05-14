import { GAP_DURATION } from '../utils/tailwind';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const gap = useGapStore();
  const intro = useIntroStore();

  if (to.fullPath === from.fullPath && to.params?.slug?.length === 0) {
    intro.setIntro(true);
    return;
  }

  const findTemplate = (route) => {
    if (
      route.fullPath.includes('preistragende/') ||
      route.fullPath.includes('winners/')
    ) {
      return 'preistragende';
    } else if (route.fullPath.includes('info')) {
      return 'info';
    } else {
      return 'home';
    }
  };
  const fromTemplate = findTemplate(from);
  const toTemplate = findTemplate(to);

  console.log(GAP_DURATION);

  if (toTemplate !== fromTemplate || toTemplate === 'preistragende') {
    if (gap.isGap) {
      gap.setGap(false);
      await new Promise((resolve) => setTimeout(resolve, GAP_DURATION * 2));
    } else {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
});
