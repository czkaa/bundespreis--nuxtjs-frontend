<template>
  <button @click="toggleLanguage" class="w-tag h-tag">
    <BasicsNavItem :text="currentLang.toUpperCase()" class="items-end" />
  </button>
</template>

<script setup>
const { currentLang, toggleLanguage } = useLanguage();
</script>
