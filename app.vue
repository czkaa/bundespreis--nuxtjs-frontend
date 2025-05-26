<template>
  <Transition name="slide-intro">
    <LayoutIntro v-if="showIntro" :siteData />

    <div v-else class="absolute w-full" key="main-content">
      <div
        style="scrollbar-gutter: stable"
        class="absolute top-0 h-frame-h w-full z-50 overflow-y-auto"
        :class="{
          'pointer-events-none overflow-hidden': gap.isGap,
        }"
        id="galleryContainer"
        ref="galleryContainer"
      >
        <LayoutGallery :siteData="siteData" v-if="siteData" />
      </div>

      <main
        style="scrollbar-gutter: stable"
        class="absolute w-full h-frame-h transition-opacity duration-gap overflow-y-scroll pb-offset-content"
        :class="{
          'opacity-0': !gap.isGap || !isMounted,

          'z-50': gap.isGap && gap.isTransitioning,
        }"
        ref="mainContainer"
      >
        <div class="w-main ml-column-l mb-xs overflow-x-hidden px-sm md:px-0">
          <NuxtPage />
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
import { useI18n } from 'vue-i18n';
import throttle from 'lodash.throttle';

const { locale } = useI18n();
const { getPageData } = getData();
const { setAllMetadata, setPageTitle } = useHeadSeo();

const gap = useGapStore();
const introStore = useIntroStore();
const siteStore = useSiteStore();
const isLangChange = ref(false);
const routeStore = useRouteStore();

const isMounted = ref(null);

// HANDLING LAYOUT CHANGE

const showHeader = computed(() => {
  return (introStore.isDone || !introStore.isIntro) && !isLangChange.value;
});

const showIntro = computed(() => {
  return introStore.isIntro && !introStore.isDone;
});

const showFooter = computed(() => {
  return (
    (galleryAtBottom.value && !gap.isGap && !gap.isTransitioning) ||
    (mainAtBottom.value && gap.isGap && !gap.isTransitioning) ||
    routeStore.template === 'info'
  );
});

const galleryAtBottom = ref(false);
const mainAtBottom = ref(false);
const blockFooter = ref(false);

// Function to check if element is scrolled to bottom
const isScrolledToBottom = (element) => {
  if (!element) return false;
  const threshold = 100; // Small threshold to account for sub-pixel scrolling

  const isScrolledToBottom =
    element.scrollTop + element.clientHeight >=
    element.scrollHeight - threshold;
  return isScrolledToBottom;
};

// Throttled scroll handler
const handleScroll = throttle(() => {
  if (blockFooter.value) return;
  galleryAtBottom.value = isScrolledToBottom(galleryContainer.value);
  mainAtBottom.value = isScrolledToBottom(mainContainer.value);
}, 100); // Throttle to 100ms

// Setup scroll listeners
onMounted(async () => {
  await nextTick();

  setTimeout(() => {
    isMounted.value = true;
  }, 1000);
});

const galleryContainer = ref(null);
const mainContainer = ref(null);

watch(galleryContainer, (newValue) => {
  if (newValue) {
    newValue.addEventListener('scroll', handleScroll);
  }
});

watch(mainContainer, (newValue) => {
  if (newValue) {
    newValue.addEventListener('scroll', handleScroll);
  }
});

watch(gap.isGap, (newValue) => {
  blockFooter.value = true;
  setTimeout(() => {
    blockFooter.value = false;
  }, 1000);
});

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
