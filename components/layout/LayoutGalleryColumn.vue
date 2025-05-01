<template>
  <div
    @click="toggleGap"
    class="w-1/2 transition-all duration-500 ease-in-out transform bg-white cursor-pointer space-y-sm p-sm"
    :class="[
      gap.isGap
        ? isLeft
          ? '-translate-x-[70%]'
          : 'translate-x-[70%]'
        : 'translate-x-0',
      gap.isGap ? 'pointer-events-auto' : 'pointer-events-none',
    ]"
  >
    <NuxtLink
      v-for="(item, index) in items"
      :key="index"
      :to="`/${item.page.uri}`"
      :style="{
        marginLeft: `${getPosition(item, index)}%`,
        width: `${100 - 20}%`,
      }"
      class="block relative cursor-pointer transform hover:scale-[102%] hover:z-50 m-xs transition-transform duration-300"
      :class="{
        'pointer-events-none': gap.isGap,
        'pointer-events-auto': !gap.isGap,
      }"
      @click="handleImageClick(item)"
    >
      <BasicsImage :image="item" />
      <BasicsCaption :text="item.page.title" class="ml-auto" />
    </NuxtLink>
  </div>
</template>

<script setup>
import { useGapStore } from '../stores/gap';
import { useImageStore } from '../stores/images';
import { ref } from 'vue';

// Get the gap store
const gap = useGapStore();
const imageStore = useImageStore();

// Props
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

// Simple storage for positions
const positions = ref({});

// Get or create a position for an item
const getPosition = (item, index) => {
  const key = item.id || index;

  if (!positions.value[key]) {
    positions.value[key] = getRandomPosition();
  }

  return positions.value[key];
};

// Methods
const toggleGap = () => {
  if (gap.isGap) {
    console.log('LAYOUT TOGGLE');
    gap.setGap(false);
  }
};

const handleImageClick = (item) => {
  imageStore.setCurrentIndex(item.imageIndex);
};

const getRandomPosition = () => {
  const max = 20;
  const min = 0;
  const positionType = Math.floor(Math.random() * 101);

  if (positionType <= 20) {
    return min;
  } else if (positionType >= 81) {
    return max;
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
</script>
