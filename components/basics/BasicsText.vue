<template>
  <div v-if="formattedText" class="w-full" v-html="formattedText"></div>
</template>

<script setup>
const props = defineProps({
  text: String,
});

const formattedText = computed(() => {
  return props.text ? props.text.replaceAll('<a', '<a target="_blank"') : null;
});
</script>
