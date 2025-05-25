<template>
  <div
    class="w-full h-frame-h overflow-hidden bg-white flex flex-col items-center justify-center pl-[var(--intro-pl)] pt-[var(--intro-pt)] pr-[var(--intro-pr)] pb-[var(--intro-pb)]"
    style="contain: layout"
  >
    <div
      ref="introContainer"
      class="transition-[width, height] ease-linear duration-intro max-h-full max-w-full will-change-[width, height]"
      :class="
        !introStore.isStart
          ? 'w-intro-image-w h-intro-image-h'
          : 'w-intro-container-w h-intro-container-h'
      "
    >
      <div class="w-full h-full flex justify-center items-center relative">
        <BasicsIntroImage
          v-if="randomPortraitImage && showPortrait"
          :image="randomPortraitImage"
          @imageLoaded="handleImageLoaded"
        />
        <BasicsIntroImage
          v-if="randomLandscapeImage && !showPortrait"
          :image="randomLandscapeImage"
          @imageLoaded="handleImageLoaded"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
const introStore = useIntroStore();
import { INTRO_DURATION, BREAKPOINT_MD } from '../utils/tailwind';

const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});

const randomPortraitImage = ref(null);
const randomLandscapeImage = ref(null);
const introContainer = ref(null);
const showPortrait = ref(false);

const introImages = computed(
  () => props.siteData?.introImages || { portrait: [], landscape: [] }
);

const selectRandomImages = () => {
  const { portrait, landscape } = introImages.value;

  if (portrait && portrait.length > 0) {
    const randomIndex = Math.floor(Math.random() * portrait.length);
    randomPortraitImage.value = portrait[randomIndex];
  }

  if (landscape && landscape.length > 0) {
    const randomIndex = Math.floor(Math.random() * landscape.length);
    randomLandscapeImage.value = landscape[randomIndex];
  }
};

const checkViewportSize = () => {
  showPortrait.value = window.innerWidth <= BREAKPOINT_MD;
};

onMounted(() => {
  selectRandomImages();
  checkViewportSize();
});

const handleImageLoaded = async (image) => {
  setTimeout(() => {
    introStore.setStart(true);
    setTimeout(() => {
      introStore.setScaled(true);
      setTimeout(() => {
        introStore.setDone(true);
      }, 1000);
    }, INTRO_DURATION);
  }, 1000);
};
</script>
