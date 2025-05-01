<template>
  <div v-if="pending">loading</div>
  <div v-else-if="data?.sections">
    <SectionWrapper :section="data.sections.archiv">
      <SectionArchiv :section="data.sections.archiv" />
    </SectionWrapper>

    <SectionWrapper :section="data.sections.impressum">
      <SectionImpressum :section="data.sections.impressum" />
    </SectionWrapper>

    <SectionWrapper :section="data.sections.datenschutz">
      <SectionDatenschutz :section="data.sections.datenschutz" />
    </SectionWrapper>
  </div>
</template>

<script setup>
const route = useRoute();
const { currentLang } = useLanguage();
import SectionDatenschutz from '~/components/sections/SectionDatenschutz.vue';
import SectionImpressum from '~/components/sections/SectionImpressum.vue';
import SectionArchiv from '~/components/sections/SectionArchiv.vue';

const { data, pending, error } = await useFetch('/api/dynamic', {
  query: {
    lang: currentLang,
    slug: route.params.slug,
  },
});
</script>
