<template>
  <ul class="list-none space-y-xs">
    <li class="flex gap-sm" v-for="(item, index) in items" :key="index">
      <BasicsText
        :text="item.year"
        class="block font-sans text-sm-sans text-right whitespace-nowrap tabular-nums tracking-[-0.01em] w-40 shrink-0"
      />
      <BasicsText :text="item.text" />
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  items: Array,
});
</script>
