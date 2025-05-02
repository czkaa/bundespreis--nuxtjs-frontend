<template>
  <span
    class="h-tag font-sans bg-black px-md py-xs text-white text-md transition-transform duration-300 flex pointer-events-auto md:justify-center md:items-center"
  >
    <template v-if="text">{{ text }}</template>
    <slot v-else></slot>
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
});
</script>
