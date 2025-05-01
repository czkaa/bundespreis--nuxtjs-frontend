<template>
  <div
    class="pointer-events-auto snap-start w-full transition-all duration-1000 overflow-hidden bg-white h-frame-h"
    id="intro"
  >
    <div
      class="flex flex-col items-center justify-center relative [&_div]:h-full [&_figure]:h-full [&_img]:object-cover [&_img]:h-full transition-all linear duration-intro"
      :class="
        !imageScaled ? 'w-20 h-10 p-0' : 'w-frame-w h-frame-h p-11 px-[7.6rem]'
      "
    >
      <!-- Show portrait image on mobile (below md breakpoint) -->
      <div
        v-if="randomPortraitImage"
        class="w-full h-full hidden md:flex justify-center items-center relative"
      >
        <BasicsImage :image="randomPortraitImage" class="relative z-10" />
        <BasicsCaption
          :text="randomPortraitImage.page.title"
          class="absolute bottom-0 right-0 transition-translate duration-300"
          :class="{ '-translate-y-full': !introStore.isDone }"
        />
      </div>

      <!-- Show landscape image on md breakpoint and above -->
      <div
        v-if="randomLandscapeImage"
        class="w-full h-full md:hidden flex justify-center items-center relative"
      >
        <BasicsImage :image="randomLandscapeImage" class="relative z-10" />
        <BasicsCaption
          :text="randomLandscapeImage.page.title"
          class="absolute bottom-0 right-0 transition-translate duration-300"
          :class="{ 'translate-y-full': introStore.isDone }"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
const introStore = useIntroStore();

// Props
const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});

// Reactive state
const imageScaled = ref(false);
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
  }, 100);
});
</script>
