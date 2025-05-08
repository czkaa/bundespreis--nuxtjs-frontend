<template>
  <a
    :href="localePath('/')"
    class="pointer-events-auto fixed w-fit h-logotype transition-all duration-intro z-[100] ease-linear"
    :class="[
      isTop
        ? !isInit
          ? 'top-0 left-0 translate-y-[calc(50vh-50%-2.6rem)] md:translate-y-[calc(50vh-50%-2rem)] translate-x-[calc(50vw-50%-6.1rem)] md:translate-x-[calc(50vw-50%-4rem)]'
          : 'top-0 left-0 translate-0'
        : !isInit
        ? 'bottom-0 right-0 translate-y-[calc(-50vh+50%+2.6rem)] md:translate-y-[calc(-50vh+50%+2rem)] translate-x-[calc(-50vw+50%+6.1rem)] md:translate-x-[calc(-50vw+50%+0.5rem)]'
        : 'bottom-0 right-0 translate-0',
    ]"
    @click="handleClick()"
  >
    <h1 v-if="isTop" class="hidden">Bundespreis für Kunststudierende 2025</h1>
    <img src="/assets/icons/logotype-tl.svg" class="h-full" v-if="isTop" />
    <img src="/assets/icons/logotype-br.svg" class="h-full" v-else />
  </a>
</template>

<script setup>
import { useHashStore } from '~/stores/hash';
const localePath = useLocalePath();

const route = useRoute();
const hashStore = useHashStore();
const introStore = useIntroStore();
// const isInit = ref(introStore.isDone);
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
  isTop: {
    default: true,
  },
});
</script>
