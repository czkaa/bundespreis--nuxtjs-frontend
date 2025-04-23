<template>
  <div>
    <h1 class="text-4xl font-bold text-center py-12">
      {{ preistraeger?.title || 'Loading...' }}
    </h1>
  </div>
</template>

<script setup>
const route = useRoute();
const { locale } = useI18n();
const { getPreistragender } = useMultilanguageApi();

const slug = computed(() => route.params.slug);

const { data: preistraeger } = await useAsyncData(
  `preistraeger-${route.path}`,
  () => getPreistragender(slug.value),
  {
    watch: [() => locale.value, () => slug.value],
  }
);
</script>