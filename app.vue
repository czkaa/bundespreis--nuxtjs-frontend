<template>
  <Transition name="slide" mode="out-in">
    <LayoutHeader
      v-if="siteData && introStore.isDone"
      :siteData="siteData"
      class="fixed top-0 w-full z-[100]"
      :key="headerKey"
    />
  </Transition>

  <SnippetsHomeLogo />
  <SnippetsHomeLogo :isTop="false" />
  <div class="absolute w-full" key="main-content">
    <div
      class="fixed top-0 h-frame-h w-full z-50"
      :class="{
        'pointer-events-none overflow-hidden': gap.isGap,
        'overflow-y-scroll': !gap.isGap,
      }"
      @scroll="handleScroll"
      @wheel="handleWheel"
      ref="scrollContainer"
    >
      <LayoutGallery :siteData="siteData" />
      <LayoutFooter :siteData="siteData" class="md:hidden" />
    </div>

    <main
      class="transition-opacity duration-500"
      :class="{ 'opacity-0': !gap.isGap }"
    >
      <div class="w-main mx-auto mb-outer my-offset-content px-xs">
        <NuxtPage />
      </div>
    </main>
  </div>
  <!-- <Transition name="">
    <LayoutIntro v-if="false" :siteData="siteData" key="intro" />
    
  </Transition> -->
</template>
<script setup>
const { locale } = useI18n();
const gap = useGapStore();
const introStore = useIntroStore();
const routeStore = useRouteStore();

const scrollContainer = ref(null);
const route = useRoute();

const { data: siteData } = await useFetch(
  () => `/api/${locale.value === 'en' ? 'en/' : ''}site`
);

const scrollPosition = ref(0); // Store the scroll position

// Handle scroll event
const handleScroll = () => {
  if (!gap.isGap && scrollContainer.value) {
    scrollPosition.value = scrollContainer.value.scrollTop;
  }
};

// Watch for changes in isGap
watch(
  () => gap.isGap,
  (newIsGap, oldIsGap) => {
    handleContainers(newIsGap);
  }
);

const handleContainers = (boolean) => {
  if (boolean === false) {
    // Store the current body scroll position when moving to gallery view
    if (document.body) {
      document.body.style.height = 'min(100vh, 100dvh)';
      // document.body.style.overflow = 'hidden';
    }
  } else {
    // Restore scroll position when moving back to gap view
    if (document.body) {
      document.body.style.height = '';
      document.body.style.overflow = '';

      // Use nextTick to ensure the DOM has updated
      nextTick(() => {
        if (scrollContainer.value) {
          scrollContainer.value.scrollTop = scrollPosition.value;
        }
      });
    }
  }
};
const headerKey = ref(0);

watch(
  () => siteData,
  () => {
    headerKey.value++;
  },
  { deep: true }
);

onMounted(() => {
  handleContainers(gap.isGap);
});
</script>

<style>
body {
  @apply w-full overflow-y-scroll;
}
.fade-enter-active,
.fade-leave-active {
  @apply duration-500 transition-opacity ease-linear;
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
  @apply duration-intro transition-transform ease-linear;
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

/* Explicitly define the visible states too */
.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
}
</style>
