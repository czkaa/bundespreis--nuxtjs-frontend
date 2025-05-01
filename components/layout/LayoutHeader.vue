<template>
  <header class="fixed top-0 w-full h-frame-h pointer-events-none z-[100]">
    <div class="flex justify-between items-start">
      <HomeLogo :title="siteData?.title || 'Home'" />

      <div
        class="flex justify-end items-start gap-xs transition-transform duration-500 delay-1000"
        :class="[
          introStore.isIntro
            ? '-translate-y-full md:translate-y-0'
            : 'translate-y-0',
        ]"
      >
        <LayoutNavDesktop :siteData class="md:hidden" />

        <SnippetsLanguageToggle />

        <LayoutNavMobile :siteData class="hidden md:block" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useIntroStore } from '~/stores/intro';
const introStore = useIntroStore();
const gap = useGapStore();
const showMobileNav = ref(false);

const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});
</script>
