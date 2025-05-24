<template>
  <div>
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
import { ref, onMounted, onUnmounted, watch } from 'vue';
import Section from './Section.vue';

const router = useRouter();
const route = useRoute();
const localePath = useLocalePath();

const props = defineProps({
  sections: {
    type: Array,
    required: true,
  },
});

const main = ref(null);
const lastScrollTop = ref(0);
const routeStore = useRouteStore();
const scrollDirection = ref('down');

// Flags to prevent infinite loops
const isScrollingProgrammatically = ref(true);

let scrollTimeout = null;
let triggerScrollTimeout = null;

const handleScroll = () => {
  if (!main.value || isScrollingProgrammatically.value) return;

  const currentScrollTop = main.value.scrollTop;
  scrollDirection.value =
    currentScrollTop > lastScrollTop.value ? 'down' : 'up';
  lastScrollTop.value = currentScrollTop;
};

const scrollToElement = (slug) => {
  const section = document.getElementById(slug);
  if (!section || !slug || !main.value) return;
  isScrollingProgrammatically.value = true;
  main.value.scrollTo({
    top: section.offsetTop,
    behavior: 'smooth',
  });
  // Reset flag after scroll completes
  scrollTimeout = setTimeout(() => {
    isScrollingProgrammatically.value = false;
  }, 2000);
};

const handleSectionInView = async (slug) => {
  if (!isScrollingProgrammatically.value) {
    window.history.replaceState({}, '', localePath(`/${slug}`));
    routeStore.setScrollTrigger(slug);
  }
};

onMounted(() => {
  console.log(route.params.slug);
  setTimeout(() => {
    scrollToElement(route.params.slug);
  }, 100);

  if (document) {
    main.value = document.querySelector('main');
    if (main.value) {
      main.value.addEventListener('scroll', handleScroll);
    }
  }
});

onUnmounted(() => {
  if (main.value) {
    main.value.removeEventListener('scroll', handleScroll);
  }
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  if (triggerScrollTimeout) {
    clearTimeout(triggerScrollTimeout);
  }
});
</script>
