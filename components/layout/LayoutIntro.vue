<template>
  <div
    class="w-full overflow-hidden bg-white h-frame-h flex flex-col items-center justify-center"
  >
    <div
      class="relative [&_div]:h-full [&_figure]:h-full [&_img]:object-cover [&_img]:h-full transition-transform ease-linear duration-intro w-frame-w h-frame-h py-tag md:py-logotype px-[11.4rem] md:px-sm"
      :class="!startScale ? 'scale-[9.8%]' : 'scale-100'"
    >
      <!-- Show portrait image on mobile (below md breakpoint) -->
      <div
        v-if="randomPortraitImage"
        class="w-full h-full hidden md:flex justify-center items-center relative"
      >
        <BasicsIntroImage
          @loaded="startIntro"
          :image="randomPortraitImage"
          class="relative z-10 [&>img]:h-full [&>img]:w-full flex justify-center"
        />
      </div>

      <!-- Show landscape image on md breakpoint and above -->
      <div
        v-if="randomLandscapeImage"
        class="w-full h-full md:hidden flex justify-center items-center relative"
      >
        <BasicsIntroImage
          @loaded="startIntro"
          :image="randomLandscapeImage"
          class="relative z-10 [&>img]:h-auto [&>img]:w-full flex justify-center"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
const introStore = useIntroStore();

const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});

const startScale = ref(false);
const randomPortraitImage = ref(null);
const randomLandscapeImage = ref(null);

// Event tracking variables
let interactionCounter = 0;
const interactionThreshold = 5; // Lower threshold for multiple types of interactions
let lastScrollPosition = 0;
let scrollTimeout = null;

const introImages = computed(
  () => props.siteData?.introImages || { portrait: [], landscape: [] }
);

const selectRandomImages = () => {
  const { portrait, landscape } = introImages.value;

  if (portrait && portrait.length > 0) {
    const randomIndex = Math.floor(Math.random() * portrait.length);
    randomPortraitImage.value = portrait[randomIndex];
  }

  if (landscape && landscape.length > 0) {
    const randomIndex = Math.floor(Math.random() * landscape.length);
    randomLandscapeImage.value = landscape[randomIndex];
  }
};

// Unified handler for all interactions
const handleInteraction = (event) => {
  interactionCounter++;

  if (interactionCounter > interactionThreshold) {
    introStore.setDone(true);
    removeAllEventListeners();
  }
};

// Specific handler for scroll events to prevent too many firings
const handleScroll = () => {
  const currentScrollPosition = window.scrollY;

  // Only count as interaction if meaningful scroll occurred
  if (Math.abs(currentScrollPosition - lastScrollPosition) > 10) {
    interactionCounter++;
    lastScrollPosition = currentScrollPosition;

    if (interactionCounter > interactionThreshold) {
      introStore.setDone(true);
      removeAllEventListeners();
    }
  }

  // Debounce scroll events
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  scrollTimeout = setTimeout(() => {
    lastScrollPosition = window.scrollY;
  }, 100);
};

// Clean up function to remove all event listeners
const removeAllEventListeners = () => {
  window.removeEventListener('mousemove', handleInteraction);
  window.removeEventListener('touchstart', handleInteraction);
  window.removeEventListener('touchmove', handleInteraction);
  window.removeEventListener('scroll', handleScroll);
};

onMounted(() => {
  selectRandomImages();
});

onUnmounted(() => {
  removeAllEventListeners();
});

const startIntro = () => {
  if (startScale.value) return;

  setTimeout(() => {
    startScale.value = true;

    setTimeout(() => {
      introStore.setScaled(true);

      window.addEventListener('mousemove', handleInteraction);
      window.addEventListener('touchstart', handleInteraction);
      window.addEventListener('touchmove', handleInteraction);
      window.addEventListener('scroll', handleScroll);

      lastScrollPosition = window.scrollY;
    }, 3000);
  }, 1000);
};
</script>
