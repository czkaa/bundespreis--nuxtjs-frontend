<template>
  <figure class="block relative w-full overflow-hidden">
    <img
      v-if="loaded"
      :alt="image.alt"
      :width="image.width"
      :height="image.height"
      :srcset="image.srcset"
      :style="{ aspectRatio: image.ratio ? image.ratio : '' }"
      class="w-full h-auto object-contain transition-opacity duration-200 object-center"
      :class="[isLoaded ? 'opacity-100' : 'opacity-0']"
      @load="handleImageLoad"
    />
    <div
      v-else
      ref="observerTarget"
      :style="{
        height: image.height ? `${image.height}px` : '200px',
        width: '100%',
        aspectRatio: image.ratio || undefined,
      }"
    ></div>
  </figure>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
  caption: {
    type: String,
    default: '',
  },
  offset: {
    type: Number,
    default: 2000, // 1000px offset by default
  },
});

const observerTarget = ref(null);
const loaded = ref(false);
const isLoaded = ref(false);
let observer = null;

function handleImageLoad() {
  isLoaded.value = true;
}

onMounted(() => {
  // Skip in SSR
  if (typeof window === 'undefined') {
    loaded.value = true;
    return;
  }

  // Use explicit pixel value for offset
  const pixelOffset = props.offset + 'px';

  // Create observer with a fixed distance of 1000px (or custom value)
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loaded.value = true;
        if (observer) {
          observer.disconnect();
          observer = null;
        }
      }
    },
    {
      rootMargin: `${pixelOffset} 0px ${pixelOffset} 0px`, // Apply offset to top and bottom
      threshold: 0,
    }
  );

  // Start observing as soon as the component is mounted
  if (observerTarget.value) {
    observer.observe(observerTarget.value);
  } else {
    // Fallback
    loaded.value = true;
  }
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});
</script>
