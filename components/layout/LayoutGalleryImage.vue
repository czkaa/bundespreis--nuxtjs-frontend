<template>
  <NuxtLink
    ref="imageLink"
    :to="
      localePath({
        name: 'preistragende-slug',
        params: { slug: item.page.slug },
      })
    "
    class="relative cursor-pointer overflow-hidden"
    :class="{
      'pointer-events-none': gap.isGap,
      'pointer-events-auto': !gap.isGap,
    }"
    @click.stop="handleImageClick(item)"
    :style="positionStyle"
  >
    <div
      class="w-full flex flex-col items-end"
      :style="{
        maxWidth: `min(var(--image-w), calc(65vh * ${item.ratio}))`,
      }"
    >
      <BasicsImage
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
const route = useRoute();
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

  if (route.fullPath.includes(item.page.uri)) {
    gap.setGap(true);
  }
};
</script>
