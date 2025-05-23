<template>
  <div class="">
    <Section
      v-for="section in sections"
      :key="section.id"
      :section="section"
      :scrollDirection="scrollDirection"
      @sectionInView="handleSectionInView"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import Section from './Section.vue';

const routeStore = useRouteStore();
const router = useRouter();
const { $localePath } = useNuxtApp();

const props = defineProps({
  sections: {
    type: Array,
    required: true,
  },
});

const main = ref(null);
const lastScrollTop = ref(0);
const scrollDirection = ref('down');

// Flags to prevent infinite loops
const isScrollingProgrammatically = ref(false);
const isUpdatingRouteFromScroll = ref(false);

onMounted(() => {
  if (document) {
    main.value = document.querySelector('main');
    scrollToSection(routeStore.route, 'instant');

    // Track scroll direction
    if (main.value) {
      main.value.addEventListener('scroll', handleScroll);
    }
  }
});

const handleScroll = () => {
  if (!main.value || isScrollingProgrammatically.value) return;

  const currentScrollTop = main.value.scrollTop;
  scrollDirection.value =
    currentScrollTop > lastScrollTop.value ? 'down' : 'up';
  lastScrollTop.value = currentScrollTop;
};

onMounted(() => {
  if (document) {
    main.value = document.querySelector('main');
    scrollToSection(routeStore.route, 'instant');
  }
});

const scrollToSection = (route, behavior) => {
  const slug = route?.split('/').pop();
  if (!slug || !main.value) return;

  const section = document.getElementById(slug);
  if (section) {
    // Set flag to indicate programmatic scrolling
    isScrollingProgrammatically.value = true;

    main.value.scrollTo({
      top: section.offsetTop,
      behavior: behavior,
    });

    // Reset flag after scroll completes
    setTimeout(
      () => {
        isScrollingProgrammatically.value = false;
      },
      behavior === 'smooth' ? 500 : 100
    );
  }
};

const handleSectionInView = async (slug) => {
  // Don't update route if we're currently scrolling programmatically
  if (isScrollingProgrammatically.value || isUpdatingRouteFromScroll.value) {
    return;
  }

  // Set flag to prevent watcher from triggering scroll
  isUpdatingRouteFromScroll.value = true;

  try {
    const newPath = $localePath(`/${slug}`);
    await router.push(newPath);
  } catch (error) {
    console.error('Error updating route:', error);
  } finally {
    // Reset flag after route update
    setTimeout(() => {
      isUpdatingRouteFromScroll.value = false;
    }, 100);
  }
};

// Watch route changes and scroll accordingly (but not when updating from scroll)
watch(
  () => routeStore.route,
  (route) => {
    if (!isUpdatingRouteFromScroll.value) {
      scrollToSection(route, 'smooth');
    }
  }
);
</script>
