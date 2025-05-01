<template>
  <figure class="relative w-full overflow-hidden">
    <img
      :src="image.url"
      :alt="image.alt || image.page?.title"
      :width="image.width"
      :height="image.height"
      class="w-full h-auto object-contain"
    />
  </figure>
</template>

<script setup>
// Props
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
</script>
