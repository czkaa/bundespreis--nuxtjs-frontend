<template>
  <div v-if="pending">loading</div>
  <div v-else>{{ data }}</div>
</template>

<script setup>
const route = useRoute();
const { currentLang } = useLanguage();

const { data, pending, error } = await useFetch('/api/dynamic', {
  query: {
    lang: currentLang,
    slug: route.params.slug,
  },
});
</script>
