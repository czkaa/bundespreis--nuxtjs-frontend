<template>
  <TemplatesHome v-if="isHome" />
  <TemplatesPreistragende v-if="isPreistragende" />
  <TemplatesInfo v-if="isInfo" />
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

// Translation variables for route paths
const routeNames = {
  de: {
    preisTragende: 'preistragende',
    info: 'info',
  },
  en: {
    preisTragende: 'winners',
    info: 'info',
  },
};

const route = useRoute();
const { locale } = useI18n();

// Get current language's route names
const currentRouteNames = computed(() => {
  return routeNames[locale.value] || routeNames.de; // Fallback to German
});

// Get the path without locale prefix
const path = computed(() => {
  if (Array.isArray(route.params.slug)) {
    return route.params.slug.join('/');
  }
  return route.params.slug || '';
});

// Check which template should be shown
const isInfo = computed(() => {
  return path.value.startsWith(currentRouteNames.value.info);
});

// Check if this is preistragende template (has preisTragende/ prefix with a slug)
const isPreistragende = computed(() => {
  const pathParts = path.value.split('/');
  return (
    pathParts[0] === currentRouteNames.value.preisTragende &&
    pathParts.length > 1 &&
    pathParts[1] !== ''
  );
});

// Check if this is home template
const isHome = computed(() => {
  // Home if:
  // 1. Empty path
  // 2. Path is exactly preisTragende (no slug)
  // 3. Not info and not preistragende/slug
  return (
    !path.value ||
    path.value === currentRouteNames.value.preisTragende ||
    (!isInfo.value && !isPreistragende.value && !path.value.includes('/'))
  );
});
</script>
