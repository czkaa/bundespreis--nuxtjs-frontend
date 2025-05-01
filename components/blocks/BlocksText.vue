<template>
  <BasicsText
    :text="text"
    class="text-sm-serif font-serif"
    :class="{
      'ml-indent-sm': indent === 'small',
      'ml-indent-md': indent === 'medium',
    }"
  />
</template>

<script setup>
const props = defineProps({
  text: String,
  indent: String,
});
</script>
