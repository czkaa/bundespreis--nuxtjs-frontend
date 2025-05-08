<template>
  <template v-for="page in siteData?.footerPages" :key="page.uri">
    <NuxtLink :to="`/${locale}/${page.uri}`" class="md:w-full">
      <BasicsNavItem :text="page.title" class="items-end" />
    </NuxtLink>
  </template>
</template>

<script setup>
const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});

const { locale } = useI18n();
</script>
