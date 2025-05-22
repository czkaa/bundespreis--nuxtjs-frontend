<template>
  <TemplatesHome :data v-if="data" :key="data.title" />
</template>

<script setup>
const { locale } = useI18n();
const { data: data } = await useFetch(() => `/api/${locale.value}`);
</script>
