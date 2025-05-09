// composables/useHeadSeo.js
export const useHeadSeo = () => {
  // Get these values when the composable is called (inside setup)
  const { locale } = useI18n();
  const head = useHead({});

  // These functions don't call composition API functions directly
  const setAllMetadata = (siteData) => {
    const siteTitle =
      siteData?.seo?.title ||
      (locale.value === 'en'
        ? 'Federal Award for Art Students'
        : 'Bundespreis für Kunststudierende');

    head.patch({
      title: siteTitle,
      meta: [
        {
          name: 'description',
          content:
            siteData?.seo?.description || 'Bundespreis data viewer application',
        },
        { name: 'keywords', content: siteData?.seo?.keywords || '' },
        { property: 'og:title', content: siteTitle },
        {
          property: 'og:description',
          content:
            siteData?.seo?.description || 'Bundespreis data viewer application',
        },
        ...(siteData?.seo?.image
          ? [{ property: 'og:image', content: siteData.seo.image }]
          : []),
      ],
    });
  };

  const setPageTitle = (pageTitle, siteData) => {
    const siteTitle =
      siteData?.seo?.title ||
      (locale.value === 'en'
        ? 'Federal Award for Art Students'
        : 'Bundespreis für Kunststudierende');

    head.patch({
      title: pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle,
    });
  };

  return {
    setAllMetadata,
    setPageTitle,
  };
};
