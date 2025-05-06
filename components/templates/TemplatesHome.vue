<template>
  <Sections v-if="data?.sections" :sections="data.sections" />
</template>

<script setup>
const { locale } = useI18n();
const basePath = `/${locale.value}`;
const { data: data } = await useFetch(() => `/api${basePath}`);
const routeStore = useRouteStore();

// onMounted(() => {
//   routeStore.setHome(true);
// });

// onUnmounted(() => {
//   routeStore.setHome(false);
// });
</script>
