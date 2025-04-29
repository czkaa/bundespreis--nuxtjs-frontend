<template>
  <div v-if="items && items.length">
    <ul class="list-none space-y-2">
      <li v-for="(item, index) in items" :key="index" class="flex space-x-2">
        <span class="font-bold shrink-0 text-right w-32">{{ item.year }}</span>
        <div class="text">{{ item.text }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
const props = defineProps({
  items: Array,
});
</script>
