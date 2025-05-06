<template>
  <div v-if="data" class="space-y-sm">
    <BasicsHeading tag="h2" :text="data.title" />
    <SnippetsSlider :images="data.gallery" />
    <BasicsImage
      :image="data.portrait"
      class="[&_img]:max-h-content-h [&>img]:object-left ml-indent-sm"
    />
    <Blocks :blocks="data.bio" />
    <Blocks :blocks="data.judging" />
    <Blocks :blocks="data.bio" />
    <Blocks :blocks="data.prizes" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const apiUrl = computed(() => `/api${route.fullPath}`);

const { data } = await useFetch(apiUrl, {
  key: route.fullPath,
});
</script>
