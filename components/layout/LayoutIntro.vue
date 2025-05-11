<template>
  <div
    class="w-full overflow-hidden bg-white h-frame-h flex flex-col items-center justify-center"
  >
    <div
      class="relative [&_div]:h-full [&_figure]:h-full [&_img]:object-cover [&_img]:h-full transition-transform ease-linear duration-intro w-frame-w h-frame-h py-tag pb-[calc(5.4rem-1px)] md:py-[calc(var(--logotype)-1px)] pl-[11.4rem] pr-[11.85rem] md:px-xs -mt-[1px]"
      :class="!introStore.isStart ? 'scale-[3.1%] ' : 'scale-100'"
    >
      <!-- Show portrait image on mobile (below md breakpoint) -->
      <div
        v-if="randomPortraitImage"
        class="w-full h-full hidden md:flex justify-center items-center relative"
      >
        <BasicsIntroImage
          :image="randomPortraitImage"
          class="relative z-10 [&>img]:h-full [&>img]:w-full flex justify-center"
        />
      </div>

      <!-- Show landscape image on md breakpoint and above -->
      <div
        v-if="randomLandscapeImage"
        class="w-full h-full md:hidden flex justify-center items-center relative"
      >
        <BasicsIntroImage
          :image="randomLandscapeImage"
          class="relative z-10 [&>img]:h-auto [&>img]:w-full flex justify-center"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
const introStore = useIntroStore();
import { INTRO_DURATION } from '../utils/tailwind';

const props = defineProps({
  siteData: {
    type: Object,
    required: true,
  },
});

const randomPortraitImage = ref(null);
const randomLandscapeImage = ref(null);

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

onMounted(() => {
  selectRandomImages();
});

onMounted(() => {
  setTimeout(() => {
    introStore.setStart(true);

    setTimeout(() => {
      introStore.setScaled(true);
      introStore.setDone(true);
    }, INTRO_DURATION);
  }, 300);
});
</script>
