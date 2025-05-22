<template>
  <div class="z-[200] fixed top-0 left-0 p-sm bg-red-600">{{ route }}</div>
  <TemplatesInfo v-if="template === 'info'" />
  <TemplatesPreistragende v-else-if="template === 'preistragende'" />
  <TemplatesHome v-else />
</template>

<script setup>
const route = useRoute();
const gap = useGapStore();
const routeStore = useRouteStore();

const template = computed(() => {
  return routeStore.template;
});
</script>
