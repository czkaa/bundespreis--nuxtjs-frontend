<template>
  <Transition name="fade">
    <Sections v-if="data" :sections="data.sections" />
  </Transition>
</template>

<script setup>
const { locale } = useI18n();
const { data: data } = await useFetch(() => `/api/${locale.value}`);
</script>
