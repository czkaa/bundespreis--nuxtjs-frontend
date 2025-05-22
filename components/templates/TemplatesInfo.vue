<template>
  <Sections :sections="data.sections" v-if="data.sections" class="bg-red-300" />
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
</script>
