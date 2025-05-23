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
        id="galleryContainer"
        ref="galleryContainer"
      >
        <LayoutGallery :siteData="siteData" v-if="siteData" />
      </div>

      <main
        style="scrollbar-gutter: stable"
        class="w-full absolute h-frame-h transition-opacity duration-500 overflow-y-scroll pb-offset-content"
        :class="{ 'opacity-0': !gap.isGap }"
        ref="mainContainer"
      >
        <div class="w-main ml-column-l mb-xs overflow-x-hidden px-sm md:px-0">
          <Template />
        </div>
      </main>
    </div>
  </Transition>

  <Transition name="slide-header" mode="out-in">
    <LayoutHeader
      v-show="showHeader"
      :siteData
      :languageData
      class="fixed top-0 w-full z-[100]"
    />
  </Transition>

  <Transition name="slide-footer" mode="out-in">
    <LayoutFooter
      v-show="showFooter"
      :siteData
      class="fixed bottom-0 left-0 z-[100] md:hidden"
    />
  </Transition>

  <SnippetsHomeLogo />
  <SnippetsHomeLogo :isTop="false" />
</template>

<script setup>
import { useHeadSeo } from '~/composables/useHeadSeo';
import { useSiteStore } from '~/stores/site';
import { useI18n } from 'vue-i18n';
import throttle from 'lodash.throttle';

import Template from './components/templates/Template.vue';

const { locale } = useI18n();
const { setAllMetadata, setPageTitle } = useHeadSeo();
const gap = useGapStore();
const introStore = useIntroStore();
const siteStore = useSiteStore();
const isLangChange = ref(false);

const showFooter = ref(false);
const galleryContainer = ref(null);
const mainContainer = ref(null);

const showHeader = computed(() => {
  return (introStore.isDone || !introStore.isIntro) && !isLangChange.value;
});

const showIntro = computed(() => {
  return introStore.isIntro && !introStore.isDone;
});

// Function to check if element is scrolled to bottom
const isScrolledToBottom = (element) => {
  if (!element) return false;
  const threshold = 10; // Small threshold to account for sub-pixel scrolling
  return (
    element.scrollTop + element.clientHeight >= element.scrollHeight - threshold
  );
};

// Throttled scroll handler
const handleScroll = throttle(() => {
  const galleryAtBottom = isScrolledToBottom(galleryContainer.value);
  const mainAtBottom = isScrolledToBottom(mainContainer.value);

  // Show footer if either container is scrolled to bottom
  showFooter.value = galleryAtBottom || mainAtBottom;
}, 100); // Throttle to 100ms

// Setup scroll listeners
onMounted(() => {
  if (galleryContainer.value) {
    galleryContainer.value.addEventListener('scroll', handleScroll);
  }
  if (mainContainer.value) {
    mainContainer.value.addEventListener('scroll', handleScroll);
  }
});

// Cleanup scroll listeners
onUnmounted(() => {
  if (galleryContainer.value) {
    galleryContainer.value.removeEventListener('scroll', handleScroll);
  }
  if (mainContainer.value) {
    mainContainer.value.removeEventListener('scroll', handleScroll);
  }
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
