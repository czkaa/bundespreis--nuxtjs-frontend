<template>
  <Transition name="slide-intro">
    <LayoutIntro v-if="showIntro" :siteData />

    <div v-else class="absolute w-full" key="main-content">
      <div
        style="scrollbar-gutter: stable"
        class="absolute top-0 h-frame-h w-full z-50 overflow-y-auto"
        :class="{
          'pointer-events-none': gap.isGap,
        }"
        ref="galleryContainer"
      >
        <LayoutGallery :siteData="siteData" />
        <LayoutFooter v-if="siteData" :siteData="siteData" class="md:hidden" />
      </div>

      <main
        style="scrollbar-gutter: stable"
        class="w-full absolute h-frame-h transition-opacity duration-500 overflow-y-scroll pb-offset-content"
        :class="{ 'opacity-0': !gap.isGap }"
        ref="mainContainer"
      >
        <div class="w-main ml-column-l mb-xs overflow-x-hidden px-sm md:px-0">
          <NuxtPage />
        </div>
      </main>
    </div>
  </Transition>

  <Transition name="slide" mode="out-in">
    <LayoutHeader
      v-show="showHeader"
      :siteData
      :languageData
      class="fixed top-0 w-full z-[100]"
    />
  </Transition>
  <SnippetsHomeLogo />
  <SnippetsHomeLogo :isTop="false" />
</template>

<script setup>
import { useHeadSeo } from '~/composables/useHeadSeo';
import { useSiteStore } from '~/stores/site';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
const { setAllMetadata, setPageTitle } = useHeadSeo(); // This calls useI18n inside a setup context
const gap = useGapStore();
const introStore = useIntroStore();
const siteStore = useSiteStore();
const isLangChange = ref(false);

const showHeader = computed(() => {
  return (introStore.isDone || !introStore.isIntro) && !isLangChange.value;
});

const showIntro = computed(() => {
  return introStore.isIntro && !introStore.isDone;
});

// Fetch data
const { data: siteDataDe } = await useFetch(() => `/api/site`);
const { data: siteDataEn } = await useFetch(() => `/api/en/site`);
const { data: languageData } = await useFetch('/api/language');

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
      setAllMetadata(newData); // Now this doesn't call useI18n or useHead
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
  position: absolute;
  right: 0;
  top: 0;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
}
</style>
