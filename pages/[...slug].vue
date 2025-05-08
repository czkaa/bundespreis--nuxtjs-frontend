<template>
  <TemplatesHome :data v-if="data" />
</template>

<script setup>
const { locale } = useI18n();
const { data: data } = await useFetch(() => `/api/${locale.value}`);

const routeStore = useRouteStore();
onBeforeMount(() => {
  routeStore.setView('home');
});

const gapStore = useGapStore();
</script>
