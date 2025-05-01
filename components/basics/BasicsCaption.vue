<template>
  <span
    class="w-fit block text-xs font-sans bg-black px-xs text-white transition-transform duration-300 pointer-events-auto"
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
