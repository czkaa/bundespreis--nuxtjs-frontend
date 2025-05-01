<template>
  <Transition name="fade">
    <div>
      <LayoutHeader :siteData="siteData" class="fixed top-0 z-50" />

      <Transition name="slide-up">
        <LayoutIntro v-if="introVisible" :siteData="siteData" />
      </Transition>

      <Transition name="slide-in">
        <div v-if="!introVisible" class="h-frame-h overflow-hidden">
          <div
            class="absolute top-0 h-frame-h"
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
            class="absolute top-0 mx-auto p-10 h-frame-h scroll-smooth transition-opacity"
            :class="{
              'overflow-hidden opacity-0': !gap.isGap,
              'overflow-y-scroll ': gap.isGap,
            }"
          >
            <div class="w-1/2 mx-auto">
              <NuxtPage />
            </div>
          </main>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
<script setup>
const { currentLang } = useLanguage();
const gap = useGapStore();
const introStore = useIntroStore();
const scrollContainer = ref(null);
const route = useRoute();
const isFirstVisit = ref(true); // Track if this is the first route in the session

// Computed property to determine if intro should be visible
const introVisible = computed(() => {
  // Show intro only if we're on home route AND it's set to be visible in the store
  return (
    introStore.isIntro &&
    (route.path === '/' || route.path === `/${currentLang}`)
  );
});

// Initialize intro visibility based on initial route
onMounted(() => {
  const isHomeRoute = route.path === '/' || route.path === `/${currentLang}`;

  // Only show intro if initial entry is on the home route
  if (!isHomeRoute) {
    introStore.setIntro(false);
  }
});

// Mouse movement threshold and tracking
let mouseMoveCounter = 0;
const mouseMoveThreshold = 10; // Number of mouse movements before hiding intro

// Mouse move handler - primary method to hide intro
const handleMouseMove = () => {
  // Only process if we're on home and intro is visible
  if (introVisible.value) {
    mouseMoveCounter++;
    console.log('Mouse moved!', mouseMoveCounter);

    // Hide intro after sufficient mouse movement
    if (mouseMoveCounter > mouseMoveThreshold) {
      introStore.setIntro(false);
      mouseMoveCounter = 0; // Reset counter
    }
  }
};

// Touch handling for swipes (as fallback for mobile)
let touchStartY = 0;
const handleTouchStart = (event) => {
  touchStartY = event.touches[0].clientY;
};

const handleTouchMove = (event) => {
  if (!touchStartY || !introVisible.value) return;

  const touchY = event.touches[0].clientY;
  const deltaY = touchStartY - touchY;

  // Only process if it's a significant movement to avoid small unintentional swipes
  if (Math.abs(deltaY) > 30) {
    introStore.setIntro(false);
    touchStartY = 0; // Reset to prevent continuous triggering
  }
};

const handleTouchEnd = () => {
  touchStartY = 0;
};

const { data: siteData } = await useFetch('/api/site', {
  server: true,
  query: {
    lang: currentLang,
  },
});

// Initialize all event listeners on mount
onMounted(() => {
  const isHomeRoute = route.path === '/' || route.path === `/${currentLang}`;

  // Only show intro if initial entry is on the home route
  if (!isHomeRoute) {
    introStore.setIntro(false);
  }

  // Add event listeners
  window.addEventListener('touchstart', handleTouchStart);
  window.addEventListener('touchmove', handleTouchMove);
  window.addEventListener('touchend', handleTouchEnd);
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchmove', handleTouchMove);
  window.removeEventListener('touchend', handleTouchEnd);
  window.removeEventListener('mousemove', handleMouseMove);
});

function handleScroll() {
  // Your existing scroll handling logic
}
</script>
<style>
body {
  @apply w-frame-w h-frame-h overflow-hidden;
}
/* Fixed fade transitions with matched durations */
.fade-enter-active {
  transition: opacity 1s ease;
}
.fade-leave-active {
  transition: opacity 1s ease;
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
.slide-up-enter-active {
  transition: transform 1s ease-out;
}
.slide-up-leave-active {
  transition: transform 1s ease-out;
  position: absolute;
  width: 100%;
}
.slide-up-enter-from {
  transform: translateY(0);
}
.slide-up-leave-to {
  transform: translateY(-100dvh);
}
/* Slide in transition for the main content */
.slide-in-enter-active {
  transition: transform 1s ease-out;
}
.slide-in-leave-active {
  transition: transform 1s ease-out;
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
