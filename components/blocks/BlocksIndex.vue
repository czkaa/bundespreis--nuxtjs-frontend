<template>
  <div blocks-index class="w-full">
    <BlocksText
      v-if="block.type === 'customtext'"
      :text="block.content.text"
      class="mt-md"
      :class="{
        'pl-10': block.content.indent === 'small',
        'pl-20': block.content.indent === 'medium',
      }"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  block: Object,
});
</script>
