<template>
  <figure ref="imageRef" class="block relative w-full overflow-hidden">
    <img
      :alt="image.alt"
      :width="image.width"
      :height="image.height"
      :srcset="isNearViewport ? image.srcset : ''"
      :style="{ aspectRatio: image.ratio ? image.ratio : '' }"
      class="w-full h-auto object-contain transition-opacity duration-200 object-center"
      :class="[isNearViewport && loaded ? 'opacity-100' : 'opacity-0']"
      @load="loaded = true"
    />
  </figure>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import throttle from 'lodash.throttle';

const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
});

const imageRef = ref(null);
const loaded = ref(false);
const isNearViewport = ref(false);
const THRESHOLD = 2000;
let galleryContainer = null;

function checkPosition() {
  if (!imageRef.value || !galleryContainer) return;

  const rect = imageRef.value.getBoundingClientRect();
  const containerRect = galleryContainer.getBoundingClientRect();

  isNearViewport.value =
    rect.bottom >= containerRect.top - THRESHOLD &&
    rect.top <= containerRect.bottom + THRESHOLD &&
    rect.right >= containerRect.left - THRESHOLD &&
    rect.left <= containerRect.right + THRESHOLD;

  if (isNearViewport.value) {
    console.log('Loading i mage at' + rect.top);
  }
}

// Create a throttled version of checkPosition that runs at most every 200ms
const throttledCheckPosition = throttle(checkPosition, 200);

onMounted(() => {
  // Get the specific gallery container
  galleryContainer = document.getElementById('galleryContainer');

  if (galleryContainer) {
    // Initial check (use the non-throttled version for immediate check)
    checkPosition();

    // Add scroll event listener with throttled function
    galleryContainer.addEventListener('scroll', throttledCheckPosition, {
      passive: true,
    });

    // Also use throttled function for resize
    window.addEventListener('resize', throttledCheckPosition, {
      passive: true,
    });
  }
});

onBeforeUnmount(() => {
  // Cancel any pending throttled calls
  throttledCheckPosition.cancel();

  // Clean up event listeners
  if (galleryContainer) {
    galleryContainer.removeEventListener('scroll', throttledCheckPosition);
  }
  window.removeEventListener('resize', throttledCheckPosition);
});
</script>
