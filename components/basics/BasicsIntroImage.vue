<template>
  <figure class="block relative w-full overflow-hidden">
    <img
      :src="image.thumb"
      :width="image.width"
      :height="image.height"
      :style="{ aspectRatio: image.ratio ? image.ratio : '' }"
      class="absolute w-full h-full object-cover transition-opacity duration-200 object-center"
      :class="[thumbIsLoaded ? 'opacity-100' : 'opacity-0']"
      @load="thumbIsLoaded = true"
    />
    <img
      :alt="image.alt"
      :width="image.width"
      :height="image.height"
      :srcset="image.srcsetIntro"
      :style="{ aspectRatio: image.ratio ? image.ratio : '' }"
      class="w-full h-full object-cover transition-opacity duration-100 object-center relative z-10"
      :class="[imageIsLoaded ? 'opacity-100' : 'opacity-0']"
      @load="imageIsLoaded = true"
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

const imageIsLoaded = ref(false);
const thumbIsLoaded = ref(false);
</script>
