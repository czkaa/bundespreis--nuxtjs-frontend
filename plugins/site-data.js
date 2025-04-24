// plugins/site-data.js
export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const footerPagesGlobal = useState('footer-pages', () => []);

  // Only fetch on server-side to avoid CORS issues
  if (process.server) {
    try {
      const response = await fetch(`${config.public.backendUrl}/site`, {
        headers: {
          Authorization: `Bearer ${config.apiToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      footerPagesGlobal.value = data.footerPages || [];
    } catch (error) {
      console.error('Failed to fetch site data:', error);
      footerPagesGlobal.value = [];
    }
  }

  return {
    provide: {
      siteData: {
        footerPages: footerPagesGlobal,
      },
    },
  };
});
