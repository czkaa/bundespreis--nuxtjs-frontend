<template>
  <div class="w-full row-start-1 col-start-1 relative" snippets-slider-image>
    <SnippetsSliderNav
      :current-index="imageStore.currentIndex"
      :total-items="imagesLength"
      :disabled="showShowmore"
      @navigate="handleNavigate"
      @previous="prevImage"
      @next="nextImage"
    >
      <div
        :style="{ aspectRatio: image.ratio }"
        class="relative max-h-remaining-content overflow-hidden mx-auto"
      >
        <BasicsImage :image="image" class="w-full [&>img]:object-cover" />
        <div
          class="absolute top-0 p-xs bg-black bg-opacity-70 h-full"
          v-if="image.hasShowmore && image.showmore.length > 0 && showShowmore"
        >
          <BasicsText
            :text="image.showmore"
            size="xs"
            class="text-white [&_p]:mb-4"
          />
        </div>
      </div>
    </SnippetsSliderNav>

    <div
      class="flex mx-auto overflow-hidden justify-start items-start gap-xs shrink-0 w-full z-50"
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
        <BasicsCaption
          text="+"
          class="text-xs pt-0.5 !w-6 overflow-hidden"
          v-if="!showShowmore"
        />
        <BasicsCaption
          text="–"
          class="text-xs pt-0.25 !pb-0.5 !w-6 overflow-hidden"
          v-else
        />
      </button>

      <BasicsText :text="`${image.caption}`" size="xs" class="mt-0.5 w-full" />
      <div class="w-20 shrink-0 flex justify-end">
        <BasicsCaption
          :text="`${imageStore.currentIndex + 1}/${imagesLength}`"
          class="pt-0.5 text-center inline-block tabular-nums tracking-tighter"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

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
const nextImage = () => {
  const nextIndex = (imageStore.currentIndex + 1) % props.imagesLength;
  imageStore.setCurrentIndex(nextIndex);
};

const prevImage = () => {
  const prevIndex =
    (imageStore.currentIndex - 1 + props.imagesLength) % props.imagesLength;
  imageStore.setCurrentIndex(prevIndex);
};

const handleNavigate = (index) => {
  imageStore.setCurrentIndex(index);
};

watch(
  () => imageStore.currentIndex,
  (newIndex) => {
    if (newIndex !== props.index) {
      showShowmore.value = false;
    }
  }
);
</script>
