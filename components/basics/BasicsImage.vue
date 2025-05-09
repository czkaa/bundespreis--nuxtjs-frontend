<template>
  <img
    :src="isVisible ? image.url : ''"
    :alt="image.alt"
    :width="image.width"
    :height="image.height"
    :srcset="isVisible ? image.srcset : ''"
    :style="{ aspectRatio: image.ratio ? image.ratio : '' }"
    class="w-full h-auto object-contain transition-opacity duration-100"
    :class="{ 'opacity-100': isLoaded, 'opacity-0': !isLoaded }"
    @load="isLoaded = true"
    ref="imageRef"
  />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
  offset: {
    type: String,
    default: '600px',
  },
});

const imageRef = ref(null);
const isVisible = ref(false);
const isLoaded = ref(false);
let observer = null;

onMounted(() => {
  if (process.client) {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          isVisible.value = true;
          observer.disconnect();
        }
      },
      {
        rootMargin: `${props.offset} 0px 0px 0px`,
      }
    );

    if (imageRef.value) observer.observe(imageRef.value);
  } else {
    // Server-side or no IntersectionObserver
    isVisible.value = true;
  }
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>
