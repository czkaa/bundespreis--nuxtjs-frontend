<template>
  <div v-if="data" class="space-y-sm mt-offset-content">
    <BasicsHeading tag="h2" :text="data.title" size="large" />

    <SnippetsSlider v-if="data.gallery?.length > 0" :images="data.gallery" />

    <template v-if="data.portrait">
      <BasicsImage
        :image="data.portrait"
        class="h-remaining-content [&>img]:h-full [&>img]:w-auto [&>img]:object-left ml-indent-sm" />
      <BasicsCaption v-if="data.portrait.caption" :text="data.portrait.caption"
    /></template>

    <Blocks :blocks="data.blocks" v-if="data.blocks" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useGapStore } from '@/stores/gap'; // Adjust the import path as needed

const props = defineProps({
  data: {
    type: Object,
  },
});

const route = useRoute();
const gap = useGapStore();

onMounted(() => {
  setTimeout(() => {
    gap.setGap(true);
  }, 500);

  const scrollToTop = () => {
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollTo({
        top: 0,
        behavior: 'instant',
      });
    }
  };

  setTimeout(scrollToTop, 50);
});
</script>
