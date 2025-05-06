<template>
  <NuxtLink
    ref="imageLink"
    :to="localePath(`/${item.page.uri}`)"
    class="relative cursor-pointer overflow-hidden w-image-w"
    :class="{
      'pointer-events-none': gap.isGap,
      'pointer-events-auto': !gap.isGap,
    }"
    @click.stop="handleImageClick(item)"
    :style="{ left: `calc(var(--remaining-w) * ${position})` }"
  >
    <BasicsImage
      :image="item"
      class="hover-hover:hover:scale-[102%] hover-hover:hover:z-50 transform transition-transform duration-300"
    />
    <BasicsCaption :text="item.page.title" class="ml-auto" />
  </NuxtLink>
</template>

<script setup>
import { useImageStore } from '../stores/images';
const imageStore = useImageStore();
const route = useRoute();
const localePath = useLocalePath();
const gap = useGapStore();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const imageLink = ref(null);
const position = Math.random().toFixed(2);

onMounted(async () => {
  await nextTick();
});

const handleImageClick = (item) => {
  imageStore.setCurrentIndex(item.imageIndex);

  if (route.fullPath.includes(item.page.uri)) {
    gap.setGap(true);
  }
};
</script>
