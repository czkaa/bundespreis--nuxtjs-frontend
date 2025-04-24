export default function useMultilanguageApi() {
  const { locale } = useI18n();
  const apiBase = '/api';

  const getPageData = async (slug) => {
    try {
      const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
      const url = `${apiBase}/${locale.value}/${cleanSlug}`;

      const { data } = await useFetch(url);
      return data.value || {}; // Return empty object as fallback
    } catch (error) {
      console.error(`Error fetching page data for slug ${slug}:`, error);
      return {}; // Return empty object on error
    }
  };

  const getFooterPages = async () => {
    try {
      const { data } = await useFetch(`${apiBase}/${locale.value}/site`, {
        transform: (response) => response?.footerPages || [], // Handle null response
      });
      return data.value || []; // Return empty array as fallback
    } catch (error) {
      console.error('Error fetching footer pages:', error);
      return []; // Return empty array on error
    }
  };

  return {
    getPageData,
    getFooterPages,
  };
}
