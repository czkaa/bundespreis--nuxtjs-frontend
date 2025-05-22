<template>
  <TemplatesPreistragende :data="data" v-if="data" :key="route.fullPath" />
</template>

<script setup>
const route = useRoute();
const { data: data } = await useFetch(() => `/api${route.fullPath}`);
</script>
