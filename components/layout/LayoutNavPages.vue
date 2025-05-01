<template>
  <template v-for="page in siteData?.headerPages" :key="page.uri">
    <KeepAlive>
      <NuxtLink
        :to="`${isHomePage ? '' : '/'}#${page.uri}`"
        @click="handleNavClick"
        :class="[
          'transition-transform duration-300 md:w-full',
          route.fullPath.includes(page.uri)
            ? 'translate-y-lg md:translate-y-0'
            : 'translate-y-0',
        ]"
      >
        <div
          class="absolute w-full h-lg bg-black top-0 transform -translate-y-full md:hidden"
        ></div>
        <BasicsNavItem
          :text="page.title"
          class="t-tag flex justify-end flex-col -mt-[1px]"
        />
      </NuxtLink>
    </KeepAlive>
  </template>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHashStore } from '~/stores/hash';

const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});

const route = useRoute();
const hashStore = useHashStore();

// Get current hash from the store
const currentHash = computed(() => hashStore.currentHash);

// Check if we're on the home page (/ or /en or /de)
const isHomePage = computed(() => {
  const path = route.fullPath.split('#')[0];
  return path === '/' || path === '/en' || path === '/de';
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
