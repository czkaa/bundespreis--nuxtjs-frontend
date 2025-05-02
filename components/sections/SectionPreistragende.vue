<template>
  <ul class="space-y-xs">
    <li
      v-for="(child, index) in section.children"
      :class="[
        (index + 1) % 4 === 3 || (index + 1) % 4 === 0 ? 'ml-indent-sm' : '',
      ]"
    >
      <NuxtLink :to="child.uri" class="block w-fit bg-black text-white pb-md">
        <BasicsHeading
          tag="h2"
          :text="child.title"
          class="h-[4.1rem] md:h-[2.25rem]"
      /></NuxtLink>
    </li>
  </ul>
</template>

<script setup>
const localePath = useLocalePath();
const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
});
</script>
