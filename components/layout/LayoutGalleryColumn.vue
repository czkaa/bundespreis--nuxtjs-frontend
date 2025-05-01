<template>
  <div
    @click="toggleGap"
    class="w-1/2 transition-all duration-1000 ease-in-out transform cursor-pointer overflow-hidden space-y-sm p-xs flex flex-col"
    :class="[
      gap.isGap
        ? isLeft
          ? '-translate-x-column'
          : 'translate-x-column'
        : 'translate-x-0',
      gap.isGap ? 'pointer-events-auto' : 'pointer-events-none',
    ]"
  >
    <NuxtLink
      v-for="(item, index) in items"
      :key="index"
      :to="localePath(`/${item.page.uri}`)"
      :style="{
        transform: `translateX(${getPosition(item, index)}%)`,
      }"
      class="relative cursor-pointer transform hover:scale-[102%] hover:z-50 m-xs transition-transform duration-300 grid w-[max-content]"
      :class="{
        'pointer-events-none': gap.isGap,
        'pointer-events-auto': !gap.isGap,
      }"
      @click.stop="handleImageClick(item)"
    >
      <BasicsImage
        :image="item"
        class="[&>img]:max-h-[60vh] [&>img]:max-w-[40vw]"
      />
      <BasicsCaption :text="item.page.title" class="ml-auto" />
    </NuxtLink>
  </div>
</template>

<script setup>
import { useGapStore } from '../stores/gap';
import { useImageStore } from '../stores/images';
import { ref } from 'vue';
const localePath = useLocalePath();

// Get the gap store
const gap = useGapStore();
const imageStore = useImageStore();
const route = useRoute();

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
  console.log(item.imageIndex);

  if (route.fullPath.includes(item.page.uri)) {
    gap.setGap(true);
  }
};

const getRandomPosition = () => {
  const max = 20;
  const min = 0;
  const positionType = Math.floor(Math.random() * 100);

  if (positionType <= 20) {
    return min;
  } else if (positionType >= 80) {
    return max;
  } else {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};
</script>
