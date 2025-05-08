<template>
  <figure class="block relative w-full overflow-hidden">
    <img
      :src="image.url"
      :alt="image.alt"
      :width="image.width"
      :height="image.height"
      :src-set="image.srcset"
      :style="{ aspectRatio: image.ratio ? image.ratio : '' }"
      class="w-full h-full object-cover transition-opacity duration-200 object-center ease-linear"
      :class="[isLoaded ? 'opacity-100' : 'opacity-0']"
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

const emit = defineEmits(['loaded']);

function handleImageLoad() {
  isLoaded.value = true;
  emit('loaded', true);
}
</script>
