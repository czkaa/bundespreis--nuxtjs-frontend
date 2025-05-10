<template>
  <div
    ref="sliderContainer"
    class="gallery-slider relative flex flex-col overflow-hidden"
  >
    <div class="grid grid-cols-1">
      <div
        v-for="(image, index) in images"
        :style="{ aspectRatio: image.ratio }"
        class="row-start-1 col-start-1 flex flex-col h-full max-w-full max-h-remaining-content overflow-hidden relative"
        :class="{ 'opacity-0': index !== currentIndex }"
      >
        <div class="flex flex-col items-center min-h-0">
          <BasicsImage
            :image="image"
            class="[&_img]:max-h-remaining-content [&_img]:object-contain [&_img]:block"
          />
          <div
            class="flex overflow-hidden justify-between items-start gap-xs shrink-0 w-full"
          >
            <BasicsText
              :text="currentImage.caption"
              class="text-xs font-sans mt-0.5"
            />
            <BasicsCaption
              :text="`${currentIndex + 1}/${images.length}`"
              class="ml-auto shrink-0 pt-0.5"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="images.length > 1"
      @click="prevImage"
      class="absolute left-0 top-0 w-1/2 h-full cursor-w-resize md:cursor-default"
      aria-label="Previous image"
    ></div>

    <div
      v-if="images.length > 1"
      @click="nextImage"
      class="absolute right-0 top-0 w-1/2 h-full cursor-e-resize md:cursor-default"
    ></div>
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

const currentIndex = ref(imageStore.currentIndex);
const sliderContainer = ref(null);
let resizeObserver = null;

// Watch for changes in the image store's currentIndex
watch(
  () => imageStore.currentIndex,
  (newIndex) => {
    currentIndex.value = newIndex;
  }
);

// Also update the image store when this component changes the index
watch(currentIndex, (newIndex) => {
  if (imageStore.currentIndex !== newIndex) {
    imageStore.setCurrentIndex(newIndex);
  }
});

const currentImage = computed(() => {
  return props.images[currentIndex.value] || {};
});

function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
}

function prevImage() {
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length;
}

// Calculate height based on the previous element
function calculateHeight() {
  if (!sliderContainer.value) return;

  // Get the previous element (sibling that comes before the slider)
  const previousElement = sliderContainer.value.previousElementSibling;

  if (!previousElement) return;

  // Get the height of the previous element
  const previousElementHeight = previousElement.offsetHeight;

  // Update the CSS variable
  document.documentElement.style.setProperty(
    '--heading-h',
    `${previousElementHeight}px`
  );
}

onMounted(() => {
  // Wait for next tick to ensure DOM is rendered
  nextTick(() => {
    // Initial calculation
    calculateHeight();

    // Set up resize observer on the previous element if it exists
    const previousElement = sliderContainer.value?.previousElementSibling;

    if (previousElement) {
      resizeObserver = new ResizeObserver(() => {
        calculateHeight();
      });

      resizeObserver.observe(previousElement);
    }

    // Also observe the slider container itself
    if (sliderContainer.value) {
      if (!resizeObserver) {
        resizeObserver = new ResizeObserver(() => {
          calculateHeight();
        });
      }
      resizeObserver.observe(sliderContainer.value);
    }

    // Listen for window resize
    window.addEventListener('resize', calculateHeight);
  });
});

onUnmounted(() => {
  // Clean up
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  window.removeEventListener('resize', calculateHeight);
});
</script>
