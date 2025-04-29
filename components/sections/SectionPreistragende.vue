<template>
  <ul class="space-y-xs">
    <li v-for="child in section.children">
      <NuxtLink :to="child.uri"> <BasicsTag :text="child.title" /></NuxtLink>
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
