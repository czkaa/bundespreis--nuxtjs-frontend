export default defineNuxtRouteMiddleware(async (to, from) => {
  const gap = useGapStore();
  const intro = useIntroStore();

  if (to.fullPath === from.fullPath && to.params?.slug?.length === 0) {
    intro.setIntro(true);
    return;
  }

  const findTemplate = (route) => {
    if (route.fullPath.split('/').length === 4) {
      return 'preistragende';
    } else if (route.fullPath.split('/')[2] === 'info') {
      return 'info';
    } else {
      return 'home';
    }
  };
  const fromTemplate = findTemplate(from);
  const toTemplate = findTemplate(to);

  if (toTemplate !== fromTemplate || toTemplate === 'preistragende') {
    gap.setGap(false);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
});
