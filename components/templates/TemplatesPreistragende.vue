<template>
  <div v-if="data" class="space-y-sm mt-offset-content">
    <BasicsHeading tag="h2" :text="data.title" size="large" />

    <SnippetsSlider v-if="data.gallery?.length > 0" :images="data.gallery" />

    <div
      v-if="data.portrait"
      class="w-full flex flex-col items-end"
      :style="{
        maxWidth: `min(var(--image-w), calc(65vh * ${data.portrait.ratio}))`,
      }"
    >
      <BasicsGalleryImage
        :image="data.portrait"
        class="hover-hover:hover:scale-[103%] hover-hover:hover:z-50 transform transition-transform duration-300"
      />
      <BasicsCaption :text="data.portrait.caption" class="-mt-[0.5px]" />
    </div>

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
