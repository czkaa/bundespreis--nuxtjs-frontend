<template>
  <NuxtLink
    :to="localePath('/')"
    class="pointer-events-auto absolute w-fit"
    :class="[isTop ? 'top-0 left-0' : 'bottom-0 right-0']"
    @click="handleClick()"
  >
    <img src="/assets/icons/logotype-tl.svg" class="h-[4.6rem]" v-if="isTop" />
    <img src="/assets/icons/logotype-br.svg" class="h-[4.6rem]" v-else />

    <h1 class="hidden" v-if="isTop">{{ title }}</h1>
  </NuxtLink>
</template>

<script setup>
import { useHashStore } from '~/stores/hash';
const localePath = useLocalePath();

const route = useRoute();
const hashStore = useHashStore();

const handleClick = () => {
  hashStore.setCurrentHash('');
  if (route.path === '/' || route.path === '/de' || route.path === '/en') {
    window.scrollTo(0, 0);
  }
};

defineProps({
  title: {
    type: String,
    required: true,
  },
  isTop: {
    default: true,
  },
});
</script>
