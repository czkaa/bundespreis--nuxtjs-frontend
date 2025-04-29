<template>
  <header class="fixed top-0 w-full h-frame-h pointer-events-none z-[200]">
    <div class="flex justify-between items-start">
      <HomeLogo :title="siteData?.title || 'Home'" />

      <div class="flex justify-end items-start gap-xs">
        <LayoutNav :siteData class="sm:hidden" />
        <SnippetsLanguageToggle />
      </div>

      <LayoutNavMobile :siteData class="hidden sm:block" />
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});
</script>
