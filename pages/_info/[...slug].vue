<template>
  <TemplatesInfo v-if="data" :data="data" />
</template>

<script setup>
const { locale } = useI18n();
const route = useRoute();

const basePath = `/${locale.value}/info`;

const { data: data } = await useFetch(() => `/api${basePath}`);
const slug = computed(() => route.params.slug);
</script>
