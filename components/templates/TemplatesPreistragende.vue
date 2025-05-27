<template>
  <div class="space-y-sm mt-offset-content">
    <BasicsHeading tag="h2" :text="data.title" size="large" />

    <SnippetsSlider v-if="data.gallery?.length > 0" :images="data.gallery" />

    <div
      v-if="data.portrait"
      class="w-full flex flex-col items-end"
      :style="{
        maxWidth: `min(var(--image-w), calc(65vh * ${data.portrait.ratio}))`,
      }"
    >
      <BasicsGalleryImage :image="data.portrait" />
      <BasicsCaption
        v-if="data.portrait.caption"
        :text="data.portrait.caption"
        class="-mt-[0.5px]"
      />
    </div>

    <Blocks :blocks="data.blocks" v-if="data.blocks" />
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});

const scrollToTop = () => {
  const mainContainer = document.querySelector('main');
  if (mainContainer) {
    mainContainer.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }
};

// Watch the data change instead of route change
// Since useFetch key is tied to route.fullPath, data will change when route changes
watch(
  props.data,
  async (newData) => {
    if (newData) {
      await nextTick();
      scrollToTop();
    }
  },
  { immediate: false }
);

// Handle initial page load
onMounted(async () => {
  await nextTick();
  scrollToTop();
});
</script>
