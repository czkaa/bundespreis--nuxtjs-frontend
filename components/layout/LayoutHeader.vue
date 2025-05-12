<template>
  <header class="fixed top-0 right-0 pointer-events-none z-[100]">
    <div class="flex justify-end items-start">
      <LayoutNavDesktop :siteData :languageData class="md:hidden" />
      <LayoutNavMobile :siteData :languageData class="hidden md:flex" />
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
  languageData: {
    type: Object,
    required: true,
  },
});
</script>
