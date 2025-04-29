<template>
  <div>
    <LayoutHeader :siteData="siteData" class="fixed top-0 z-50" />

    <div
      class="w-full top-0 h-frame-h fixed overflow-y-auto snap-y snap-mandatory"
      :class="{ 'overflow-hidden': gap.isGap }"
    >
      <LayoutIntro :siteData="siteData" />

      <LayoutGallery :siteData="siteData" />

      <LayoutFooter :siteData="siteData" class="sm:hidden" />
    </div>

    <main
      :key="currentLang"
      class="max-w-[40vw] mx-auto p-10 overflow-hidden"
      :class="
        true ? 'pointer-events-auto z-50' : 'opacity-0 pointer-events-none'
      "
    >
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
const { currentLang } = useLanguage();
const gap = useGapStore();

const { data: siteData } = await useFetch('/api/site', {
  server: true,
  query: {
    lang: currentLang,
  },
});

// Fixed useHead implementation
useHead(() => {
  const headConfig = {
    title: siteData.value?.title || 'Bundespreis für Kunststudierende',
    meta: [
      {
        name: 'description',
        content: siteData.value?.seo?.description || '',
      },
      {
        name: 'keywords',
        content: siteData.value?.seo?.keywords || '',
      },
    ],
  };

  if (siteData.value?.seo?.image) {
    headConfig.meta.push({
      property: 'og:image',
      content: siteData.value.seo.image,
    });
  }

  return headConfig;
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
