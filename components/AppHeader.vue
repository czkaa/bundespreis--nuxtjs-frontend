<template>
  <header class="bg-white shadow-sm">
    <div
      class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 flex justify-between items-center"
    >
      <div class="flex items-center space-x-8">
        <HomeLogo :title="siteData?.title || 'Home'" />
        <nav class="flex items-center space-x-6">
          <NuxtLink
            v-for="page in siteData?.headerPages"
            :key="page.uri"
            :to="`/${page.uri}`"
            class="text-gray-600 hover:text-gray-900 transition-colors"
          >
            {{ page.title }}
          </NuxtLink>
        </nav>
      </div>
      <div class="flex items-center space-x-3">
        <button
          @click="gap.toggle()"
          class="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          Gap {{ gap.isEnabled ? 'On' : 'Off' }}
        </button>
        <button
          @click="toggleLanguage"
          class="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {{ currentLang.toUpperCase() }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const gap = useGapStore();

const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});
</script>
