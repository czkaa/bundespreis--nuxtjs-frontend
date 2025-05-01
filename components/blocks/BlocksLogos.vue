<template>
  <ul class="flex grid-cols-3">
    <li v-for="logo in logos">
      <BasicsImage :image="logo" />
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  logos: String,
});
</script>
