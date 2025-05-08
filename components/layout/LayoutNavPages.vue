<template>
  <template v-for="page in siteData?.headerPages" :key="page.uri">
    <div>
      <NuxtLink
        :to="`/${locale}/${page.uri}`"
        class="inline-block [&.router-link-exact-active]:translate-y-full md:[&.router-link-exact-active]:translate-y-0 relative transition-transform duration-500"
      >
        <div
          class="absolute w-full h-tag bg-black -translate-y-full transform md:hidden"
        ></div>
        <BasicsNavItem :text="page.title" class="items-end -mt-[1px]" />
      </NuxtLink>
    </div>
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
