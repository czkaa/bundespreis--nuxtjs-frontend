<template>
  <TemplatesInfo
    v-if="routeStore.template === 'info'"
    :key="routeStore.template"
  />
  <TemplatesPreistragende
    v-else-if="routeStore.template === 'preistragende'"
    :key="routeStore.fullPath"
  />
  <TemplatesLanding
    v-else-if="routeStore.template === 'landing'"
    :key="routeStore.template"
  />
  <TemplatesHome v-else :key="routeStore.template" />
</template>

<script setup>
const routeStore = useRouteStore();

watch(
  () => routeStore.template,
  (newVal, oldVal) => {
    console.log('🔄 Template changed:', oldVal, '->', newVal);
  }
);
</script>
