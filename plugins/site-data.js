// plugins/site-data.js
export default defineNuxtPlugin((nuxtApp) => {
  const footerPagesGlobal = useState('footer-pages', () => []);

  // Use onNuxtReady to ensure the app is mounted before fetching
  nuxtApp.hook('app:mounted', async () => {
    try {
      // Try to fetch data
      const data = await $fetch('/api/site');
      footerPagesGlobal.value = data?.footerPages || [];
    } catch (error) {
      console.error('Failed to fetch site data:', error);
    }
  });

  return {
    provide: {
      siteData: {
        footerPages: footerPagesGlobal,
      },
    },
  };
});
