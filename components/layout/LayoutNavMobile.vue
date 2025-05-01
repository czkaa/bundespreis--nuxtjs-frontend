<template>
  <nav class="">
    <Transition name="fade">
      <div
        v-if="isMobileNav"
        class="w-screen h-screen fixed top-0 left-0 flex flex-col justify-center items-center space-y-xs pointer-events-auto"
      >
        <LayoutNavPages :siteData />
        <LayoutFooterPages :siteData />
      </div>
    </Transition>

    <button
      class="relative w-tag h-tag bg-black hidden md:block pointer-events-auto z-50"
      @click="isMobileNav = !isMobileNav"
    >
      <img src="/assets/icons/close.svg" class="w-full" v-if="isMobileNav" />
      <img src="/assets/icons/menu.svg" class="w-full" v-else />
    </button>
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
