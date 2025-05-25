<template>
  <Transition name="fade"
    ><TemplatesInfo v-if="page" :data="page"
  /></Transition>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});
const route = useRoute();
const { locale } = useI18n();
const { getPageData } = getData();

definePageMeta({
  key: (route) => `info-page-${route.fullPath.startsWith('/en') ? 'en' : 'de'}`,
});

const { data: page, error } = await useAsyncData(
  `pageData-landing-${route.name}`,
  () => getPageData(`/${locale.value}/info`)
);
</script>
