<template>
  <NuxtLink
    ref="imageLink"
    :to="gap.isGap ? localePath('/') : localePath('/' + item.page.uri)"
    class="relative overflow-hidden"
    :class="[
      gap.isTransitioning ? 'pointer-events-none' : 'pointer-events-auto',
    ]"
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
        :class="[
          gap.isGap
            ? 'cursor-[url(/cursors/close.svg),_pointer]'
            : 'cursor-pointer',
        ]"
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

const handleImageClick = async (item) => {
  if (!gap.isGap) {
    imageStore.setCurrentIndex(item.imageIndex);
  }
};
</script>
