<template>
  <div
    @click.stop="toggleGap"
    class="w-1/2 transition-all duration-gap ease-in-out transform cursor-pointer overflow-hidden space-y-xs flex flex-col relative"
    :class="[
      gap.isGap
        ? isLeft
          ? '-translate-x-column-l-translate'
          : 'translate-x-column-r-translate'
        : 'translate-x-0',
      gap.isGap || !gap.isTransitioning
        ? 'pointer-events-auto'
        : 'pointer-events-none',
    ]"
  >
    <LayoutGalleryImage
      v-for="(item, index) in itemsWithPositions"
      :key="index"
      :item="item"
      :positionStyle="item.positionStyle"
    />
  </div>
</template>

<script setup>
import { useGapStore } from '../stores/gap';
const localePath = useLocalePath();

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

const calculateWellDistributedPositions = (items) => {
  const numItems = items.length;
  if (numItems === 0) return [];

  // Edge threshold - items within this distance of edges will snap to edge
  const edgeThreshold = 0.2;

  // Generate positions with balanced distribution
  const positions = [];
  let leftSideConsecutive = 0;
  let rightSideConsecutive = 0;

  for (let i = 0; i < numItems; i++) {
    // Generate a random position between 0 and 1
    let position = Math.random();

    // Check if we need to force a position to avoid more than 2 consecutive on same side
    if (position < 0.5) {
      // This would be on the left side
      if (leftSideConsecutive >= 2) {
        // Force to right side
        position = Math.random() * 0.5 + 0.5;
        leftSideConsecutive = 0;
        rightSideConsecutive = 1;
      } else {
        leftSideConsecutive++;
        rightSideConsecutive = 0;
      }
    } else {
      // This would be on the right side
      if (rightSideConsecutive >= 2) {
        // Force to left side
        position = Math.random() * 0.5;
        rightSideConsecutive = 0;
        leftSideConsecutive = 1;
      } else {
        rightSideConsecutive++;
        leftSideConsecutive = 0;
      }
    }

    // Apply the edge threshold rule
    if (position < edgeThreshold) {
      position = 0; // Snap to left edge
    } else if (position > 1 - edgeThreshold) {
      position = 1; // Snap to right edge
    }

    positions.push(position);
  }

  // Shuffle the positions slightly to avoid predictable patterns
  // but maintain the left/right balance
  const shuffledItems = [...items].sort(() => Math.random() - 0.5);

  return shuffledItems.map((item, index) => {
    const position = positions[index];

    return {
      ...item,
      positionStyle: {
        left: `calc(var(--remaining-w) * ${position.toFixed(2)})`,
      },
    };
  });
};

const itemsWithPositions = computed(() => {
  return calculateWellDistributedPositions(props.items);
});

const toggleGap = () => {
  navigateTo(localePath('/'));
};
</script>
