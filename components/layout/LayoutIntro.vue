<template>
  <div
    class="w-full h-frame-h overflow-hidden bg-white flex flex-col items-center justify-center"
  >
    <div
      ref="introContainer"
      class="absolute top-[var(--intro-pt)] left-[var(--intro-pl)] w-intro-container-w h-intro-container-h transition-transform ease-linear duration-intro -mt-[1px] transform-gpu"
      :class="!introStore.isStart ? 'scale-[4%]' : 'w-full h-full'"
    >
      <div class="w-full h-full flex justify-center items-center relative">
        <BasicsIntroImage
          v-if="randomPortraitImage && showPortrait"
          :image="randomPortraitImage"
          @imageLoaded="handleImageLoaded"
          class="relative z-10 [&>img]:h-full [&>img]:w-full flex justify-center"
        />
        <BasicsIntroImage
          v-if="randomLandscapeImage && !showPortrait"
          :image="randomLandscapeImage"
          @imageLoaded="handleImageLoaded"
          class="relative z-10 [&>img]:h-auto [&>img]:w-full flex justify-center"
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
  console.log('Image loaded');
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
