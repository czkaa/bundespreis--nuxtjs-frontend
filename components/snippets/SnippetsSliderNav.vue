<template>
  <div
    class="relative w-full"
    ref="swipeContainer"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- Navigation areas (invisible click/touch zones) -->
    <div
      v-if="totalItems > 1 && !disabled"
      @click="$emit('previous')"
      style="cursor: url('/cursors/left.svg'), w-resize"
      class="absolute left-0 top-0 z-[100] w-1/2 h-full"
      :aria-label="$t('showPreviousImage')"
    />
    <div
      v-if="totalItems > 1 && !disabled"
      @click="$emit('next')"
      style="cursor: url('/cursors/right.svg'), e-resize"
      class="absolute right-0 top-0 z-[100] w-1/2 h-full"
      :aria-label="$t('showNextImage')"
    />

    <!-- Slot for the main content -->
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  currentIndex: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showIndicators: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['navigate', 'previous', 'next']);

const swipeContainer = ref(null);

// Touch/swipe state
const touchStartX = ref(0);
const touchStartY = ref(0);
const touchEndX = ref(0);
const touchEndY = ref(0);
const minSwipeDistance = 50;
const maxVerticalDistance = 100;
const isSwiping = ref(false);

// Touch event handlers
const handleTouchStart = (e) => {
  if (props.totalItems <= 1 || props.disabled) return;

  touchStartX.value = e.touches[0].clientX;
  touchStartY.value = e.touches[0].clientY;
  isSwiping.value = false;
};

const handleTouchMove = (e) => {
  if (props.totalItems <= 1 || props.disabled) return;

  const currentX = e.touches[0].clientX;
  const currentY = e.touches[0].clientY;
  const deltaX = Math.abs(currentX - touchStartX.value);
  const deltaY = Math.abs(currentY - touchStartY.value);

  if (deltaX > deltaY && deltaX > 10) {
    isSwiping.value = true;
    e.preventDefault();
  }
};

const handleTouchEnd = (e) => {
  if (props.totalItems <= 1 || props.disabled) return;

  touchEndX.value = e.changedTouches[0].clientX;
  touchEndY.value = e.changedTouches[0].clientY;

  const deltaX = touchEndX.value - touchStartX.value;
  const deltaY = touchEndY.value - touchStartY.value;
  const absDeltaX = Math.abs(deltaX);
  const absDeltaY = Math.abs(deltaY);

  if (absDeltaX > minSwipeDistance && absDeltaY < maxVerticalDistance) {
    if (deltaX > 0) {
      emit('previous');
    } else {
      emit('next');
    }
  }

  isSwiping.value = false;
};
</script>
