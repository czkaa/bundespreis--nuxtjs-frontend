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
      threshold: Array.from({ length: 101 }, (_, i) => i / 100),
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
        const topTriggerLine = viewportHeight * 0.5; // 10% from top
        const middleTriggerLine = viewportHeight * 0.5; // 50% from top
        const elementTop = elementRect.top;
        const elementBottom = elementRect.bottom;

        let shouldEmit = false;

        if (props.scrollDirection === 'down') {
          // Scrolling down: trigger when top edge crosses 10% line from top
          shouldEmit =
            elementTop <= topTriggerLine && elementTop > topTriggerLine - 50;
        } else {
          // Scrolling up: trigger when bottom edge crosses 50% line from top
          shouldEmit =
            elementBottom >= middleTriggerLine &&
            elementBottom < middleTriggerLine + 50;
        }

        // Emit only once per crossing to avoid spam
        if (shouldEmit && !hasEmitted) {
          hasEmitted = true;
          emit('sectionInView', props.section.slug);
        }
      });
    }, observerConfig);

    observer.observe(sectionRef.value);

    // // Initial check for first element
    // if (props.isFirst) {
    //   setTimeout(() => {
    //     if (sectionRef.value) {
    //       const rect = sectionRef.value.getBoundingClientRect();
    //       if (rect && rect.top <= window.innerHeight * 0.1) {
    //         emit('sectionInView', props.section.slug);
    //         hasEmitted = true;
    //       }
    //     }
    //   }, 1000);
    // }
  }
};

const disconnectObserver = () => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  hasEmitted = false;
};

onMounted(async () => {
  setTimeout(() => {
    setupObserver();
  }, 1000);
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
