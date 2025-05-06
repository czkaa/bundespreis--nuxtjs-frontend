<template>
  <div
    @click.stop="toggleGap"
    class="w-1/2 transition-all duration-1000 ease-in-out transform cursor-pointer overflow-hidden space-y-xs flex flex-col relative"
    :class="[
      gap.isGap
        ? isLeft
          ? '-translate-x-column'
          : 'translate-x-column'
        : 'translate-x-0',
      gap.isGap ? 'pointer-events-auto' : 'pointer-events-none',
    ]"
  >
    <LayoutGalleryImage v-for="(item, index) in items" :item="item" />
  </div>
</template>

<script setup>
import { useGapStore } from '../stores/gap';
const gap = useGapStore();

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  isLeft: {
    type: Boolean,
    default: false,
  },
});

const toggleGap = () => {
  if (gap.isGap) {
    gap.setGap(false);
  }
};
</script>
