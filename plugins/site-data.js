// plugins/site-data.js
export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const footerPagesGlobal = useState('footer-pages', () => null);

  // Only fetch on server-side or if data doesn't exist yet
  if (process.server || !footerPagesGlobal.value) {
    try {
      // Use the API proxy instead of direct backend URL
      const response = await fetch(`/api/site`, {
        headers: {
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
