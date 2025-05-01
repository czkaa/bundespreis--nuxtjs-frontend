<template>
  <BasicsHeading tag="h3" :text="section.subheading" class="ml-indent-sm" />
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
