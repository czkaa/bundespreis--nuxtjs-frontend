<template>
  <Transition name="fade"
    ><TemplatesPreistragende v-if="page" :data="page"
  /></Transition>
</template>

<script setup>
const route = useRoute();
const { locale } = useI18n();
const { getPageData } = getData();

const { data: page, error } = await useAsyncData(
  `pageData-preistragende-${route.fullPath}`,
  () => getPageData(`${route.fullPath}`),
  {
    watch: [() => route.path],
  }
);
</script>
