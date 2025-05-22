<template>
  <Sections
    v-if="data?.sections"
    :sections="data.sections"
    class="bg-blue-200"
  />
</template>

<script setup>
const { locale } = useI18n();
const { data: data } = await useFetch(() => `/api/${locale.value}`);

const gap = useGapStore();
const route = useRoute();

onMounted(() => {
  console.log('MoUNI');
});
</script>
