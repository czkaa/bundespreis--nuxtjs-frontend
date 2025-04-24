// plugins/site-data.js
export default defineNuxtPlugin(async (nuxtApp) => {
  const footerPagesGlobal = useState('footer-pages', () => null);

  if (process.server || !footerPagesGlobal.value) {
    try {
      // Use $fetch instead of fetch
      const data = await $fetch('/api/site');
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
