<template>
  <div class="">
    <section v-for="section in sections" :key="section.slug" :id="section.slug">
      <Blocks :blocks="section.blocks" :isSection="true" />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
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

onMounted(async () => {
  if (document) {
    main.value = document.querySelector('main');

    if (route.params.slug && route.params.slug.length > 0) {
      nextTick(() => {
        scrollToSection(route.params.slug[0]);
      });
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
  async ([newPath, newSlug]) => {
    // Check if one of the aliased paths
    if (newPath.includes('preistragende')) {
      scrollToSection('preistragende');
      setTimeout(() => {
        gap.setGap(true);
      }, 100);
    } else if (newPath.includes('winners')) {
      scrollToSection('winners');
      setTimeout(() => {
        gap.setGap(true);
      }, 100);
    }
  },
  { immediate: true }
);
</script>
