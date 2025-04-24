// composables/useMultilanguageApi.js
export default function useMultilanguageApi() {
  const { locale } = useI18n();
  const config = useRuntimeConfig();
  const backendUrl = config.public.backendUrl;

  const fetchOptions = {
    server: true, // Prefer server fetching to avoid CORS issues
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiToken}`,
    },
    responseType: 'json',
  };

  // Function to get page data
  const getPageData = async (slug) => {
    try {
      // Clean the slug to ensure no double slashes
      const cleanSlug = slug.replace(/^\/+|\/+$/g, '');
      const url = `${backendUrl}/${locale.value}/${cleanSlug}`;

      const { data } = await useFetch(url, {
        ...fetchOptions,
        key: `page-${cleanSlug}-${locale.value}`,
      });

      return data.value || {};
    } catch (error) {
      console.error(`Error fetching page data for slug ${slug}:`, error);
      return {};
    }
  };

  // Function to get footer pages
  const getFooterPages = async () => {
    try {
      const { data } = await useFetch(`${backendUrl}/${locale.value}/site`, {
        ...fetchOptions,
        key: `footer-pages-${locale.value}`,
        transform: (response) => response?.footerPages || [],
      });

      return data.value || [];
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
