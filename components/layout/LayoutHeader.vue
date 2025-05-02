<template>
  <header class="fixed top-0 w-full h-frame-h pointer-events-none z-[100]">
    <SnippetsHomeLogo :title="siteData?.title" />
    <SnippetsHomeLogo :isTop="false" :title="siteData?.title" />

    <div class="flex justify-end items-start md:hidden transition">
      <LayoutNavDesktop
        :class="[!introStore.isDone ? '-translate-y-[150%]' : 'translate-y-0']"
        :siteData
        class="transition-transform duration-700 delay-1000 md:hidden"
      />
    </div>
    <LayoutNavMobile :siteData />
  </header>
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
