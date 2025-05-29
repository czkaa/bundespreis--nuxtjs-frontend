<template>
  <Transition name="fade"
    ><TemplatesLanding v-if="page" :data="page"
  /></Transition>
</template>

<script setup>
definePageMeta({
  key: (route) =>
    `landing-page-${route.fullPath.startsWith('/en') ? 'en' : 'de'}`,
});

const { locale } = useI18n();
const { getPageData } = getData();
const route = useRoute();
const localePath = useLocalePath();

const { data: page } = await useAsyncData(
  `pageData-landing-${route.name}`,
  async () => {
    try {
      const data = await getPageData(`/${locale.value}`);
      return data;
    } catch (err) {
      // since this is a catch-all route
      // non-prerendered routes will be directed here
      // but cause a cors error
      await navigateTo('/');
      return null;
    }
  },
  {
    default: () => null,
  }
);
</script>
