<template>
  <div
    basics-text
    v-if="formattedText"
    class="text-sm"
    v-html="formattedText"
  ></div>
</template>

<script setup>
const props = defineProps({
  text: String,
});

const formattedText = computed(() => {
  return props.text ? props.text.replaceAll('<a', '<a target="_blank"') : null;
});
</script>
<style>
[basics-text] strong {
  @apply text-sm-sans font-sans;
}

[basics-text] a {
  @apply text-sm-sans font-sans;
}

[basics-text] a:hover {
  @apply underline;
}
</style>
