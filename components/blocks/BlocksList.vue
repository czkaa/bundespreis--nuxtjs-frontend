<template>
  <ul class="list-none grid [grid-template-columns:max-content_1fr] gap-x-md">
    <template v-for="(item, index) in items" :key="index">
      <BasicsText
        :text="item.year"
        class="block font-sans text-sm-sans text-right whitespace-nowrap tabular-nums tracking-[-0.06em]"
      />
      <BasicsText :text="item.text" />
    </template>
  </ul>
</template>

<script setup>
const props = defineProps({
  items: Array,
});
</script>
