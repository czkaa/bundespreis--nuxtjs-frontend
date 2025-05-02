<template>
  <Transition name="fade" mode="out-in">
    <LayoutHeader
      v-if="siteData"
      :siteData="siteData"
      class="fixed top-0 z-50"
      key="header"
    />
  </Transition>

  <Transition name="slide-up" mode="out-in">
    <LayoutIntro v-if="introVisible" :siteData="siteData" key="intro" />
  </Transition>

  <Transition name="slide-in" mode="out-in">
    <div v-if="!introVisible" class="absolute w-full" key="main-content">
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
        <div class="w-main mx-auto mb-outer px-lg md:px-0">
          <NuxtPage />
        </div>
      </main>
    </div>
  </Transition>
</template>
<script setup>
const { locale } = useI18n();
const localePath = useLocalePath();

const gap = useGapStore();
const introStore = useIntroStore();
const scrollContainer = ref(null);
const route = useRoute();
const router = useRouter();

const { data: siteData } = await useFetch(
  () => `/api/${locale.value === 'en' ? 'en/' : ''}site`
);

const scrollPosition = ref(0); // Store the scroll position

// Computed property to determine if intro should be visible
const introVisible = computed(() => {
  return introStore.isIntro && localePath(route.path === '/');
});

// Handle scroll event
const handleScroll = () => {
  if (!gap.isGap && scrollContainer.value) {
    scrollPosition.value = scrollContainer.value.scrollTop;
  }
};

// Mouse movement threshold and tracking
let mouseMoveCounter = 0;
const mouseMoveThreshold = 10; // Number of mouse movements before hiding intro

// Mouse move handler - primary method to hide intro
const handleMouseMove = () => {
  if (introVisible.value) {
    mouseMoveCounter++;
    console.log('Mouse moved!', mouseMoveCounter);

    if (mouseMoveCounter > mouseMoveThreshold && introStore.isScaled) {
      introStore.setIntro(false);
    }
  } else {
    introStore.setDone(true);
  }
};

// Watch for changes in isGap
watch(
  () => gap.isGap,
  (newIsGap, oldIsGap) => {
    handleContainers(newIsGap);
  }
);

// // Watch for language changes
// watch(
//   () => locale.value,
//   (newLocale, oldLocale) => {
//     if (newLocale !== oldLocale) {
//       handleLanguageChange();
//     }
//   }
// );

const handleContainers = (boolean) => {
  if (boolean === false) {
    // Store the current body scroll position when moving to gallery view
    if (document.body) {
      document.body.style.height = 'min(100vh, 100dvh)';
      document.body.style.overflow = 'hidden';
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

// Uncomment and modify the route watcher to handle language changes better
watch(
  () => route.path,
  (newPath, oldPath) => {
    // Don't reset scroll when only the language changes
    const newPathBase = newPath.replace(/^\/(en|de)/, '');
    const oldPathBase = oldPath.replace(/^\/(en|de)/, '');

    // If it's just a language change on the same page, don't reset scroll
    if (newPathBase === oldPathBase && newPath !== oldPath) {
    } else {
      document.body.style.scrollBehavior = 'auto';
      document.documentElement.style.scrollBehavior = 'auto';

      scrollPosition.value = 0;
      if (scrollContainer.value) {
        scrollContainer.value.scrollTop = 0;
      }

      setTimeout(() => {
        document.documentElement.style.scrollBehavior = '';
        document.body.style.scrollBehavior = '';
      }, 100);
    }
  }
);

// Initialize all event listeners on mount
onMounted(() => {
  const path = route.fullPath; // Remove hash from path
  const isHomeRoute = path === '/' || path === '/en' || path === '/de';
  if (!isHomeRoute) {
    introStore.setIntro(false);
  }

  window.addEventListener('mousemove', handleMouseMove);
  handleContainers(gap.isGap);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>
<style>
body {
  @apply w-full;
}
/* Fixed fade transitions with matched durations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
/* Slide up transition for the intro */
.slide-up-enter-active,
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 1s linear;
}
.slide-up-leave-active {
  transition: transform 1s linear;
  position: absolute;
  width: 100%;
}
.slide-up-enter-from {
  transform: translateY(0);
}
.slide-up-leave-to {
  transform: translateY(-100dvh);
}

.slide-in-enter-from {
  transform: translateY(100dvh);
}
.slide-in-enter-to {
  transform: translateY(0);
}
.slide-in-leave-from {
  transform: translateY(0);
}
.slide-in-leave-to {
  transform: translateY(-100dvh);
}
</style>
