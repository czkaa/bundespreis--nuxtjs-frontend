<template>
  <span
    class="h-tag font-sans bg-black px-sm text-white text-md transition-transform duration-300 flex justify-center items-center pointer-events-auto"
  >
    {{ text }}</span
  >
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>
