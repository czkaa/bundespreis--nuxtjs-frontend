<template>
  <div class="flex items-center space-x-3">
    <!-- <button
      @click="gap.toggle()"
      class="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
    >
      Gap {{ gap.isEnabled ? 'On' : 'Off' }}
    </button> -->
    <button
      @click="toggleLanguage"
      class="text-center flex justify-center items-center"
    >
      <BasicsTag :text="currentLang.toUpperCase()" />
    </button>
  </div>
</template>

<script setup>
const { currentLang, toggleLanguage } = useLanguage();
</script>
