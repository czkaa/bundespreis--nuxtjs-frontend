<template>
  <div>
    <BasicsHeading tag="h4" :text="section.addressTitle" />
    <Blocks :blocks="section.address" />
  </div>

  <div>
    <BasicsHeading tag="h4" :text="section.openingTitle" />
    <Blocks :blocks="section.opening" />
  </div>

  <div>
    <BasicsHeading tag="h4" :text="section.hoursTitle" />
    <Blocks :blocks="section.hours" />
  </div>
</template>

<script setup>
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
});
</script>
