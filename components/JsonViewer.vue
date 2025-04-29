<template>
  <div>
    <pre
      class="text-sm font-mono bg-gray-50 p-4 overflow-x-auto transition-opacity duration-300 ease-in-out"
      :class="{ 'opacity-0': !isVisible, 'opacity-100': isVisible }"
    ><code v-html="highlightedJson"></code></pre>
  </div>
</template>

<script setup>
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import { ref, onMounted, computed } from 'vue';

hljs.registerLanguage('json', json);

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const isVisible = ref(false);

onMounted(() => {
  // Add slight delay before showing content for animation
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

const highlightedJson = computed(() => {
  try {
    const jsonString = JSON.stringify(props.data, null, 2);
    return hljs.highlight(jsonString, { language: 'json' }).value;
  } catch (e) {
    console.error('Error highlighting JSON:', e);
    return JSON.stringify(props.data, null, 2);
  }
});
</script>

<style>
/* Highlight.js JSON syntax highlighting */
.hljs-attr {
  color: #0550ae;
}
.hljs-string {
  color: #1a7f37;
}
.hljs-number,
.hljs-literal {
  color: #953800;
}
.hljs-punctuation {
  color: #24292f;
}
</style>
