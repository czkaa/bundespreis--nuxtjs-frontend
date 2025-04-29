<template>
  <footer
    ref="footerEl"
    class="footer z-50 snap-end snap-always pointer-events-auto"
    id="dynamic-footer"
  >
    <div
      class="transition-all duration-300 ease-in-out flex justify-start items-end gap-2"
      :class="isVisible ? 'translate-y-0' : 'translate-y-full'"
    >
      <LayoutFooterPages :siteData="siteData" />
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';

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
