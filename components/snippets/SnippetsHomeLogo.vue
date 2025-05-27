<template>
  <a
    :href="localePath('/')"
    :tabindex="isTop ? 1 : -1"
    :aria-label="$t('reloadPage')"
    class="pointer-events-auto fixed w-fit z-[100]"
    :class="[
      {
        'transition-all duration-intro ease-linear pointer-events-none':
          !introStore.isDone,
      },
      isTop
        ? !introStore.isStart && introStore.isIntro
          ? 'top-0 z-10 left-0 translate-y-[calc(50dvh-100%+1.3rem)] translate-x-[calc(50dvw-100%+5.6rem)]'
          : 'top-0 left-0 translate-0'
        : !introStore.isStart && introStore.isIntro
        ? 'bottom-0 right-0 translate-y-[calc(-50dvh+100%-1.55rem)] translate-x-[calc(-50vw+100%-13rem)]'
        : 'bottom-0 right-0 translate-0',
    ]"
    @click="handleClick()"
  >
    <h1 v-if="isTop" class="hidden">Bundespreis für Kunststudierende 2025</h1>

    <img
      alt="Logo Bundespreis für Kunststudierende 2025"
      src="/assets/icons/logotype-br.svg"
      class="h-logotype"
      v-else
    />

    <img
      alt="Logo Bundespreis für Kunststudierende 2025"
      src="/assets/icons/logotype-tl.svg"
      class="h-logotype"
      v-if="isTop"
    />
  </a>
</template>

<script setup>
const localePath = useLocalePath();
const introStore = useIntroStore();

defineProps({
  isTop: {
    default: true,
  },
});
</script>
