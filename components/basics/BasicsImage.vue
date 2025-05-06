<template>
  <figure class="block relative w-full overflow-hidden">
    <img
      :src="image.url"
      :alt="image.alt || image.page?.title"
      :width="image.width"
      :height="image.height"
      :style="{ aspectRatio: image.ratio ? image.ratio : '' }"
      class="w-full h-auto object-contain"
      :class="['transition-opacity duration-300 opject-center']"
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
