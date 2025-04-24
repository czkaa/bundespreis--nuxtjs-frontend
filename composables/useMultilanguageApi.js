export default function useMultilanguageApi() {
  const { locale } = useI18n();

  // Use /api/ prefix for all backend requests
  const apiBase = '/api';

  const getPageData = async (slug) => {
    try {
      const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
      const url = `${apiBase}/${locale.value}/${cleanSlug}`;

      const { data } = await useFetch(url);
      return data.value;
    } catch (error) {
      console.error(`Error fetching page data for slug ${slug}:`, error);
      return null;
    }
  };

  const getFooterPages = async () => {
    try {
      const { data } = await useFetch(`${apiBase}/${locale.value}/site`, {
        transform: (response) => response.footerPages,
      });
      return data.value;
    } catch (error) {
      console.error('Error fetching footer pages:', error);
      return null;
    }
  };

  // You can add more API methods here as needed

  return {
    getPageData,
    getFooterPages,
  };
}
