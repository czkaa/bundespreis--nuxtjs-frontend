<template>
  <section :id="section.slug" ref="sectionRef" class="pt-24 space-y-lg">
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
</script>
