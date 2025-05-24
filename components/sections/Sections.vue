<template>
  <div>
    <Section
      v-for="section in sections"
      :key="section.id"
      :section="section"
      @sectionInView="handleSectionInView"
    />
  </div>
</template>

<script setup>
import Section from './Section.vue';

const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();

const props = defineProps({
  sections: {
    type: Array,
    required: true,
  },
});

// Flags to control when to update URL vs scroll
const isScrolling = ref(false);
const isUpdatingUrl = ref(false);
const watcherEnabled = ref(true);

const scrollToElement = (slug, instant = false) => {
  // Only run on client side
  if (!process.client) return;

  const main = document.querySelector('main');
  const section = document.getElementById(slug);
  if (section && main) {
    isScrolling.value = true;

    if (instant) {
      main.scrollTo({
        top: section.offsetTop,
        behavior: 'instant',
      });
      // For instant scroll, we can immediately reset
      requestAnimationFrame(() => {
        isScrolling.value = false;
      });
    } else {
      // For smooth scroll, track with requestAnimationFrame
      const targetScrollTop = section.offsetTop;
      let lastScrollTop = main.scrollTop;
      let stableFrames = 0;

      const checkScrollComplete = () => {
        const currentScrollTop = main.scrollTop;

        // Check if scroll position has stabilized (within 1px tolerance)
        if (Math.abs(currentScrollTop - lastScrollTop) < 1) {
          stableFrames++;
          // If position is stable for 3 frames and we're close to target
          if (
            stableFrames >= 3 &&
            Math.abs(currentScrollTop - targetScrollTop) < 5
          ) {
            isScrolling.value = false;
            return;
          }
        } else {
          stableFrames = 0;
        }

        lastScrollTop = currentScrollTop;
        requestAnimationFrame(checkScrollComplete);
      };

      main.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      });

      requestAnimationFrame(checkScrollComplete);

      // Fallback timeout as safety net
      setTimeout(() => {
        isScrolling.value = false;
      }, 2000);
    }
  }
};

const handleSectionInView = async (slug) => {
  if (isScrolling.value || isUpdatingUrl.value) return;

  // Temporarily disable watcher
  watcherEnabled.value = false;
  isUpdatingUrl.value = true;

  try {
    // Update URL through Vue Router
    await router.replace(localePath(`/${slug}`));
  } catch (error) {
    console.warn('Router navigation failed:', error);
  } finally {
    // Re-enable watcher after a brief delay
    setTimeout(() => {
      isUpdatingUrl.value = false;
      watcherEnabled.value = true;
    }, 100);
  }
};

// Watch for route changes (smooth scroll for navigation)
watch(
  () => route.params.slug,
  (newSlug) => {
    if (!watcherEnabled.value || isScrolling.value || isUpdatingUrl.value)
      return;

    console.log('Route changed to:', newSlug);
    if (newSlug?.length > 0) {
      const slug = newSlug[0];
      scrollToElement(slug, false); // false = smooth scroll
    }
  }
);

onMounted(() => {
  // Initial scroll on mount - instant (only on client)
  if (process.client && route.params.slug?.length > 0) {
    console.log('Initial slug:', route.params.slug);
    const targetSlug = route.params.slug[0];
    setTimeout(() => {
      scrollToElement(targetSlug, true); // true = instant scroll on mount
    }, 200);
  }
});
</script>
