<template>
  <template v-for="(page, index) in siteData?.headerPages" :key="page.uri">
    <NuxtLink
      :tabindex="index + 2"
      :aria-label="`${$t('viewSubpage')} ${page.title}`"
      :to="localePath(`/${page.uri}`)"
      class="inline-block relative transition-transform duration-500 md:h-tag"
      :class="{
        'translate-y-tag-top md:translate-y-0': route.fullPath.includes(
          page.uri
        ),
      }"
    >
      <div
        class="absolute w-full h-[calc(var(--tag-top)+1px)] bg-black -translate-y-[calc(100%-1px)] transform md:hidden"
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
const localePath = useLocalePath();
const route = useRoute();
</script>
