<template>
  <div
    class="w-full h-frame-h overflow-hidden bg-white flex flex-col items-center justify-center pl-[var(--intro-pl)] pt-[var(--intro-pt)] pr-[var(--intro-pr)] pb-[var(--intro-pb)]"
  >
    <div
      ref="pseudoImage"
      class="w-intro-image-w h-intro-image-h absolute pointer-events-none"
    ></div>
    <div
      ref="pseudoContainer"
      class="w-intro-container-w h-intro-container-h absolute pointer-events-none"
    ></div>
    <ClientOnly>
      <div
        ref="introContainer"
        class="ease-linear duration-intro max-h-full max-w-full will-change-transform w-intro-container-w h-intro-container-h flex justify-center items-center relative"
        :style="introStyle"
      >
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
    </ClientOnly>
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
const pseudoImage = ref(null);
const pseudoContainer = ref(null);
const showPortrait = ref(false);

const scaleValues = ref(null);
const enableTransition = ref(false); // Add this flag

const calculateScale = async () => {
  if (pseudoImage.value && pseudoContainer.value) {
    scaleValues.value = {
      x: pseudoImage.value.clientWidth / pseudoContainer.value.clientWidth,
      y: pseudoImage.value.clientHeight / pseudoContainer.value.clientHeight,
    };
  }

  await nextTick();
  enableTransition.value = true;
};

const introStyle = computed(() => {
  if (!scaleValues.value) {
    return { transitionProperty: 'none' };
  }

  const baseStyle = !introStore.isStart
    ? {
        transform: `scale(${scaleValues.value.x}, ${scaleValues.value.y})`,
      }
    : {
        transform: 'scale(1, 1)',
      };

  return {
    ...baseStyle,
    transitionProperty: enableTransition.value ? 'transform' : 'none',
  };
});

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

selectRandomImages();

onMounted(async () => {
  await nextTick();
  calculateScale();
  checkViewportSize();
});

const handleImageLoaded = async (image) => {
  // Small delay to ensure transition is applied
  setTimeout(() => {
    introStore.setStart(true);
    setTimeout(() => {
      introStore.setScaled(true);
      setTimeout(() => {
        introStore.setDone(true);
      }, 1000);
    }, INTRO_DURATION);
  }, 50); // Small delay to ensure transition property is applied
};
</script>
