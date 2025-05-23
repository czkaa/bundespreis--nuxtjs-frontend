<template>
  <TemplatesInfo
    v-if="routeStore.template === 'info'"
    :key="routeStore.template"
  />
  <TemplatesPreistragende
    v-else-if="routeStore.template === 'preistragende'"
    :key="routeStore.route"
  />
  <TemplatesLanding
    v-else-if="routeStore.template === 'landing'"
    :key="routeStore.template"
  />
  <TemplatesHome v-else :key="routeStore.template" />
</template>

<script setup>
const routeStore = useRouteStore();
</script>
