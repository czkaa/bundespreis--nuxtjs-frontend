<template>
  <Sections :sections="data.sections" />
</template>

<script setup>
const { locale } = useI18n();
const basePath = `/${locale.value}/info`;
const { data: data } = await useFetch(() => `/api${basePath}`);
</script>
