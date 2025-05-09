<template>
  <template v-for="page in siteData?.headerPages" :key="page.uri">
    <NuxtLink
      :to="`/${locale}/${page.uri}`"
      class="inline-block relative transition-transform duration-500 md:h-tag"
      :class="{
        'translate-y-full md:translate-y-0': route.fullPath.includes(page.uri),
      }"
    >
      <div
        class="absolute w-full h-[calc(var(--tag-h)+1px)] bg-black -translate-y-[calc(100%-1px)] transform md:hidden"
      ></div>
      <BasicsNavItem
        :text="page.title"
        :translation="page.translatedTitle"
        class="items-end"
      />
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
const route = useRoute();
</script>
