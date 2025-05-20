<template>
  <div class="w-full row-start-1 col-start-1 relative" [snippets-slider-image]>
    <div
      :style="{ aspectRatio: image.ratio }"
      class="relative max-h-remaining-content overflow-hidden mx-auto"
    >
      <BasicsImage :image="image" class="w-full [&>img]:object-cover" />

      <template v-if="imagesLength > 1">
        <div
          @click="prevImage"
          class="absolute left-0 top-0 z-50 w-1/2 h-full cursor-w-resize overflow-hidden"
          :aria-label="$t('showPreviousImage')"
        ></div>
        <div
          @click="nextImage"
          class="absolute right-0 top-0 z-50 w-1/2 h-full cursor-e-resize"
          :aria-label="$t('showNextImage')"
        ></div>
      </template>

      <div
        class="absolute top-0 p-xs bg-black bg-opacity-70 h-full"
        v-if="image.hasShowmore && image.showmore.length > 0 && showShowmore"
      >
        <BasicsText
          :text="image.showmore"
          class="text-white font-sans text-xs [&_strong]:!text-xs [&_a]:!text-xs"
        />
      </div>
    </div>

    <div
      class="flex mx-auto overflow-hidden justify-between items-start gap-xs shrink-0 w-full z-50"
      :style="{
        maxWidth: `calc(var(--remaining-content) * ${image.ratio})`,
      }"
      :class="{ 'cursor-pointer': image.hasShowmore }"
    >
      <button
        v-if="image.hasShowmore && image.showmore.length > 0"
        @click="showShowmore = !showShowmore"
        class="relative z-50 cursor-pointer font-sans"
      >
        <BasicsText text="[+]" class="text-xs" v-if="!showShowmore" />
        <BasicsText text="[–]" class="text-xs" v-else />
      </button>

      <BasicsText
        :text="`${image.caption}`"
        class="text-xs font-sans mt-0.5 [&_strong]:!text-xs [&_a]:!text-xs"
      />
      <BasicsCaption
        :text="`${imageStore.currentIndex + 1}/${imagesLength}`"
        class="ml-auto shrink-0 pt-0.5"
      />
    </div>
  </div>
</template>

<script setup>
const imageStore = useImageStore();
const showShowmore = ref(false);

const props = defineProps({
  image: {
    type: Object,
    required: true,
  },

  index: {
    type: Number,
    required: true,
  },
  imagesLength: {
    type: Number,
    required: true,
  },
});

// Navigation methods
const nextImage = () =>
  imageStore.setCurrentIndex(
    (imageStore.currentIndex + 1) % props.imagesLength
  );
const prevImage = () =>
  imageStore.setCurrentIndex(
    (imageStore.currentIndex - 1) % props.imagesLength
  );
</script>
