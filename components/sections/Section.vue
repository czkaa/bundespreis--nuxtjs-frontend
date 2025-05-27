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
  scrollDirection: {
    type: String,
    default: 'down',
    validator: (value) => ['up', 'down'].includes(value),
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
        rootMargin: '0px 0px -50% 0px',
      };
    } else if (props.isLast) {
      // For last element: focus on top crossing middle
      observerConfig = {
        threshold: [0, 0.1, 0.3, 0.5],
        rootMargin: '-50% 0px 0px 0px',
      };
    } else {
      // For middle elements: more granular thresholds for scroll direction logic
      observerConfig = {
        threshold: [0, 0.1, 0.2, 0.3, 0.5, 0.8],
        rootMargin: '0px',
      };
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { isIntersecting, intersectionRatio, boundingClientRect } = entry;
        const elementRect = boundingClientRect;
        const viewportHeight = window.innerHeight;
        const middleLine = viewportHeight / 2;

        // Get element's position relative to viewport
        const elementTop = elementRect.top;
        const elementBottom = elementRect.bottom;
        const elementMiddle = elementTop + elementRect.height / 2;

        let shouldEmit = false;

        if (props.isFirst) {
          // First element: trigger if any part is visible and intersectionRatio > 0.1
          shouldEmit = isIntersecting && intersectionRatio > 0.1;
        } else if (props.isLast) {
          // Last element: only activate when scrolling down and top crosses middle
          shouldEmit =
            props.scrollDirection === 'down' &&
            elementTop <= middleLine &&
            isIntersecting &&
            intersectionRatio > 0.1;
        } else {
          // Middle elements: different behavior based on scroll direction
          if (props.scrollDirection === 'down') {
            // Scrolling down: activate when element crosses middle line
            shouldEmit =
              elementTop <= middleLine &&
              isIntersecting &&
              intersectionRatio > 0.1;
          } else {
            // Scrolling up: activate when element bottom passes middle line
            shouldEmit =
              elementBottom >= middleLine &&
              isIntersecting &&
              intersectionRatio > 0.1;
          }
        }

        if (shouldEmit) {
          emit('sectionInView', props.section.slug);
        }
      });
    }, observerConfig);

    observer.observe(sectionRef.value);

    // For first element, also check if it's already in view on mount
    if (props.isFirst) {
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

// Re-setup observer when scroll direction changes for better responsiveness
watch(
  () => props.scrollDirection,
  () => {
    if (!props.disableObserver) {
      disconnectObserver();
      setupObserver();
    }
  }
);
</script>
