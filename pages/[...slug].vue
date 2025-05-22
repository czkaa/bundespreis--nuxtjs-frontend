<!-- pages/[...slug].vue -->
<template>
  <KeepAlive>
    <TemplatesHome v-if="template === 'home'" key="home" />
  </KeepAlive>

  <TemplatesPreistragende
    v-if="template === 'preistragende'"
    :key="route.fullPath"
  />
</template>

<script setup>
const route = useRoute();
const routeStore = useRouteStore();

const template = computed(() => {
  return routeStore.template;
});
</script>
