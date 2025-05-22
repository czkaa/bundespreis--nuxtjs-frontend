<template>
  <KeepAlive>
    <div
      class="flex relative z-10 overflow-x-hidden pt-offset-content pb-xs gap-xs min-h-frame-h"
    >
      <LayoutGalleryColumn :items="leftImages" :is-left="true" />
      <LayoutGalleryColumn :items="rightImages" />
    </div>
  </KeepAlive>
</template>

<script setup>
// Props
const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});

// Reactive state for shuffled images
const leftImages = ref([]);
const rightImages = ref([]);

// Shuffle function
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Initialize and shuffle images on mount
onMounted(() => {
  if (props.siteData?.galleryImages) {
    leftImages.value = shuffleArray(props.siteData.galleryImages.left || []);
    rightImages.value = shuffleArray(props.siteData.galleryImages.right || []);
  }
});
</script>
