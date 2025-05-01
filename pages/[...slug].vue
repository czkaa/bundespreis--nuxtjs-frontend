<template>
  <div v-if="data?.sections">
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
const { locale } = useI18n();

import SectionWrapper from '~/components/sections/SectionWrapper.vue';
import SectionDatenschutz from '~/components/sections/SectionDatenschutz.vue';
import SectionImpressum from '~/components/sections/SectionImpressum.vue';
import SectionArchiv from '~/components/sections/SectionArchiv.vue';

const { data: data } = await useFetch(
  () => `/api/${locale.value === 'en' ? 'en/' : ''}info`
);
</script>
