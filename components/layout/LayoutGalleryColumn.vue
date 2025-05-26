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

  for (let i = 0; i < numItems; i++) {
    // Generate a random position between 0 and 1
    let position = Math.random();

    // Check if we have at least 2 previous positions
    if (i >= 2) {
      const prevPosition = positions[i - 1];
      const prevPrevPosition = positions[i - 2];

      // If all three positions (prev, prevprev, and current) are over 0.6
      if (prevPosition > 0.6 && prevPrevPosition > 0.6 && position > 0.6) {
        position = Math.abs(1 - position);
      }
      // If all three positions are under 0.4
      else if (prevPosition < 0.4 && prevPrevPosition < 0.4 && position < 0.4) {
        position = Math.abs(1 - position);
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

  return items.map((item, index) => {
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

const toggleGap = async () => {
  await nextTick();
  if (gap.isTransitioning || gap.isGap) return;
  navigateTo(localePath('/'));
};
</script>
