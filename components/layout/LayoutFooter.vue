<template>
  <footer
    ref="footerEl"
    class="footer z-50 relative pointer-events-auto"
    id="dynamic-footer"
  >
    <div
      class="transition-all duration-500 ease-in-out flex justify-start items-end gap-2"
      :class="isVisible && !gap.isGap ? 'translate-y-0' : 'translate-y-full'"
    >
      <LayoutFooterPages :siteData="siteData" />
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGapStore } from '../stores/gap';

// Get the gap store
const gap = useGapStore();

const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});

const footerEl = ref(null);
const isVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible.value = entry.isIntersecting;
      });
    },
    { threshold: 0.01 }
  );

  if (footerEl.value) {
    observer.observe(footerEl.value);
  }
});
</script>
