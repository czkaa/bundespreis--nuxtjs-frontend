<template>
  <div>
    <header class="py-4 border-b border-secondary-200">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center">
          <NuxtLink
            to="/"
            class="font-semibold text-xl text-primary-800 hover:text-primary-600 transition duration-200"
          >
            Page Title
          </NuxtLink>

          <nav class="flex items-center space-x-6">
            <NuxtLink
              to="/"
              class="text-secondary-700 hover:text-primary-600 transition duration-200"
              :class="{
                'text-primary-600':
                  route.path === '/' ||
                  route.path === '/de' ||
                  route.path === '/en',
              }"
            >
              {{ $t('navigation.home') }}
            </NuxtLink>

            <template v-if="footerPages">
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
              <NuxtLink
                :to="switchLocalePath('de')"
                class="px-3 py-1 rounded transition-colors"
                :class="locale === 'de' ? 'bg-gray-200' : 'hover:bg-gray-100'"
              >
                DE
              </NuxtLink>
              <NuxtLink
                :to="switchLocalePath('en')"
                class="px-3 py-1 rounded transition-colors"
                :class="locale === 'en' ? 'bg-gray-200' : 'hover:bg-gray-100'"
              >
                EN
              </NuxtLink>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <NuxtPage />
  </div>
</template>

<script setup>
const route = useRoute();
const { locale } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const { getFooterPages } = useMultilanguageApi();

const { data: footerPages } = await useAsyncData(
  `footer-pages-${locale.value}`,
  () => getFooterPages(),
  {
    server: true,
    watch: [() => locale.value],
  }
);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Merriweather:wght@400;700&display=swap');

body {
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  background-color: #fff;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>