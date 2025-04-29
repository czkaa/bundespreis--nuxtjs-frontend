<template>
  <div v-if="pending">loading</div>
  <div v-else>
    <BasicsHeading tag="h2" :text="data.title" />

    <BasicsImage :image="data.portrait" />

    <BasicsHeading tag="h3" :text="data.bioTitle" />

    <BasicsHeading tag="h3" :text="data.judgingTitle" />
    <Blocks :blocks="data.judging" />

    <BasicsHeading tag="h3" :text="data.exhibitionsTitle" />

    <BasicsHeading tag="h3" :text="data.prizesTitle" />

    <SnippetsSlider :images="data.gallery" />
    {{ data }}
  </div>
</template>

<script setup>
const route = useRoute();
const { currentLang } = useLanguage();

const { data, pending, error } = await useFetch('/api/preistragende', {
  query: {
    lang: currentLang,
    slug: route.params.slug,
  },
});
</script>
