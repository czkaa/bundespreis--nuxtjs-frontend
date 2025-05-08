<template>
  <div class="">
    <section
      v-for="section in sections"
      :key="section.slug"
      :id="section.slug"
      class="pt-offset-content"
    >
      <Blocks :blocks="section.blocks" />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  sections: {
    type: Array, // Changed from Object to Array since you're using v-for
    required: true,
  },
});

const route = useRoute();
const main = ref(null);

onMounted(() => {
  if (document) {
    main.value = document.querySelector('main');

    // Handle initial scroll if needed
    if (route.params.slug && route.params.slug.length > 0) {
      setTimeout(() => {
        scrollToSection(route.params.slug[0]);
      }, 100); // Small delay to ensure DOM is ready
    }
  }
});

// Function to handle scrolling within main element
const scrollToSection = (slug) => {
  if (!document || !main.value) return;

  const section = document.querySelector(`#${slug}`);
  if (section) {
    // Calculate the position relative to the main element
    const mainRect = main.value.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    const scrollTop = sectionRect.top - mainRect.top + main.value.scrollTop;

    // Scroll the main element
    main.value.scrollTo({
      top: scrollTop,
      behavior: 'smooth',
    });
  }
};

// Watch for route changes
watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug && newSlug.length > 0) {
      scrollToSection(newSlug[0]);
    }
  },
  { immediate: false }
);
</script>
