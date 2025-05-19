<template>
  <BasicsHeading
    :kirbytext="text"
    :tag="level === 'H2' ? 'h2' : level === 'H3' ? 'h3' : 'h4'"
    :class="{
      'ml-indent-sm': indent === 'small',
      'ml-indent-md': indent === 'medium',
      'mb-md ': size === 'medium',
      'mb-sm': size === 'large',
      'mt-sm': size === 'small',
      'mt-offset-content': level === 'h2',
    }"
  />
</template>

<script setup>
const props = defineProps({
  text: String,
  indent: String,
  size: String,
  level: String,
});
</script>
