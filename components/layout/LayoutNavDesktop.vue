<template>
  <nav class="flex justify-end items-start gap-xs pointer-events-auto">
    <LayoutNavPages :siteData />
    <SnippetsLanguageToggle />
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
