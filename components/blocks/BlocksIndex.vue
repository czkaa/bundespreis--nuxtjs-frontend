<template>
  <div blocks-index class="w-full">
    <BlocksText
      v-if="block.type === 'customtext'"
      :text="block.content.text"
      :indent="block.content.text"
    />
    <BlocksLogos
      v-if="block.type === 'customlogos'"
      :logos="block.content.logos"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  block: Object,
});
</script>
