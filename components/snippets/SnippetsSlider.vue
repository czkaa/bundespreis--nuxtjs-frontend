<template>
  <div
    ref="sliderContainer"
    class="gallery-slider relative flex flex-col overflow-hidden"
  >
    <div class="grid grid-cols-1">
      <SnippetsSliderImage
        v-for="(image, index) in images"
        :key="index"
        class="relative"
        v-show="index === currentIndex"
        :class="{
          'opacity-0 pointer-events-none -z-50': index !== currentIndex,
        }"
        :imagesLength="images.length"
        :image="image"
        :index="index"
      />
    </div>
  </div>
</template>

<script setup>
const imageStore = useImageStore();
const currentIndex = ref(0); // Create a local ref or use computed to get from store

// Watch for store changes if needed
import { watch } from 'vue';
watch(
  () => imageStore.currentIndex,
  (newIndex) => {
    currentIndex.value = newIndex;
  },
  { immediate: true }
);

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const sliderContainer = ref(null);
let resizeObserver = null;

// Height calculation
const calculateHeight = () => {
  const element = sliderContainer.value;
  if (!element || !element.previousElementSibling) return;

  document.documentElement.style.setProperty(
    '--heading-h',
    `${element.previousElementSibling.offsetHeight}px`
  );
};

// Lifecycle hooks
onMounted(() => {
  nextTick(() => {
    calculateHeight();

    // Set up a single ResizeObserver for both elements
    resizeObserver = new ResizeObserver(calculateHeight);

    if (sliderContainer.value) {
      resizeObserver.observe(sliderContainer.value);

      const previousElement = sliderContainer.value.previousElementSibling;
      if (previousElement) {
        resizeObserver.observe(previousElement);
      }
    }

    window.addEventListener('resize', calculateHeight);
  });
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  window.removeEventListener('resize', calculateHeight);
});
</script>
