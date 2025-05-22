import { GAP_DURATION } from '../utils/tailwind';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const gap = useGapStore();
  const routeStore = useRouteStore();
  const intro = useIntroStore();

  if (to.fullPath === from.fullPath && to.params?.slug?.length === 0) {
    intro.setIntro(true);
  }

  const findTemplate = (route) => {
    if (
      to.fullPath.includes('preistragende/') ||
      to.fullPath.includes('winners/')
    ) {
      return 'preistragende';
    } else if (to.fullPath.includes('info')) {
      return 'info';
    } else {
      return 'home';
    }
  };
  const fromTemplate = findTemplate(from);
  const toTemplate = findTemplate(to);

  if (to.params?.slug?.length === 0) {
    gap.setGap(false);
  } else if (toTemplate !== fromTemplate || toTemplate === 'preistragende') {
    if (gap.isGap) {
      gap.setGap(false);
      await new Promise((resolve) => setTimeout(resolve, GAP_DURATION * 2));
      gap.setGap(true);
    } else {
      gap.setGap(true);
    }
  } else {
    if (!gap.isGap) {
      gap.setGap(true);
    }
  }
  routeStore.setTemplate(toTemplate);
  console.log('toTemplate', toTemplate);
});
