<template>
  <div
    @click="toggleGap"
    class="w-1/2 transition-all duration-500 ease-in-out transform bg-white cursor-pointer space-y-sm"
    :class="[
      gap.isGap
        ? isLeft
          ? '-translate-x-[70%]'
          : 'translate-x-[70%]'
        : 'translate-x-0',
    ]"
  >
    <NuxtLink
      v-for="(item, index) in items"
      :key="index"
      :to="`/${item.page.uri}`"
      :style="{ marginLeft: `${getRandomPosition()}%`, width: `${100 - 20}%` }"
      class="block relative cursor-pointer transform hover:scale-105 hover:z-50 transition-transform duration-300"
      :class="{
        'pointer-events-none': gap.isGap,
        'pointer-events-auto': !gap.isGap,
      }"
      @click.stop="handleImageClick(item)"
    >
      <BasicsImage :image="item" :caption="item.page.title" />
    </NuxtLink>
  </div>
</template>

<script setup>
import { useGapStore } from '../stores/gap';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

// Get the gap store
const gap = useGapStore();
const router = useRouter();

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

// Methods
const toggleGap = () => {
  gap.toggle();
  console.log(gap.isGap);
};

const handleImageClick = (item) => {
  // If gap is active, close it first then navigate
  if (gap.isGap) {
    gap.setGap(false);

    // Navigate after a delay
    setTimeout(() => {
      router.push(`/preistragende/${item.page.uri.split('/').pop()}`);
    }, 1000);
  } else {
    // Navigate immediately
    router.push(`/preistragende/${item.page.uri.split('/').pop()}`);
  }
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
