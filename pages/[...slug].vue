<template>
  <Transition name="fade"
    ><TemplatesLanding v-if="page" :data="page"
  /></Transition>
</template>

<script setup>
definePageMeta({
  key: (route) =>
    `landing-page-${route.fullPath.startsWith('/en') ? 'en' : 'de'}`,
});

const { locale } = useI18n();
const { getPageData } = getData();
const route = useRoute();

const { data: page, error } = await useAsyncData(
  `pageData-landing-${route.name}`,
  () => getPageData(`/${locale.value}`)
);
</script>
