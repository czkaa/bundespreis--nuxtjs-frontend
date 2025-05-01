<template>
  <NuxtLink
    :to="switchLocalePath($i18n.locale === 'de' ? 'en' : 'de')"
    class="w-tag h-tag text-primary-600 hover:text-primary-800 transition-colors duration-200 text-center"
  >
    <BasicsNavItem :text="$i18n.locale.toUpperCase()" class="items-end" />
  </NuxtLink>
</template>

<script setup>
const switchLocalePath = useSwitchLocalePath();
</script>
