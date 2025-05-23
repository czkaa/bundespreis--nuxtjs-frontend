<template>
  <ul class="list-none space-y-xs" blocks-list>
    <li class="flex gap-sm" v-for="(item, index) in items" :key="index">
      <BasicsText
        :text="item.year"
        class="block font-sans text-sm-sans text-right whitespace-nowrap w-40 shrink-0 tabular-nums tracking-tighter [&_span]:normal-nums [&_span]:tracking-normal"
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
