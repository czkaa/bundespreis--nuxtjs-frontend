<template>
  <Sections :sections="data.sections" />
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});

onMounted(() => {
  console.log('MOUNT :');
});
</script>
