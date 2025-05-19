<template>
  <figure class="block relative w-full overflow-hidden">
    <img
      :alt="image.alt"
      :width="image.width"
      :height="image.height"
      :srcset="image.srcsetIntro"
      :style="{ aspectRatio: image.ratio ? image.ratio : '' }"
      class="w-full h-full object-cover transition-opacity duration-200 object-center relative z-10"
      :class="[imageIsLoaded ? 'opacity-100' : 'opacity-0']"
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

const emit = defineEmits(['imageLoaded']);
const imageIsLoaded = ref(false);

function handleImageLoad() {
  imageIsLoaded.value = true;
  emit('imageLoaded', props.image);
}
</script>
