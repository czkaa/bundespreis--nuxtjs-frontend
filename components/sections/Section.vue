<template>
  <section :key="section.slug" :id="section.slug">
    <Blocks :blocks="section.blocks" :isSection="true" />
  </section>
</template>

<script setup>
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
});
</script>
