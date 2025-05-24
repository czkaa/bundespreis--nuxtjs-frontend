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
});

const emit = defineEmits(['sectionInView']);

const sectionRef = ref(null);
let observer = null;

const setupObserver = () => {
  if (sectionRef.value && !props.disableObserver) {
    const rootMargin = '-10% 0px -10% 0px';

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
