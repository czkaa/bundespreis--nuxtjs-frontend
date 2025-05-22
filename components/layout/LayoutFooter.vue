<template>
  <footer
    class="footer z-50 pointer-events-auto h-tag sm:h-auto overflow-hidden flex justify-start items-end gap-2"
  >
    <LayoutFooterPages :siteData="siteData" />
  </footer>
</template>

<script setup>
const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});
</script>
