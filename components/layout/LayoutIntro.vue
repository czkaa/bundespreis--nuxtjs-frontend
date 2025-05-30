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
        class="ease-in max-h-full max-w-full will-change-transform w-intro-container-w h-intro-container-h flex justify-center items-center relative overflow-hidden"
        :style="containerStyle"
      >
        <BasicsIntroImage
          class="!ease-out"
          v-if="randomPortraitImage && showPortrait && isImageVisible"
          :image="randomPortraitImage"
          :style="imageStyle"
          @imageLoaded="handleImageLoaded"
        />
        <BasicsIntroImage
          class="ease-out"
          v-if="randomLandscapeImage && !showPortrait && isImageVisible"
          :image="randomLandscapeImage"
          :style="imageStyle"
          @imageLoaded="handleImageLoaded"
        />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
const introStore = useIntroStore();
import { INTRO_DURATION, BREAKPOINT_MD } from '../utils/tailwind';

const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});

// Refs
const introContainer = ref(null);
const pseudoImage = ref(null);
const pseudoContainer = ref(null);

// State
const randomPortraitImage = ref(null);
const randomLandscapeImage = ref(null);
const showPortrait = ref(false);
const imageLoaded = ref(false);
const scaleCalculated = ref(false);
const initialStyleApplied = ref(false);
const scaleValues = ref(null);

// Computed properties
const containerStyle = computed(() => {
  if (!scaleValues.value || !initialStyleApplied.value) {
    return {
      opacity: '0',
    };
  }

  return {
    opacity: '1',
    transform: scaleValues.value.isScaled
      ? 'scale(1, 1)'
      : `scale(${scaleValues.value.x}, ${scaleValues.value.y})`,
    transitionProperty: scaleValues.value.isScaled ? 'transform' : 'none',
    transitionDuration: scaleValues.value.isScaled
      ? `${INTRO_DURATION}ms`
      : '0ms',
  };
});

const imageStyle = computed(() => {
  if (!scaleValues.value || !initialStyleApplied.value) {
    return {};
  }

  const scaleX = scaleValues.value.x;
  const scaleY = scaleValues.value.y;
  const maxScale = Math.max(scaleX, scaleY);
  const imageScaleX = maxScale / scaleX;
  const imageScaleY = maxScale / scaleY;

  if (scaleValues.value.isScaled) {
    return {
      transform: 'scale(1, 1)',
      transitionProperty: 'transform',
      transitionDuration: `${INTRO_DURATION}ms`,
      transitionTimingFunction: 'ease-our',
    };
  }

  // Initial state: counter-scaled
  return {
    transform: `scale(${imageScaleX}, ${imageScaleY})`,
    transitionProperty: 'none',
  };
});

const isImageVisible = computed(() => {
  return initialStyleApplied.value;
});

const isReadyForTransition = computed(() => {
  return (
    imageLoaded.value && scaleCalculated.value && initialStyleApplied.value
  );
});

const introImages = computed(
  () => props.siteData?.introImages || { portrait: [], landscape: [] }
);

// Methods
const calculateScale = async () => {
  if (!pseudoImage.value || !pseudoContainer.value) return;

  await nextTick();

  const scaleX =
    pseudoImage.value.clientWidth / pseudoContainer.value.clientWidth;
  const scaleY =
    pseudoImage.value.clientHeight / pseudoContainer.value.clientHeight;

  scaleValues.value = {
    x: scaleX,
    y: scaleY,
    isScaled: false,
  };

  scaleCalculated.value = true;

  // Apply initial style after a small delay to ensure proper rendering
  await nextTick();
  initialStyleApplied.value = true;
};

const handleImageLoaded = () => {
  imageLoaded.value = true;
};

const startTransition = () => {
  setTimeout(() => {
    // Trigger the scale transition
    scaleValues.value = {
      ...scaleValues.value,
      isScaled: true,
    };
    introStore.setStart(true);

    // Handle completion timing
    setTimeout(() => {
      introStore.setScaled(true);
      setTimeout(() => {
        introStore.setDone(true);
      }, 1000);
    }, INTRO_DURATION);
  }, 500);
};

const selectRandomImages = () => {
  const { portrait, landscape } = introImages.value;

  if (portrait?.length > 0) {
    const randomIndex = Math.floor(Math.random() * portrait.length);
    randomPortraitImage.value = portrait[randomIndex];
  }

  if (landscape?.length > 0) {
    const randomIndex = Math.floor(Math.random() * landscape.length);
    randomLandscapeImage.value = landscape[randomIndex];
  }

  // Preload the selected image
  const selectedImage = showPortrait.value
    ? randomPortraitImage.value
    : randomLandscapeImage.value;
  if (selectedImage?.src) {
    const img = new Image();
    img.src = selectedImage.src;
  }
};

const checkViewportSize = () => {
  showPortrait.value = window.innerWidth <= BREAKPOINT_MD;
};

// Watchers
watch(isReadyForTransition, (newValue) => {
  if (newValue) {
    startTransition();
  }
});

// Lifecycle
onMounted(async () => {
  checkViewportSize();
  selectRandomImages();
  await nextTick();
  calculateScale();
});
</script>
