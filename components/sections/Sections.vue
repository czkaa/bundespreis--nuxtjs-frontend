<template>
  <div class="">
    <section v-for="section in sections" :key="section.slug" :id="section.slug">
      <Blocks :blocks="section.blocks" :isSection="true" />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { GAP_DURATION } from '../utils/tailwind';

const gap = useGapStore();

const props = defineProps({
  sections: {
    type: Array,
    required: true,
  },
});

const route = useRoute();
const main = ref(null);

onMounted(() => {
  if (document) {
    main.value = document.querySelector('main');
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

const handleRouteChange = () => {
  nextTick(() => {
    if (route.params.slug && route.params.slug.length > 0) {
      scrollToSection(route.params.slug[0]);
    } else if (route.path.includes('preistragende')) {
      scrollToSection('preistragende');
    } else if (route.path.includes('winners')) {
      scrollToSection('winners');
    }
  });
};

// Watch route changes with immediate: true to handle both initial load and route changes
watch(route, handleRouteChange, { immediate: true });
</script>
