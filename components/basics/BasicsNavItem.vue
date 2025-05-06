<template>
  <span
    class="h-tag font-sans bg-black px-sm py-xs text-white text-md transition-transform duration-300 flex pointer-events-auto md:justify-center md:items-center"
    :class="{ '[&.router-link-active]:translate-y-full': !isBottom }"
  >
    {{ text }}
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
