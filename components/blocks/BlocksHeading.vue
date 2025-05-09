<template>
  <BasicsHeading
    :text="text"
    :tag="level === 'large' ? 'h2' : level === 'medium' ? 'h3' : 'h4'"
    :class="{
      'ml-indent-sm': indent === 'small',
      'ml-indent-md': indent === 'medium',
      'mb-md ': level === 'medium',
      'mb-sm ': level === 'large',
      'mt-sm': level === 'small',
    }"
  />
</template>

<script setup>
const props = defineProps({
  text: String,
  indent: String,
  level: String,
});
</script>
