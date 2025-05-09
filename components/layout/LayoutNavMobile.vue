<template>
  <nav class="gap-xs">
    <button
      class="relative w-tag h-tag bg-black pointer-events-auto z-[100]"
      @click="isMobileNav = !isMobileNav"
    >
      <img src="/assets/icons/close.svg" class="w-full" v-if="isMobileNav" />
      <img src="/assets/icons/menu.svg" class="w-full" v-else />
    </button>

    <!-- WHY DOES THIS NEED A WRAPPER -->
    <div class="w-tag h-tag bg-black">
      <SnippetsLanguageToggle />
    </div>

    <Teleport to="#teleports">
      <Transition name="fade">
        <div
          @click="isMobileNav = false"
          v-if="isMobileNav"
          class="w-fit h-fit fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 md:flex flex-col justify-center items-stretch space-y-xs pointer-events-auto z-[100] hidden"
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
