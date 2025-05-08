<template>
  <Sections :sections="data.sections" />
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});
const route = useRoute();
const gap = useGapStore();

onMounted(() => {
  setTimeout(() => {
    gap.setGap(true);
  });
});
</script>
