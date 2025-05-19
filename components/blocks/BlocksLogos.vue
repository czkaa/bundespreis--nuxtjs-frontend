<template>
  <ul class="grid grid-cols-3 gap-sm">
    <li v-for="logo in logos" class="flex flec-col items-center justify-center">
      <BasicsImage :image="logo" class="my-auto" />
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  logos: String,
});
</script>
