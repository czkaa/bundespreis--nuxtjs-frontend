// composables/useHeadSeo.js
export const useHeadSeo = () => {
  // Set all metadata from site data
  const setAllMetadata = (siteData) => {
    // Get i18n inside this function to ensure proper context
    const { locale } = useI18n();

    // Get site title and other metadata
    const siteTitle =
      siteData?.seo?.title ||
      (locale.value === 'en'
        ? 'Federal Award for Art Students'
        : 'Bundespreis für Kunststudierende');

    // Set all metadata
    useHead({
      title: siteTitle,
      meta: [
        {
          name: 'description',
          content:
            siteData?.seo?.description || 'Bundespreis data viewer application',
        },
        { name: 'keywords', content: siteData?.seo?.keywords || '' },
        // Open Graph tags
        { property: 'og:title', content: siteTitle },
        {
          property: 'og:description',
          content:
            siteData?.seo?.description || 'Bundespreis data viewer application',
        },
        // Add image if available
        ...(siteData?.seo?.image
          ? [{ property: 'og:image', content: siteData.seo.image }]
          : []),
      ],
    });
  };

  // Just set the page title, keeping other metadata
  const setPageTitle = (pageTitle, siteData) => {
    // Get i18n inside this function to ensure proper context
    const { locale } = useI18n();

    // Get site title
    const siteTitle =
      siteData?.seo?.title ||
      (locale.value === 'en'
        ? 'Federal Award for Art Students'
        : 'Bundespreis für Kunststudierende');

    // Only update the title
    useHead({
      title: pageTitle ? `${pageTitle} | ${siteTitle}` : siteTitle,
    });
  };

  return {
    setAllMetadata,
    setPageTitle,
  };
};
