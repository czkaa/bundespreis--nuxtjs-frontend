<template>
  <component
    :is="tag"
    lang="de"
    basics-heading
    :class="[
      {
        'font-sans text-xl first-letter:uppercase': size === 'large',
        'font-sans text-lg first-letter:uppercase': size === 'medium',
        'font-serif text-sm ml-indent-sm first-letter:uppercase':
          size === 'small' || size === undefined,
      },
    ]"
  >
    <span v-html="kirbytext" v-if="kirbytext" />
    <span v-else> {{ text }}</span>
  </component>
</template>

<script setup>
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
  size: {
    type: String,
    default: 'small',
  },
});
</script>
