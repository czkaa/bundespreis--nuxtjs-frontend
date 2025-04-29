<template>
  <NuxtLink
    v-for="page in siteData?.footerPages"
    :key="page.uri"
    :to="`/${page.uri}`"
  >
    <BasicsTag :text="page.title" />
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});
</script>
