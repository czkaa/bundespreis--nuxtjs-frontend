// composables/useMultilanguageApi.js
export default function useMultilanguageApi() {
  const { locale } = useI18n();

  const getPageData = async (slug) => {
    try {
      const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
      const { data } = await useFetch(`/api/${locale.value}/${cleanSlug}`);
      return data.value || {};
    } catch (error) {
      console.error(`Error fetching page data:`, error);
      return {};
    }
  };

  const getFooterPages = async () => {
    try {
      const { data } = await useFetch(`/api/${locale.value}/site`);
      return data.value?.footerPages || [];
    } catch (error) {
      console.error('Error fetching footer pages:', error);
      return [];
    }
  };

  return {
    getPageData,
    getFooterPages,
  };
}
