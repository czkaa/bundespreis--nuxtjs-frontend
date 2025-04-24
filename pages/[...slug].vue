<template>
  <div class="container mx-auto px-4 py-8">
    <SeoHead
      :title="pageData?.title || 'Page'"
      :description="pageData?.description"
    />

    <h1 class="text-4xl font-bold text-center py-12">
      {{ pageData?.title || 'Loading...' }}
    </h1>
  </div>
</template>

<script setup>
const route = useRoute();
const { locale } = useI18n();
const { getPageData } = useMultilanguageApi();

const slug = computed(() => {
  const slugArray = route.params.slug;
  // Handle path construction
  const path = Array.isArray(slugArray) ? slugArray.join('/') : slugArray;
  // No need to strip locale prefix for default locale
  return '/' + path;
});

const { data: pageData } = await useAsyncData(
  `page-${slug.value}-${locale.value}`,
  () => getPageData(slug.value),
  {
    server: true,
    watch: [slug, () => locale.value],
  }
);
</script>
