<template>
  <component
    :is="tag"
    lang="de"
    basics-heading
    :class="[
      {
        'font-sans text-xl  first-letter:uppercase': tag === 'h2',
        'font-sans text-lg   first-letter:uppercase': tag === 'h3',
        'font-serif text-sm ml-indent-sm first-letter:uppercase': tag === 'h4',
      },
    ]"
    >{{ text }}
  </component>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
  },
  tag: {
    type: String,
    default: 'h3',
  },
});
</script>
