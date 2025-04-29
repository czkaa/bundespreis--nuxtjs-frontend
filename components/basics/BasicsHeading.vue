<template>
  <component
    :is="tag"
    lang="de"
    basics-heading
    class=""
    :class="[
      {
        'hyphens-auto text-xl': tag === 'h2',
        'hyphens-auto text-lg': tag === 'h3',
        'text-md': tag === 'h4',
        '': tag === 'h5',
      },
    ]"
  >
    {{ text }}
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
