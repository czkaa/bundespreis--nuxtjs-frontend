<template>
  <nav class="flex justify-end items-start gap-xs pointer-events-auto">
    <LayoutNavPages :siteData />
    <div class="w-tag h-tag shrink-0 bg-black">
      <SnippetsLanguageToggle />
    </div>
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
