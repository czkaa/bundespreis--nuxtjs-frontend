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

const scrollToSection = (slug) => {
  if (!slug || !main.value) return;

  const section = document.getElementById(slug);
  if (section) {
    main.value.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth',
    });
  }
};

watch(
  () => [route.path, route.params.slug],
  ([newPath, newSlug]) => {
    // Check if one of the aliased paths
    if (newPath.includes('preistragende')) {
      scrollToSection('preistragende');
    } else if (newPath.includes('winners')) {
      scrollToSection('winners');
    } else if (newSlug && newSlug.length > 0) {
      scrollToSection(newSlug[0]);
    }
  },
  { immediate: true } // Consider setting to true to handle initial route
);
</script>
