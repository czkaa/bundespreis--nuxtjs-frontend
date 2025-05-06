export default defineNuxtPlugin(async (nuxtApp) => {
  // Create reactive state for translations
  const kirbyTranslations = useState('kirbyTranslations', () => null);

  // Load translations from API
  const { data } = await useFetch('/api/language');
  kirbyTranslations.value = data.value;

  // Provide to app
  nuxtApp.provide('kirbyTranslations', kirbyTranslations);
});
