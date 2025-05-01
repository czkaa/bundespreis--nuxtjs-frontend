<template>
  <div v-if="pending">loading</div>
  <div v-else>
    <BasicsHeading tag="h2" :text="data.title" />

    <SnippetsSlider :images="data.gallery" />

    <BasicsImage
      :image="data.portrait"
      class="[&_img]:max-h-[50vh] [&>img]:object-left"
    />

    <BasicsHeading tag="h3" :text="data.bioTitle" />
    <BasicsList :items="data.bio" />

    <BasicsHeading tag="h3" :text="data.judgingTitle" />
    <Blocks :blocks="data.judging" />

    <BasicsHeading tag="h3" :text="data.exhibitionsTitle" />
    <BasicsList :items="data.exhibitions" />

    <BasicsHeading tag="h3" :text="data.prizesTitle" />
    <BasicsList :items="data.prizes" />
  </div>
</template>

<script setup>
const route = useRoute();
const { currentLang } = useLanguage();

const { data, pending, error } = await useFetch('/api/preistragende', {
  server: false,
  query: {
    lang: currentLang,
    slug: route.params.slug,
  },
});
</script>
