export default defineNuxtPlugin(async (nuxtApp) => {
  const footerPagesGlobal = useState('footer-pages', () => []);

  if (process.server || !footerPagesGlobal.value.length) {
    try {
      const data = await $fetch('/api/site');
      footerPagesGlobal.value = data?.footerPages || [];
    } catch (error) {
      console.error('Failed to fetch site data:', error);
      // Keep the default empty array
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
