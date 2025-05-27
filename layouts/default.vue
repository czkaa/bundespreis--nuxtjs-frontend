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
          <slot />
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
const props = defineProps({
  siteData: {
    type: Object,
  },
  languageData: {
    type: Object,
  },
  isLangChange: {
    type: Boolean,
    default: false,
  },
});

import throttle from 'lodash.throttle';
const gap = useGapStore();
const introStore = useIntroStore();
const routeStore = useRouteStore();

const isMounted = ref(false); // Changed from null to false

// HANDLING LAYOUT CHANGE

const showHeader = computed(() => {
  return (introStore.isDone || !introStore.isIntro) && !props.isLangChange;
});

const showIntro = computed(() => {
  return introStore.isIntro && !introStore.isDone;
});

const showFooter = computed(() => {
  return (
    ((galleryAtBottom.value && !gap.isGap && !gap.isTransitioning) ||
      (mainAtBottom.value && gap.isGap && !gap.isTransitioning) ||
      routeStore.template === 'info') &&
    !blockFooter.value
  );
});

const galleryAtBottom = ref(false);
const mainAtBottom = ref(false);
const blockFooter = ref(false);

// Refs for DOM elements
const galleryContainer = ref(null);
const mainContainer = ref(null);

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

// Watch for when galleryContainer becomes available
watch(
  galleryContainer,
  (newElement, oldElement) => {
    if (oldElement) {
      oldElement.removeEventListener('scroll', handleScroll);
    }
    if (newElement) {
      newElement.addEventListener('scroll', handleScroll);
    }
  },
  { flush: 'post' }
);

// Watch for when mainContainer becomes available
watch(
  mainContainer,
  (newElement, oldElement) => {
    if (oldElement) {
      oldElement.removeEventListener('scroll', handleScroll);
    }
    if (newElement) {
      newElement.addEventListener('scroll', handleScroll);
    }
  },
  { flush: 'post' }
);

// Clean up event listeners
onUnmounted(() => {
  if (galleryContainer.value) {
    galleryContainer.value.removeEventListener('scroll', handleScroll);
  }
  if (mainContainer.value) {
    mainContainer.value.removeEventListener('scroll', handleScroll);
  }
});

// Watch for gap state changes
watch(
  () => gap.isGap,
  (newValue) => {
    blockFooter.value = true;
    setTimeout(() => {
      blockFooter.value = false;
    }, 1000);
  }
);
</script>
