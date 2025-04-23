<template>
  <div class="container mx-auto px-4 py-8">
    <SeoHead
      :title="pageData?.title || 'Home'"
      :description="pageData?.description"
    />

    <h1 class="text-4xl font-bold text-center py-12">
      {{ pageData?.title || 'Loading...' }}
    </h1>
  </div>
</template>

<script setup>
const { locale } = useI18n();
const { getPageData } = useMultilanguageApi();

const { data: pageData } = await useAsyncData(
  `page-home-${locale.value}`,
  () => getPageData('/home'),
  {
    server: true,
    watch: [() => locale.value],
  }
);
</script>
