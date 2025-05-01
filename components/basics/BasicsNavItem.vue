<template>
  <span
    class="h-tag font-sans bg-black px-sm py-xs text-white text-md transition-transform duration-300 flex pointer-events-auto md:justify-center md:items-center"
  >
    {{ text }}
  </span>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  isBottom: {
    type: Boolean,
    default: false,
  },
});
</script>
