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
const routeStore = useRouteStore();
const gap = useGapStore();

const data = ref(null);
const pending = ref(false);

const fetchData = async () => {
  if (!routeStore.route) return;

  pending.value = true;
  try {
    data.value = await $fetch(`/api${routeStore.route}`);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    data.value = null;
  } finally {
    pending.value = false;
  }
};

// Watch route changes
watch(() => routeStore.route, fetchData, { immediate: true });
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
  data,
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
