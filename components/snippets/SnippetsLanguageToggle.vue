<template>
  <NuxtLink
    :to="switchPath"
    class="sm:mt-0"
    :aria-label="`${
      targetLocale === 'en'
        ? $t('changeLanguageToEn')
        : $t('changeLanguageToDe')
    }`"
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

const props = defineProps({
  languageData: {
    type: Object,
    required: true,
  },
});

// Target locale to switch to
const targetLocale = computed(() => (locale.value === 'de' ? 'en' : 'de'));

const pathWithoutLocale = computed(() => {
  return route.path
    .replace(new RegExp(`^\\/${locale.value}\\/?`), '')
    .replace(/^\/+/, '');
});

const switchPath = computed(() => {
  if (pathWithoutLocale.value === '') {
    return `${targetLocale.value === 'de' ? '/' : '/en'}`;
  }
  const routes = props.languageData?.[locale.value]?.routes || {};

  // Try both with and without trailing slash
  const pathKey = pathWithoutLocale.value;
  const pathKeyWithSlash = pathKey + '/';

  const currentRoute = routes[pathKey] || routes[pathKeyWithSlash];
  const translation = currentRoute?.[targetLocale.value];

  return translation
    ? `${targetLocale.value === 'de' ? '' : '/en'}/${translation}`
    : `${targetLocale.value === 'de' ? '' : '/en'}/${pathWithoutLocale.value}`;
});
</script>
