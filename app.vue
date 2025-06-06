<template>
  <NuxtLayout
    :siteData="siteData"
    :languageData="languageData"
    :isLangChange="isLangChange"
  >
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
const { getPageData } = getData();
const { setAllMetadata, setPageTitle } = useHeadSeo();
const siteStore = useSiteStore();
const isLangChange = ref(false);

// Fetch data
const { data: siteDataDe } = await useAsyncData('site-de', () =>
  getPageData('/site')
);

const { data: siteDataEn } = await useAsyncData('site-en', () =>
  getPageData('/en/site')
);

const { data: languageData } = await useAsyncData('language-data', () =>
  getPageData('/language')
);

const siteData = computed(() => {
  if (locale.value === 'de') {
    return siteDataDe.value;
  } else if (locale.value === 'en') {
    return siteDataEn.value;
  }
  return null;
});

// Watch and update
watch(
  siteData,
  (newData) => {
    if (newData) {
      siteStore.setAllMetadata(newData);
      setAllMetadata(newData);
      isLangChange.value = true;
      setTimeout(() => {
        isLangChange.value = false;
      }, 200);
    }
  },
  { immediate: true }
);
</script>

<style>
body {
  @apply w-full overflow-hidden;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.fade-enter-active,
.fade-leave-active {
  @apply duration-fade transition-opacity ease-linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.slide-intro-leave-active,
.slide-intro-enter-active {
  @apply duration-page transition-transform ease-linear;
  position: absolute;
  width: 100%;
}

.slide-intro-enter-from {
  transform: translateY(100dvh);
}

.slide-intro-leave-to {
  transform: translateY(-100dvh);
}

.slide-header-enter-active,
.slide-header-leave-active {
  transition: transform 0.5s ease;
  right: 0;
  top: 0;
}

.slide-header-enter-from,
.slide-header-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-header-enter-to,
.slide-header-leave-from {
  transform: translateY(0);
}

.slide-footer-enter-active,
.slide-footer-leave-active {
  transition: transform 0.5s ease;
}

.slide-footer-enter-from,
.slide-footer-leave-to {
  transform: translateY(100%);
}

.slide-footer-enter-to,
.slide-footer-leave-from {
  transform: translateY(0);
}
</style>
