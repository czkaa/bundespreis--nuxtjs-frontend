<template>
  <section blocks>
    <BlocksIndex v-for="block in blocks" :key="block.key" :block="block" />
  </section>
</template>

<script setup>
const props = defineProps({
  blocks: Array,
});
</script>
