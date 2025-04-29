<template>
  <template v-for="page in siteData?.headerPages" :key="page.uri">
    <!-- Use anchor links on home page with active state, NuxtLink elsewhere -->
    <a
      v-if="isHomePage"
      :href="`#${page.uri}`"
      :class="[
        'transition-transform duration-300',
        currentHash === page.uri ? 'translate-y-1/2 sm:tanslate-y-0' : '',
      ]"
      @click="handleNavClick(page.uri)"
    >
      <BasicsTag :text="page.title" />
    </a>
    <NuxtLink v-else :to="`/${homePath}#${page.uri}`" @click="handleNavClick">
      <BasicsTag :text="page.title" />
    </NuxtLink>
  </template>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useLanguage } from '~/composables/useLanguage';
import { useHashStore } from '~/stores/hash';

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
const isHomePage = computed(() => {
  return (
    route.path === '/' ||
    route.path === `/${currentLang.value}` ||
    route.path === `/${currentLang.value}/`
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
