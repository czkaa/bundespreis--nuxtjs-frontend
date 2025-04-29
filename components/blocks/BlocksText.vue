<template>
  <BasicsText :text="text" class="text-sm-serif font-serif" />
</template>

<script setup>
const props = defineProps({
  text: String,
});
</script>
