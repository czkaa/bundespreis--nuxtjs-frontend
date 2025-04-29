<template>
  <span
    class="w-fit block bg-black p-3 text-white text-md transition-transform duration-300 pointer-events-auto"
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
