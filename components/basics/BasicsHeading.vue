<template>
  <component
    :is="tag"
    lang="de"
    basics-heading
    class="font-sans"
    :class="[
      {
        'text-xl md:text-xl-md capitalize': tag === 'h2',
        'text-lg md:text-lg-md md:hyphens-auto capitalize': tag === 'h3',
        'text-sm-sans ml-indent-sm capitalize': tag === 'h4',
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
