<template>
  <section blocks class="overflow-hidden">
    <BlocksIndex v-for="block in blocks" :key="block.key" :block="block" />
  </section>
</template>

<script setup>
const props = defineProps({
  blocks: Array,
  isSection: {
    type: Boolean,
    default: false,
  },
});
</script>
