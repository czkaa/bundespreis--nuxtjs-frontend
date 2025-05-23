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
  scrollDirection: {
    type: String,
    default: 'down',
  },
  disableObserver: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['sectionInView']);

const sectionRef = ref(null);
let observer = null;

const setupObserver = () => {
  if (sectionRef.value && !props.disableObserver) {
    // Different rootMargin based on scroll direction
    const rootMargin =
      props.scrollDirection === 'up'
        ? '-10% 0px -10% 0px' // When scrolling up, trigger when section enters from top
        : '-10% 0px -20% 0px'; // When scrolling down, trigger when section enters from bottom

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            emit('sectionInView', props.section.slug);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin,
      }
    );

    observer.observe(sectionRef.value);
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

// Watch for changes in disableObserver prop or scroll direction
watch(
  [() => props.disableObserver, () => props.scrollDirection],
  ([disabled]) => {
    if (disabled) {
      disconnectObserver();
    } else {
      disconnectObserver(); // Disconnect first to recreate with new settings
      setupObserver();
    }
  }
);
</script>
