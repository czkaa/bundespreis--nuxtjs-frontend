<template>
  <figure class="block relative w-full overflow-hidden">
    <img
      :alt="image.alt"
      :width="image.width"
      :height="image.height"
      :srcset="image.srcset"
      :style="{ aspectRatio: image.ratio ? image.ratio : '' }"
      class="w-full h-auto object-contain transition-opacity duration-200 object-center"
      :class="[loaded ? 'opacity-0' : 'opacity-100']"
    />
  </figure>
</template>

<script setup>
const props = defineProps({
  image: {
    type: Object,
    required: true,
  },
});

const loaded = ref(false);
</script>
