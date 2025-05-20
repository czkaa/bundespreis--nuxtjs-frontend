<template>
  <div
    ref="sliderContainer"
    class="gallery-slider relative flex flex-col overflow-hidden"
  >
    <div class="grid grid-cols-1">
      <SnippetsSliderImage
        v-for="(image, index) in images"
        class="relative"
        :class="{
          'opacity-0 pointer-events-auto -z-50':
            index !== imageStore.currentIndex,
          'z-50 oapcity-50': index === imageStore.currentIndex,
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
