<template>
  <Blocks :blocks="section.text" />

  <ul>
    <li v-for="nominee in section.nominees">
      <BasicsText :text="nominee.name" />
      <BasicsText :text="nominee.university" />
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
});
</script>
