<template>
  <span
    basics-caption
    class="w-fit block text-xs font-sans bg-black px-xs text-white transition-transform duration-300 pointer-events-auto -z-1"
    v-html="text"
  >
  </span>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<style>
[basics-caption] strong {
  @apply font-sans;
}

[basics-caption] a {
  @apply font-sans;
}

[basics-caption] a:hover {
  @apply underline;
}
</style>
