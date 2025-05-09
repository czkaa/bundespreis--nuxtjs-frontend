<template>
  <component
    :is="tag"
    lang="de"
    basics-heading
    :class="[
      {
        'font-sans text-xl first-letter:uppercase': tag === 'h2',
        'font-sans text-lg first-letter:uppercase': tag === 'h3',
        'font-serif text-sm ml-indent-sm first-letter:uppercase': tag === 'h4',
      },
    ]"
  >
    <span v-html="kirbytext" v-if="kirbytext" />
    <span v-else> {{ text }}</span>
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
  },
  kirbytext: {
    type: String,
  },
  tag: {
    type: String,
    default: 'h3',
  },
});
</script>
