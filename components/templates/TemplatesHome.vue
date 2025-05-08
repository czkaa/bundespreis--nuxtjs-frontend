<template>
  <Sections v-if="data?.sections" :sections="data.sections" />
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});

const gap = useGapStore();
const route = useRoute();

onMounted(() => {
  if (route.params.slug?.length > 0) {
    setTimeout(() => {
      gap.setGap(true);
    });
  }
});
</script>
