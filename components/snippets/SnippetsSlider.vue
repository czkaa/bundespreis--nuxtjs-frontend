<template>
  <div class="gallery-slider relative">
    <!-- Image slides -->
    <div class="h-[70vh] flex flex-col justify-center">
      <transition name="slide-fade" mode="out-in">
        <div
          :key="currentIndex"
          class="flex flex-col justify-center items-center"
        >
          <img
            :src="currentImage.url"
            :srcset="currentImage.srcset"
            sizes="(max-width: 768px) 100vw, 80vw"
            :alt="currentImage.alt || ''"
            class="max-h-full w-auto object-contain"
            :loading="currentIndex === 0 ? 'eager' : 'lazy'"
          />
          <div
            v-if="currentImage.caption"
            class="caption mt-2 text-center text-sm text-gray-600"
          >
            {{ currentImage.caption }}
          </div>
        </div>
      </transition>
    </div>

    <!-- Navigation arrows for larger screens -->
    <button
      v-if="images.length > 1"
      @click="prevImage"
      class="hidden md:flex absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 z-20"
      aria-label="Previous image"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <button
      v-if="images.length > 1"
      @click="nextImage"
      class="hidden md:flex absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 rounded-full p-2 z-20"
      aria-label="Next image"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>

    <!-- Invisible click regions for touch/mobile navigation -->
    <div
      v-if="images.length > 1"
      @click="prevImage"
      class="absolute left-0 top-0 w-1/2 h-full z-10 cursor-w-resize md:cursor-default"
      aria-label="Previous image"
    ></div>

    <div
      v-if="images.length > 1"
      @click="nextImage"
      class="absolute right-0 top-0 w-1/2 h-full z-10 cursor-e-resize md:cursor-default"
      aria-label="Next image"
    ></div>

    <!-- Pagination indicators -->
    <div
      v-if="images.length > 1"
      class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20"
    >
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="currentIndex = index"
        :class="[
          'w-2 h-2 rounded-full transition-all',
          currentIndex === index ? 'bg-white scale-125' : 'bg-white/50',
        ]"
        :aria-label="`Go to image ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const currentIndex = ref(0);

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
