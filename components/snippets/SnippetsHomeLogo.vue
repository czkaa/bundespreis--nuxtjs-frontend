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
          ? 'top-0 z-10 left-0 translate-y-[calc(50dvh-100%+1.3rem)] translate-x-[calc(50dvw-100%+5.6rem)] md:translate-y-[calc(50dvh-100%+1.9rem)]'
          : 'top-0 left-0 translate-0'
        : !introStore.isStart && introStore.isIntro
        ? 'bottom-0 right-0 translate-y-[calc(-50dvh+100%-1.55rem)] md:translate-y-[calc(-50dvh+100%-1rem)]  translate-x-[calc(-50vw+100%-13rem)]'
        : 'bottom-0 right-0 translate-0',
    ]"
    @click="handleClick()"
  >
    <h1 v-if="isTop" class="hidden">Bundespreis für Kunststudierende 2025</h1>

    <IconsLogoTopLeft
      alt="Logo Bundespreis für Kunststudierende 2025"
      class="block h-logotype"
      v-if="isTop"
    />
    <IconsLogoBottomRight
      alt="Logo Bundespreis für Kunststudierende 2025"
      class="block h-logotype"
      v-else="isTop"
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
