<template>
  <template v-for="page in siteData?.footerPages" :key="page.uri">
    <NuxtLink :to="localePath(`/${page.uri}`)" class="grow-1 block md:h-tag">
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

const localePath = useLocalePath();
</script>
