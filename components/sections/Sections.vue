<template>
  <div class="space-y-sm">
    <section v-for="section in sections">
      <Blocks :blocks="section.blocks" />
    </section>
  </div>
</template>

<script setup>
const props = defineProps({
  sections: {
    type: Object,
    required: true,
  },
});
</script>
