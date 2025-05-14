<template>
  <div
    class="w-full overflow-hidden bg-white h-frame-h flex flex-col items-center justify-center"
  >
    <div
      class="relative [&_div]:h-full [&_figure]:h-full [&_img]:object-cover [&_img]:h-full transition-[padding] ease-linear duration-intro w-frame-w h-frame-h -mt-[1px]"
      :class="
        !introStore.isStart
          ? 'px-[calc(50%-1.5rem)] py-[calc(50vh-0.8rem)]'
          : 'py-[calc(var(--tag-h)-1px)] md:py-[calc(var(--logotype)-1px)] pl-[11.4rem] pr-[11.85rem] md:px-xs'
      "
    >
      <div class="w-full h-full flex justify-center items-center relative">
        <BasicsIntroImage
          v-if="randomPortraitImage"
          :image="randomPortraitImage"
          class="hidden relative z-10 [&>img]:h-full [&>img]:w-full md:flex justify-center"
        />
        <BasicsIntroImage
          v-if="randomLandscapeImage"
          :image="randomLandscapeImage"
          class="md:hidden relative z-10 [&>img]:h-auto [&>img]:w-full flex justify-center"
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
