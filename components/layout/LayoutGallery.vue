<template>
  <KeepAlive>
    <div class="flex relative z-10 overflow-x-hidden pt-20">
      <LayoutGalleryColumn :items="leftImages" :is-left="true" />
      <LayoutGalleryColumn :items="rightImages" />
    </div>
  </KeepAlive>
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
const galleryImages = ref([]);

// Computed properties for the two columns
const leftImages = computed(() => {
  const half = Math.ceil(galleryImages.value.length / 2);
  return galleryImages.value.slice(0, half);
});

const rightImages = computed(() => {
  const half = Math.ceil(galleryImages.value.length / 2);
  return galleryImages.value.slice(half);
});

// Initialize and shuffle images
onMounted(() => {
  // Get the gallery images from siteData
  if (props.siteData && props.siteData.galleryImages) {
    // Clone the array to avoid mutation issues
    const images = [...props.siteData.galleryImages];

    // Shuffle the array
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }

    galleryImages.value = images;
  }
});
</script>
