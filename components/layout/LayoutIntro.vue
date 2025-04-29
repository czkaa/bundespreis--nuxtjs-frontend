<template>
  <div
    class="pointer-events-auto snap-start w-full z-[100] transition-all duration-1000 overflow-hidden bg-white h-frame-h"
    id="intro"
  >
    <div
      class="flex flex-col items-center justify-center overflow-hidden relative [&_div]:h-full [&_figure]:h-full transition-all linear duration-intro"
      :class="
        !imageScaled ? 'w-20 h-10 p-0' : 'w-frame-w h-frame-h p-11 px-[7.6rem]'
      "
    >
      <!-- Show portrait image on mobile (below md breakpoint) -->
      <div v-if="randomPortraitImage" class="w-full h-full block md:hidden">
        <figure>
          <img
            :src="randomPortraitImage.url"
            :alt="randomPortraitImage.alt"
            :width="randomPortraitImage.width"
            :height="randomPortraitImage.height"
            class="w-full h-full object-cover"
          />
        </figure>
      </div>

      <!-- Show landscape image on md breakpoint and above -->
      <div v-if="randomLandscapeImage" class="w-full h-full hidden md:block">
        <figure>
          <img
            :src="randomLandscapeImage.url"
            :alt="randomLandscapeImage.alt"
            :width="randomLandscapeImage.width"
            :height="randomLandscapeImage.height"
            class="w-full h-full object-cover"
          />
        </figure>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

// Props
const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});

// Reactive state
const imageScaled = ref(false);
const showIntro = ref(true);
const randomPortraitImage = ref(null);
const randomLandscapeImage = ref(null);

// Computed properties
const introImages = computed(
  () => props.siteData?.introImages || { portrait: [], landscape: [] }
);

// Methods
const selectRandomImages = () => {
  const { portrait, landscape } = introImages.value;

  // Select random portrait image if available
  if (portrait && portrait.length > 0) {
    const randomIndex = Math.floor(Math.random() * portrait.length);
    randomPortraitImage.value = portrait[randomIndex];
  }

  // Select random landscape image if available
  if (landscape && landscape.length > 0) {
    const randomIndex = Math.floor(Math.random() * landscape.length);
    randomLandscapeImage.value = landscape[randomIndex];
  }
};

// Lifecycle hooks
onMounted(() => {
  // Select random images from the arrays
  selectRandomImages();

  // Start image scaling animation immediately
  setTimeout(() => {
    imageScaled.value = true;

    // Update global state (assuming you have a store or provide/inject setup)
    // This replaces the Alpine store approach
    if (
      window.$store &&
      window.$store.site &&
      typeof window.$store.site.setIsIntro === 'function'
    ) {
      window.$store.site.setIsIntro(false);
    }

    // Optional: Hide the intro component after a delay
    setTimeout(() => {
      showIntro.value = false;
    }, 1000);
  }, 100);
});
</script>
