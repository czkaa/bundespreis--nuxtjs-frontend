<template>
  <NuxtLink :to="switchPath" class="block text-primary-600 center">
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

const pathWithoutLocale = computed(() => {
  return route.path.replace(new RegExp(`^\\/${locale.value}\\/?`), '');
});

const switchPath = computed(() => {
  if (pathWithoutLocale.value === '') {
    return `/${targetLocale.value}`;
  }
  const routes = translations.value?.[locale.value]?.routes || {};
  const translation = routes[pathWithoutLocale.value]?.[targetLocale.value];

  return translation
    ? `/${targetLocale.value}/${translation}`
    : `/${targetLocale.value}/${pathWithoutLocale.value}`;
});
</script>
