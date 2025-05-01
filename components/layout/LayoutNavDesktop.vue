<template>
  <nav
    class="flex gap-xs pointer-events-auto transition-transform duration-300 delay-700"
  >
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
