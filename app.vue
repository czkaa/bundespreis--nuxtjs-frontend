<template>
  {{ isHomeRoute }}
  <LayoutHeader v-if="siteData" :siteData="siteData" class="fixed top-0 z-50" />

  <Transition name="slide-up">
    <LayoutIntro v-if="introVisible" :siteData="siteData" />
  </Transition>

  <Transition name="slide-in">
    <div v-if="!introVisible" class="absolute w-full">
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
        class="scroll-smooth transition-opacity duration-500"
        :class="{ 'opacity-0': !gap.isGap }"
      >
        <div class="w-main mx-auto mb-24">
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

const { data: siteData } = await useFetch(
  () => `/api/${locale.value === 'en' ? 'en/' : ''}site`
);

const scrollPosition = ref(0); // Store the scroll position

// Computed property to determine if intro should be visible
const introVisible = computed(() => {
  return introStore.isIntro && localePath(route.path === '/');
});

// Initialize intro visibility based on initial route

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

    if (mouseMoveCounter > mouseMoveThreshold) {
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

// // Reset scroll position when route changes
// watch(
//   () => route.path,
//   () => {
//     scrollPosition.value = 0;
//     if (scrollContainer.value) {
//       scrollContainer.value.scrollTop = 0;
//     }
//   }
// );

// Initialize all event listeners on mount
onMounted(() => {
  const path = route.fullPath; // Remove hash from path
  const isHomeRoute = path === '/' || path === '/en' || path === '/de';
  if (!isHomeRoute) {
    console.log('Noo');
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
  transition: transform 2s ease-out;
}
.slide-up-leave-active {
  transition: transform 2s ease-out;
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
.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 2s ease-out;
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
