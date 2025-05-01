<template>
  <nav
    class="flex justify-end items-start gap-xs transition-transform duration-500 delay-1000 pointer-events-auto"
  >
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
