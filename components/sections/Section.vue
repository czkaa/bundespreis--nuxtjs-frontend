<template>
  <section ref="sectionRef" :key="section.slug" :id="section.slug">
    <Blocks :blocks="section.blocks" :isSection="true" />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
  disableObserver: {
    type: Boolean,
    default: false,
  },
  isFirst: {
    type: Boolean,
    default: false,
  },
  isLast: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['sectionInView']);

const sectionRef = ref(null);
let observer = null;

const setupObserver = () => {
  if (sectionRef.value && !props.disableObserver) {
    // Different configurations for first, last, and middle elements
    let observerConfig;

    if (props.isFirst) {
      // For first element: more lenient, trigger early
      observerConfig = {
        threshold: [0, 0.1, 0.3],
        rootMargin: '0px 0px -50% 0px', // Only shrink bottom margin
      };
    } else if (props.isLast) {
      // For last element: very lenient threshold
      observerConfig = {
        threshold: [0, 0.1, 0.2],
        rootMargin: '-50% 0px 0px 0px', // Only shrink top margin
      };
    } else {
      // For middle elements: standard config
      observerConfig = {
        threshold: 0.3,
        rootMargin: '-10% 0px -10% 0px',
      };
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Different intersection logic based on position
        let shouldEmit = false;

        if (props.isFirst) {
          // First element: trigger if any part is visible and intersectionRatio > 0.1
          shouldEmit = entry.isIntersecting && entry.intersectionRatio > 0.1;
        } else if (props.isLast) {
          // Last element: trigger if any meaningful part is visible
          shouldEmit = entry.isIntersecting && entry.intersectionRatio > 0.1;
        } else {
          // Middle elements: standard 30% threshold
          shouldEmit = entry.isIntersecting && entry.intersectionRatio >= 0.3;
        }

        if (shouldEmit) {
          emit('sectionInView', props.section.slug);
        }
      });
    }, observerConfig);

    observer.observe(sectionRef.value);

    // For first element, also check if it's already in view on mount
    if (props.isFirst) {
      // Small delay to ensure DOM is fully rendered
      setTimeout(() => {
        const rect = sectionRef.value?.getBoundingClientRect();
        if (rect && rect.top < window.innerHeight * 0.5) {
          emit('sectionInView', props.section.slug);
        }
      }, 100);
    }
  }
};

const disconnectObserver = () => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
};

onMounted(() => {
  setupObserver();
});

onUnmounted(() => {
  disconnectObserver();
});

// Watch for changes in disableObserver prop
watch(
  () => props.disableObserver,
  (disabled) => {
    if (disabled) {
      disconnectObserver();
    } else {
      disconnectObserver();
      setupObserver();
    }
  }
);
</script>
