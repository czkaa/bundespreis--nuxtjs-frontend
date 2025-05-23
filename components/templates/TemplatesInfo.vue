<template>
  <Transition name="fade">
    <Sections :sections="data.sections" v-if="data" />
  </Transition>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});
const gap = useGapStore();
const localePath = useLocalePath();

const { data: data } = await useFetch(() => `/api${localePath('/info')}`);

watch(
  () => routeStore.route,
  async () => {
    await refresh(); // This will re-fetch the data
  },
  { immediate: false }
);
</script>
