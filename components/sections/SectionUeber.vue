<template>
  <BasicsHeading tag="h3" :text="section.subheading" />
  <Blocks :blocks="section.text" />
</template>

<script setup>
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
});
</script>
