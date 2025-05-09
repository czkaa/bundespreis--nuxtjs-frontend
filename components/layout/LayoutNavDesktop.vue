<template>
  <nav class="flex justify-end items-start gap-xs pointer-events-auto">
    <LayoutNavPages :siteData />

    <!-- WHY DOES THIS NEED A WRAPPER -->
    <div class="w-tag h-tag bg-black">
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
