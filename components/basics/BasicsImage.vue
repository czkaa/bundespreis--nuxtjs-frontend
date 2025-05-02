<template>
  <figure class="relative w-full overflow-hidden">
    <img
      :src="image.url"
      :alt="image.alt || image.page?.title"
      :width="image.width"
      :height="image.height"
      class="w-full h-auto object-contain"
      :class="[
        'transition-opacity duration-300 opject-center',
        isLoaded ? 'opacity-100' : 'opacity-0',
      ]"
      :style="{ aspectRatio: image.ratio }"
      loading="lazy"
      @load="handleImageLoad"
    />
  </figure>
</template>

<script setup>
const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
  caption: {
    type: String,
    default: '',
  },
});

const isLoaded = ref(false);

function handleImageLoad() {
  isLoaded.value = true;
}
</script>
