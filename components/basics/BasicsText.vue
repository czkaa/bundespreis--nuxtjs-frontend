<template>
  <div
    basics-text
    v-if="formattedText"
    :class="{
      'text-xs font-sans [&_strong]:!text-xs [&_a]:!text-xs': size === 'xs',
      'text-sm font-serif': size === 'sm',
    }"
    v-html="formattedText"
  ></div>
</template>

<script setup>
const props = defineProps({
  text: String,
  size: {
    type: String,
    default: 'sm',
  },
});

const formattedText = computed(() => {
  return props.text ? props.text.replaceAll('<a', '<a target="_blank"') : null;
});
</script>
<style>
[basics-text] strong {
  @apply text-sm-sans font-sans font-medium;
}

[basics-text] a {
  @apply text-sm-sans font-sans;
}

[basics-text] a:hover {
  @apply underline;
}
</style>
