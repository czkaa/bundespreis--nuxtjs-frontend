<template>
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
