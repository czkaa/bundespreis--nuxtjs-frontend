<template>
  <BasicsHeading ag="h3" :text="section.addressTitle" />
  <Blocks :blocks="section.address" />

  <BasicsHeading ag="h3" :text="section.openingTitle" />
  <Blocks :blocks="section.opening" />

  <BasicsHeading tag="h3" :text="section.hoursTitle" />
  <Blocks :blocks="section.hours" />
</template>

<script setup>
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
});
</script>
