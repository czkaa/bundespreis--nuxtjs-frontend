<template>
  <ul class="list-none space-y-xs" blocks-list>
    <li class="flex gap-sm" v-for="(item, index) in items" :key="index">
      <div class="w-40 shrink-0">
        <BasicsText
          :text="item.year"
          class="block font-sans [&_*]:font-sans [&_*]:font-semibold text-sm-sans text-right whitespace-nowrap tabular-nums tracking-tighter [&_span]:normal-nums [&_span]:tracking-normal"
        />
      </div>

      <BasicsText :text="item.text" />
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  items: Array,
});
</script>
