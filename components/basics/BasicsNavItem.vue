<template>
  <span
    class="h-tag font-sans bg-black px-sm py-xs text-white text-md text-center transition-transform duration-300 grid md:flex pointer-events-auto md:justify-center md:items-center"
    :class="{ '[&.router-link-active]:translate-y-full': !isBottom }"
  >
    <span class="col-start-1 row-start-1">{{ text }}</span>
    <span v-if="translation" class="col-start-1 row-start-1 invisible">{{
      translation
    }}</span>
  </span>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
  },
  isBottom: {
    type: Boolean,
    default: false,
  },
  translation: String,
});
</script>
