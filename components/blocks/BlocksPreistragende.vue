<template>
  <ul class="space-y-xs">
    <li
      v-for="(child, index) in children"
      :class="[
        (index + 1) % 4 === 3 || (index + 1) % 4 === 0 ? 'ml-indent-sm' : '',
      ]"
    >
      <NuxtLink
        :to="localePath('/' + child.uri)"
        class="block w-fit bg-black text-white pb-xs"
      >
        <BasicsHeading tag="h2" :text="child.title"
      /></NuxtLink>
    </li>
  </ul>
</template>

<script setup>
const localePath = useLocalePath();

const props = defineProps({
  children: Array,
});
</script>
