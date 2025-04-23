<template>
  <div class="relative">
    <button 
      @click="toggleDropdown" 
      class="flex items-center space-x-1 px-3 py-2 rounded-md transition duration-200 hover:bg-secondary-100"
    >
      <span>{{ $t('navigation.language') }}</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
      </svg>
    </button>
    
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div 
        v-if="isOpen" 
        class="absolute right-0 mt-2 py-2 w-40 bg-white rounded-md shadow-lg z-10 border border-secondary-200"
      >
        <NuxtLink 
          v-for="locale in availableLocales" 
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          @click="isOpen = false"
          class="block px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-100 hover:text-secondary-900"
        >
          {{ locale.name }}
        </NuxtLink>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const isOpen = ref(false);
const availableLocales = computed(() => {
  return locales.value.filter(l => l.code !== locale.value);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Handle click outside - fixed to call lifecycle hooks at the top level
const listener = (event) => {
  if (!isOpen.value) return;
  if (event.target && !event.composedPath().includes(document.querySelector('.relative'))) {
    isOpen.value = false;
  }
};

// Lifecycle hooks moved to the top level of setup function
onMounted(() => {
  if (process.client) {
    window.addEventListener('click', listener);
  }
});

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('click', listener);
  }
});
</script>