<template>
  <BasicsText
    :text="text"
    class="text-sm-serif font-serif"
    :class="{
      'pl-10': indent === 'small',
      'pl-20': indent === 'medium',
    }"
  />
</template>

<script setup>
const props = defineProps({
  text: String,
  indent: String,
});
</script>
