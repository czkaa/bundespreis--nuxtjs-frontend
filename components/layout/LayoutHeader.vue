<template>
  <header class="fixed top-0 w-full h-frame-h pointer-events-none z-[100]">
    <SnippetsHomeLogo :title="siteData?.title" />
    <SnippetsHomeLogo :isTop="false" :title="siteData?.title" />

    <div class="flex justify-end items-start md:hidden">
      <div
        :class="[introStore.isIntro ? '-translate-y-full' : 'translate-y-0']"
      >
        <LayoutNavDesktop
          :siteData
          class="transition-transform duration-500 delay-1000 md:hidden"
        />
      </div>
    </div>
  </header>
  <LayoutNavMobile :siteData />
</template>

<script setup>
import { useIntroStore } from '~/stores/intro';
const introStore = useIntroStore();

const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});
</script>
