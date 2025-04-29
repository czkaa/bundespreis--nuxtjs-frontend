<template>
  <nav class="flex gap-xs pointer-events-auto sm:flex-col">
    <LayoutNavPages :siteData />
  </nav>
</template>

<script setup>
const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});
</script>
