<template>
  <TemplatesPreistragende v-if="data" :data="data" />
</template>

<script setup>
const { locale } = useI18n();
const route = useRoute();

const { data: data } = await useFetch(() => `/api${route.fullPath}`);

const fetchUrl = computed(() => {
  return route;
});

console.log('FETCH', fetchUrl);
</script>
