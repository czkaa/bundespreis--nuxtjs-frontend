<template>
  <NuxtLink
    ref="imageLink"
    :to="localePath('/' + item.page.uri)"
    class="relative cursor-pointer overflow-hidden"
    :class="{
      'pointer-events-none': gap.isGap,
      'pointer-events-auto': !gap.isGap,
    }"
    @click="handleImageClick(item)"
    :style="positionStyle"
  >
    <div
      class="w-full flex flex-col items-end"
      :style="{
        maxWidth: `min(var(--image-w), calc(65vh * ${item.ratio}))`,
      }"
    >
      <BasicsGalleryImage
        :image="item"
        class="hover-hover:hover:scale-[103%] hover-hover:hover:z-50 transform transition-transform duration-300"
      />
      <BasicsCaption :text="item.page.title" class="-mt-[0.5px]" />
    </div>
  </NuxtLink>
</template>

<script setup>
import { useImageStore } from '../stores/images';
const imageStore = useImageStore();
const localePath = useLocalePath();
const gap = useGapStore();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  positionStyle: {
    type: Object,
    default: () => ({}),
  },
});

onMounted(async () => {
  await nextTick();
});

const handleImageClick = (item) => {
  imageStore.setCurrentIndex(item.imageIndex);
};
</script>
