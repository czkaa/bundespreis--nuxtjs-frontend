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

  // Create segments based on number of items
  const segments = Math.max(3, Math.min(8, numItems)); // Limit segments between 3-8
  const segmentSize = 1 / segments;

  // Create an array of available positions
  const availablePositions = [];
  for (let i = 0; i < segments; i++) {
    // Add multiple positions per segment for variety
    availablePositions.push(i * segmentSize + 0.1); // Left of segment
    availablePositions.push(i * segmentSize + segmentSize * 0.5); // Middle of segment
    availablePositions.push(i * segmentSize + segmentSize * 0.9); // Right of segment
  }

  // Shuffle the positions array
  const shuffledPositions = [...availablePositions].sort(
    () => Math.random() - 0.5
  );

  return items.map((item, index) => {
    let position = shuffledPositions[index % shuffledPositions.length];

    // Add slight randomization to avoid perfect grid
    position += (Math.random() - 0.5) * 0.05;

    // Ensure boundaries
    position = Math.max(0.05, Math.min(0.95, position));

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
  if (gap.isGap && !gap.isTransitioning) {
    gap.setGap(false);
  }
};
</script>
