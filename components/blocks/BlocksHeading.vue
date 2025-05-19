<template>
  <BasicsHeading
    :kirbytext="text"
    :tag="level === 'large' ? 'h2' : level === 'medium' ? 'h3' : 'h4'"
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
