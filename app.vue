<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { NuxtLayout } from '#components';

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
