<template>
  <Transition name="fade"
    ><TemplatesInfo v-if="page" :data="page"
  /></Transition>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});

definePageMeta({
  key: 'info-page',
});

const { locale } = useI18n();
const { getPageData } = getData();
const route = useRoute();

const { data: page, error } = await useAsyncData(`pageData-landing`, () =>
  getPageData(`/${locale.value}/info`)
);
</script>
