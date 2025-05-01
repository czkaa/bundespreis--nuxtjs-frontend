<template>
  <nav class="hidden md:block">
    <Transition name="fade">
      <div
        @click="isMobileNav = false"
        v-if="isMobileNav"
        class="w-full h-fit fixed top-1/2 left-0 flex flex-col justify-center items-center space-y-xs pointer-events-auto z-[100] md:grid md:justify-items-center md:justify-content-center -translate-y-1/2"
      >
        <LayoutNavPages :siteData />
        <LayoutFooterPages :siteData />
      </div>
    </Transition>

    <div
      class="fixed top-0 right-0 z-[100] transition-transform duration-500 delay-1000 flex gap-xs"
      :class="[!introStore.isDone ? '-translate-y-full' : 'translate-y-0']"
    >
      <button
        class="relative w-tag h-tag bg-black pointer-events-auto z-[100]"
        @click="isMobileNav = !isMobileNav"
      >
        <img src="/assets/icons/close.svg" class="w-full" v-if="isMobileNav" />
        <img src="/assets/icons/menu.svg" class="w-full" v-else />
      </button>

      <SnippetsLanguageToggle />
    </div>
  </nav>
</template>

<script setup>
const isMobileNav = ref(false);
import { useIntroStore } from '~/stores/intro';
const introStore = useIntroStore();

const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});
</script>
