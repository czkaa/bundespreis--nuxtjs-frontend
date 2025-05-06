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
  <div v-if="!introVisible" class="absolute w-full" key="main-content">
    <!-- Gallery View -->
    <div
      style="scrollbar-gutter: stable"
      class="absolute top-0 h-frame-h w-full z-50 overflow-y-auto"
      :class="{
        'pointer-events-none': gap.isGap,
        '': !gap.isGap,
      }"
      :style="
        gap.isGap
          ? { transform: `translateY(-${galleryScrollPosition}px)` }
          : {}
      "
      @scroll="handleGalleryScroll"
      @wheel="handleWheel"
      ref="galleryContainer"
    >
      <LayoutGallery :siteData="siteData" />
      <LayoutFooter :siteData="siteData" class="md:hidden" />
    </div>

    <!-- Main Content View -->
    <main
      style="scrollbar-gutter: stable"
      class="absolute h-frame-h transition-opacity duration-500 overflow-y-scroll"
      :class="{ 'opacity-0': !gap.isGap, '': gap.isGap }"
      @scroll="handleMainScroll"
      ref="mainContainer"
    >
      <div class="w-main mx-auto my-offset-content px-xs">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const gap = useGapStore();
const introStore = useIntroStore();
const routeStore = useRouteStore();

const galleryContainer = ref(null);
const mainContainer = ref(null);
const route = useRoute();
const introVisible = ref(false);

const { data: siteData } = await useFetch(
  () => `/api/${locale.value === 'en' ? 'en/' : ''}site`
);

const headerKey = ref(0);

watch(
  () => siteData,
  () => {
    headerKey.value++;
  },
  { deep: true }
);
</script>

<style>
body {
  @apply w-full overflow-hidden;
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
