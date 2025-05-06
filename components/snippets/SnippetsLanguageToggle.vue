<template>
  <NuxtLink
    :to="switchPath"
    class="w-tag shrink-0 inline-block text-primary-600 hover-hover:hover:text-primary-800 transition-colors duration-200 text-center"
  >
    <BasicsNavItem
      :text="targetLocale"
      class="items-end w-tag h-tag uppercase justify-center"
    />
  </NuxtLink>
</template>

<script setup>
const { locale } = useI18n();
const route = useRoute();
const { data: translations } = await useFetch('/api/language');

// Target locale to switch to
const targetLocale = computed(() => (locale.value === 'de' ? 'en' : 'de'));

// Get path without locale prefix
const pathWithoutLocale = computed(() => {
  return route.path.replace(new RegExp(`^\\/${locale.value}\\/?`), '');
});

// Path to switch to
const switchPath = computed(() => {
  // If we're at root, just switch locale
  if (pathWithoutLocale.value === '') {
    return `/${targetLocale.value}`;
  }

  // Try to find translation
  const routes = translations.value?.[locale.value]?.routes || {};
  const translation = routes[pathWithoutLocale.value]?.[targetLocale.value];

  // Return translation or fallback
  return translation
    ? `/${targetLocale.value}/${translation}`
    : `/${targetLocale.value}/${pathWithoutLocale.value}`;
});
</script>
