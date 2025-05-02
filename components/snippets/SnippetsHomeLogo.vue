<template>
  <NuxtLink
    :to="localePath('/')"
    class="pointer-events-auto absolute w-fit h-[7.6rem] transition-all duration-intro"
    :class="[
      isTop
        ? !isInit
          ? 'top-0 left-0 translate-y-[calc(50vh-50%-2.6rem)] md:translate-y-[calc(50vh-50%-2.1rem)] translate-x-[calc(50vw-50%-6.1rem)] md:translate-x-[calc(50vw-50%-2.9rem)]'
          : 'top-0 left-0 translate-0'
        : !isInit
        ? 'bottom-0 right-0 translate-y-[calc(-50vh+50%+2.6rem)] md:translate-y-[calc(-50vh+50%+2rem)] translate-x-[calc(-50vw+50%+5.5rem)] md:translate-x-[calc(-50vw+50%+2rem)]'
        : 'bottom-0 right-0 translate-0',
    ]"
    @click="handleClick()"
  >
    <img src="/assets/icons/logotype-tl.svg" class="h-full" v-if="isTop" />
    <img src="/assets/icons/logotype-br.svg" class="h-full" v-else />

    <h1 class="hidden" v-if="isTop">{{ title }}</h1>
  </NuxtLink>
</template>

<script setup>
import { useHashStore } from '~/stores/hash';
const localePath = useLocalePath();

const route = useRoute();
const hashStore = useHashStore();
const introStore = useIntroStore();
const isInit = ref(false);

const handleClick = () => {
  hashStore.setCurrentHash('');
  if (route.path === '/' || route.path === '/de' || route.path === '/en') {
    window.scrollTo(0, 0);
  }
};

onMounted(() => {
  setTimeout(() => {
    isInit.value = true;
  }, 1000);
});

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
