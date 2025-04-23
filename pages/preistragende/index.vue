<template>
  <div>
    <h1 class="text-4xl font-bold text-center py-12">
      {{ pageData?.title || 'Loading...' }}
    </h1>
  </div>
</template>

<script setup>
const route = useRoute();
const { locale } = useI18n();
const { getPageData } = useMultilanguageApi();

const { data: pageData } = await useAsyncData(
  `pageData-${route.path}`,
  () => getPageData('/preistragende'),
  {
    watch: [() => locale.value],
  }
);
</script>