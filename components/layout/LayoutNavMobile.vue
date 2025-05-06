<template>
  <nav class="gap-xs">
    <button
      class="relative w-tag h-tag bg-black pointer-events-auto z-[100]"
      @click="isMobileNav = !isMobileNav"
    >
      <img src="/assets/icons/close.svg" class="w-full" v-if="isMobileNav" />
      <img src="/assets/icons/menu.svg" class="w-full" v-else />
    </button>

    <SnippetsLanguageToggle />

    <Teleport to="#teleports">
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
    </Teleport>
  </nav>
</template>

<script setup>
const isMobileNav = ref(false);

const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});
</script>
