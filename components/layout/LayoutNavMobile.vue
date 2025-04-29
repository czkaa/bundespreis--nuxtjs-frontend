<template>
  <nav
    class="w-screen h-screen fixed top-0 flex justify-center space-y-xs pointer-events-auto"
  >
    <LayoutNavPages :siteData />
    <LayoutFooterPages :siteData />
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
