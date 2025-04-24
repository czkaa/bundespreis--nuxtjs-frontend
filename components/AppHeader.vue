<template>
  <header class="py-4 border-b border-secondary-200">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center">
        <NuxtLink
          :to="localePath('/')"
          class="font-semibold text-xl text-primary-800 hover:text-primary-600 transition duration-200"
        >
          Charlotte Rohde
        </NuxtLink>

        <nav class="flex items-center space-x-6">
          <NuxtLink
            :to="localePath('/')"
            class="text-secondary-700 hover:text-primary-600 transition duration-200"
            :class="{
              'text-primary-600': route.path === '/' || route.path === '/en',
            }"
          >
            {{ $t('navigation.home') }}
          </NuxtLink>

          <template v-if="footerPages && footerPages.length > 0">
            <NuxtLink
              v-for="page in footerPages"
              :key="page.uri"
              :to="localePath(`/${page.uri}`)"
              class="text-secondary-700 hover:text-primary-600 transition duration-200"
              :class="{ 'text-primary-600': route.path.includes(page.uri) }"
            >
              {{ page.title }}
            </NuxtLink>
          </template>

          <div class="flex gap-2">
            <!-- Using regular <a> tags with full URLs to force page reload -->
            <a
              :href="fullPathForLocale('de')"
              class="px-3 py-1 rounded transition-colors"
              :class="locale === 'de' ? 'bg-gray-200' : 'hover:bg-gray-100'"
            >
              DE
            </a>
            <a
              :href="fullPathForLocale('en')"
              class="px-3 py-1 rounded transition-colors"
              :class="locale === 'en' ? 'bg-gray-200' : 'hover:bg-gray-100'"
            >
              EN
            </a>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

// Use the global state from the plugin
const { $siteData } = useNuxtApp();
const footerPages = computed(() => $siteData.footerPages.value);

// Function to generate full absolute URL paths for language switching
// This forces a full page reload and avoids client-side navigation issues
function fullPathForLocale(localeCode) {
  const path = switchLocalePath(localeCode);
  // If we're in the browser, return the full URL
  if (process.client) {
    const origin = window.location.origin;
    return `${origin}${path}`;
  }
  // During SSR, just return the path
  return path;
}
</script>
