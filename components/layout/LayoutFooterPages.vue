<template>
  <template v-for="page in siteData?.footerPages" :key="page.uri">
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
const hashStore = useHashStore();
const localePath = useLocalePath();

// Get current hash from the store
const currentHash = computed(() => hashStore.currentHash);

// Check if we're on the home page (/ or /en or /de)
const isInfoPage = computed(() => {
  const path = route.fullPath.split('#')[0];
  return path === '/info' || path === '/en/info' || path === '/de/info';
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
