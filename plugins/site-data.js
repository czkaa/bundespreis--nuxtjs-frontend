export default defineNuxtPlugin(async (nuxtApp) => {
  const footerPagesGlobal = useState('footer-pages', () => null);

  if (process.server || !footerPagesGlobal.value) {
    try {
      // Use the API proxy instead of direct backend URL
      const response = await fetch(`/api/site`);
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
