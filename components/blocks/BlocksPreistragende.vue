<template>
  <ul class="space-y-2 pt-offset-content">
    <li
      v-for="(child, index) in children"
      :class="[
        (index + 1) % 4 === 3 || (index + 1) % 4 === 0 ? 'ml-indent-sm' : '',
      ]"
    >
      <NuxtLink
        :to="localePath('/' + child.uri)"
        class="inline leading-[1.2] py-0 text-xl font-sans bg-black text-white relative"
      >
        {{ child.title }}</NuxtLink
      >
    </li>
  </ul>
</template>

<script setup>
const localePath = useLocalePath();

const props = defineProps({
  children: Array,
});
</script>
