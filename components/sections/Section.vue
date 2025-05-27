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
let hasEmitted = false;

const setupObserver = () => {
  if (sectionRef.value && !props.disableObserver) {
    const observerConfig = {
      threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0.00 to 1.00 in 0.01 steps
      rootMargin: '0px',
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const { isIntersecting, boundingClientRect } = entry;

        if (!isIntersecting) {
          hasEmitted = false;
          return;
        }

        const elementRect = boundingClientRect;
        const viewportHeight = window.innerHeight;
        const middleLine = viewportHeight / 2;
        const elementTop = elementRect.top;
        const elementBottom = elementRect.bottom;

        let shouldEmit = false;

        if (props.scrollDirection === 'down') {
          // Scrolling down: trigger when top edge crosses middle line
          shouldEmit = elementTop <= middleLine && elementTop > middleLine - 50;
        } else {
          // Scrolling up: trigger when bottom edge crosses middle line
          shouldEmit =
            elementBottom >= middleLine && elementBottom < middleLine + 50;
        }

        // Special case for last element when scrolling down
        if (props.isLast && props.scrollDirection === 'down') {
          // Only trigger when top crosses middle (not bottom)
          shouldEmit = elementTop <= middleLine && elementTop > middleLine - 50;
        }

        // Emit only once per crossing to avoid spam
        if (shouldEmit && !hasEmitted) {
          hasEmitted = true;
          emit('sectionInView', props.section.slug);
        }
      });
    }, observerConfig);

    observer.observe(sectionRef.value);

    // Initial check for first element
    if (props.isFirst) {
      setTimeout(() => {
        if (sectionRef.value) {
          const rect = sectionRef.value.getBoundingClientRect();
          if (rect && rect.top <= window.innerHeight / 2) {
            emit('sectionInView', props.section.slug);
          }
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
  hasEmitted = false;
};

onMounted(() => {
  setupObserver();
});

onUnmounted(() => {
  disconnectObserver();
});

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

// Reset emission flag when scroll direction changes
watch(
  () => props.scrollDirection,
  () => {
    hasEmitted = false;
  }
);
</script>
