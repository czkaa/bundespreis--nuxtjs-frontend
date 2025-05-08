<template>
  <TemplatesPreistragende :data="data" v-if="data" />
</template>

<script setup>
const route = useRoute();
const { data: data } = await useFetch(() => `/api${route.fullPath}`);

const routeStore = useRouteStore();
</script>
