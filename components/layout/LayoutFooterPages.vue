<template>
  <template v-for="page in siteData?.footerPages" :key="page.uri">
    <!-- Use anchor links on home page with active state, NuxtLink elsewhere -->

    <NuxtLink
      :to="`${isInfoPage ? '' : '/'}info#${page.uri}`"
      @click="handleNavClick"
      class="md:w-full"
    >
      <BasicsNavItem :text="page.title" class="items-end" />
    </NuxtLink>
  </template>
</template>

<script setup>
const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});

const route = useRoute();
const { currentLang } = useLanguage();
const hashStore = useHashStore();

// Get current hash from the store
const currentHash = computed(() => hashStore.currentHash);

// Check if we're on the home page (/ or /en or /de)
const isInfoPage = computed(() => {
  return (
    route.path === '/info' ||
    route.path === `/info/${currentLang.value}` ||
    route.path === `/info/${currentLang.value}/`
  );
});

// Get the appropriate home path based on currentLang
const homePath = computed(() => {
  return currentLang.value;
});

// Handle navigation click - set isBlocked to true, then false after 1000ms
const handleNavClick = (hash) => {
  hashStore.setBlocked(true);
  hashStore.setCurrentHash(hash);

  setTimeout(() => {
    hashStore.setBlocked(false);
  }, 1000);
};
</script>
