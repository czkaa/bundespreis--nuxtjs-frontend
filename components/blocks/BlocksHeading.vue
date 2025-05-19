<template>
  <BasicsHeading
    :kirbytext="text"
    :tag="level === 'h2' ? 'h2' : level === 'h3' ? 'h3' : 'h4'"
    :size="size"
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
