<template>
  <div>
    <Section
      v-for="(section, index) in sections"
      :key="section.id"
      :section="section"
      @sectionInView="handleSectionInView"
      :isFirst="index === 0"
      :isLast="index === sections.length - 1"
      :scrollDirection="scrollDirection"
    />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, watch, ref, nextTick } from 'vue';
import throttle from 'lodash.throttle';
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

// Existing flags
const isScrolling = ref(false);
const isUpdatingUrl = ref(false);
const watcherEnabled = ref(true);
const isInitialMount = ref(true);

// Scroll direction tracking
const scrollDirection = ref('down');
let lastScrollY = 0;

// Helper function to extract clean slug from route path
const cleanSlug = (routePath) => {
  if (!routePath) return null;

  // Remove leading/trailing slashes and split by '/'
  const segments = routePath.replace(/^\/+|\/+$/g, '').split('/');

  // Return the last segment (the actual slug)
  return segments.length > 0 && segments[segments.length - 1]
    ? segments[segments.length - 1]
    : null;
};

// Helper function to build new route path
const buildNewRoutePath = (newSlug) => {
  const currentPath = route.path;
  const currentSlug = cleanSlug(currentPath);

  if (currentSlug) {
    // Replace existing slug with new one
    const pathWithoutSlug = currentPath.substring(
      0,
      currentPath.lastIndexOf(currentSlug)
    );
    return `${pathWithoutSlug}${newSlug}`;
  } else {
    // Append new slug to current path
    return currentPath.endsWith('/')
      ? `${currentPath}${newSlug}`
      : `${currentPath}/${newSlug}`;
  }
};

// Throttled scroll handler to track direction
const handleScroll = throttle(() => {
  if (!process.client || isScrolling.value) return;

  const main = document.querySelector('main');
  if (!main) return;

  const currentScrollY = main.scrollTop;
  const newDirection = currentScrollY > lastScrollY ? 'down' : 'up';

  if (newDirection !== scrollDirection.value) {
    scrollDirection.value = newDirection;
  }

  lastScrollY = currentScrollY;
}, 16); // ~60fps throttling

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
        // Update lastScrollY after programmatic scroll
        lastScrollY = main.scrollTop;
        // Allow URL updates after initial mount is complete
        if (isInitialMount.value) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              isInitialMount.value = false;
            });
          });
        }
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
            // Update lastScrollY after programmatic scroll completes
            lastScrollY = currentScrollTop;
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
        // Update lastScrollY in case the check failed
        const main = document.querySelector('main');
        if (main) lastScrollY = main.scrollTop;
      }, 1000);
    }
  }
};

const handleSectionInView = async (slug) => {
  // Don't update URL during initial mount or while scrolling/updating
  if (isInitialMount.value || isScrolling.value || isUpdatingUrl.value) return;

  // Temporarily disable watcher
  watcherEnabled.value = false;
  isUpdatingUrl.value = true;

  try {
    // Build new route path using cleanSlug logic
    const newRoutePath = buildNewRoutePath(slug);
    console.log(newRoutePath);

    // Update URL through Vue Router
    await router.replace(localePath(newRoutePath));
  } catch (error) {
    console.warn('Router navigation failed:', error);
  } finally {
    // Re-enable watcher after a few frames
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        isUpdatingUrl.value = false;
        watcherEnabled.value = true;
      });
    });
  }
};

// Watch for route changes (smooth scroll for navigation)
watch(
  () => route.path,
  (newPath) => {
    if (!watcherEnabled.value || isScrolling.value || isUpdatingUrl.value)
      return;

    const slug = cleanSlug(newPath);

    if (slug) {
      scrollToElement(slug, false); // false = smooth scroll
    }
  }
);

onMounted(() => {
  if (!process.client) return;

  // Initialize scroll position
  const main = document.querySelector('main');
  if (main) {
    lastScrollY = main.scrollTop;
    // Add scroll listener
    main.addEventListener('scroll', handleScroll, { passive: true });
  }

  // Initial scroll on mount - instant (only on client)
  const currentSlug = cleanSlug(route.path);
  if (currentSlug) {
    console.log('Initial slug:', currentSlug);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToElement(currentSlug, true); // true = instant scroll on mount
      });
    });
  }
});

onUnmounted(() => {
  if (!process.client) return;

  const main = document.querySelector('main');
  if (main) {
    main.removeEventListener('scroll', handleScroll);
  }
  // Cancel any pending throttled calls
  handleScroll.cancel();
});
</script>
