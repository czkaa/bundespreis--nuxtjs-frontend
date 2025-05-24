<template>
  <NuxtLink :to="switchPath" class="sm:mt-0" :aria-label="ariaLabel">
    <BasicsNavItem
      :text="targetLocale"
      class="items-end w-tag h-tag uppercase justify-center"
    />
  </NuxtLink>
</template>

<script setup>
const { locale, t } = useI18n();
const route = useRoute();

const props = defineProps({
  languageData: {
    type: Object,
    required: true,
  },
});
const targetLocale = computed(() => (locale.value === 'de' ? 'en' : 'de'));

const currentPath = computed(() => {
  return route.path
    .replace(new RegExp(`^\\/${locale.value}\\/?`), '')
    .replace(/^\/+/, '');
});

const switchPath = computed(() => {
  const isGerman = targetLocale.value === 'de';
  const basePath = isGerman ? '' : '/en';

  if (!currentPath.value) {
    return isGerman ? '/' : '/en';
  }
  const routes = props.languageData?.[locale.value]?.routes || {};
  const translatedPath =
    routes[currentPath.value]?.[targetLocale.value] || currentPath.value;

  return `${basePath}/${translatedPath}`;
});

const ariaLabel = computed(() => {
  return targetLocale.value === 'en'
    ? t('changeLanguageToEn')
    : t('changeLanguageToDe');
});
</script>
