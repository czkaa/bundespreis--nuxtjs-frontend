<template>
  <section :id="section.slug" ref="sectionRef" class="h-screen">
    <BasicsHeading tag="h2" :text="section.title" />
    <slot />
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useHashStore } from '@/stores/hash'; // Adjust path if needed

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
});

const sectionRef = ref(null);
const hashStore = useHashStore();

const checkPosition = () => {
  if (!sectionRef.value) return;

  const rect = sectionRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Check if the top of the component is in the upper third of the screen
  if (rect.top >= 0 && rect.top <= windowHeight / 3) {
    if (!hashStore.isBlocked) {
      hashStore.setCurrentHash(props.section.slug);
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', checkPosition);
  // Check position initially after component is mounted
  checkPosition();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', checkPosition);
});
</script>
