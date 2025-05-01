<template>
  <div v-if="data" class="space-y-lg my-24">
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

const { data: data } = await useFetch(
  `/api/preistragende/${route.params.slug}`
);
</script>
