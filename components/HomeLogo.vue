<template>
  <NuxtLink to="/" class="pointer-events-auto">
    <img src="/assets/icons/logotype-tl.svg" class="h-[4.6rem]" />
    <h1 class="hidden">{{ title }}</h1>
  </NuxtLink>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
