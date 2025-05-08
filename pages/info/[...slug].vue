<template>
  <TemplatesInfo :data="data" v-if="data" />
</template>

<script setup>
const { locale } = useI18n();
const route = useRoute();

const basePath = `/${locale.value}/info`;

const { data: data } = await useFetch(() => `/api${basePath}`);

const routeStore = useRouteStore();
onBeforeMount(() => {
  routeStore.setView('info');
});
</script>
