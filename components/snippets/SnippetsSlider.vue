<template>
  <div class="gallery-slider relative">
    <div class="h-[50vh] flex flex-col justify-center overflow-hidden">
      <transition name="slide-fade" mode="out-in">
        <div
          :key="currentIndex"
          class="grid w-[max-content] max-w-full mx-auto [&_img]:h-full overflow-hidden"
        >
          <BasicsImage :image="currentImage" />
          <div class="flex overflow-hidden justify-between items-start gap-xs">
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
      </transition>
    </div>

    <!-- Invisible click regions for touch/mobile navigation -->
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
      aria-label="Next image"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
const imageStore = useImageStore();

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const currentIndex = ref(imageStore.currentIndex);

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
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}
</style>
