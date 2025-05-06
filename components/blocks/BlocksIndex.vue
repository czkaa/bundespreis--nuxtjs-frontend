<template>
  <div blocks-index class="w-full">
    <BlocksText
      v-if="block.type === 'customtext'"
      :text="block.content.text"
      :indent="block.content.indent"
    />

    <BlocksList
      v-if="block.type === 'customlist'"
      :items="block.content.items"
    />

    <BlocksHeading
      v-if="block.type === 'customheading'"
      :text="block.content.text"
      :level="block.content.level"
      :indent="block.content.indent"
    />

    <BlocksPreistragende
      v-if="block.type === 'custompreistragende'"
      :children="block.content.children"
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
