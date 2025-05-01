<template>
  <div v-if="pending">loading</div>
  <div v-else-if="data?.sections">
    <SectionWrapper :section="data.sections.ueber">
      <SectionUeber :section="data.sections.ueber" />
    </SectionWrapper>

    <SectionWrapper :section="data.sections.preistragende">
      <SectionPreistragende :section="data.sections.preistragende" />
    </SectionWrapper>

    <SectionWrapper :section="data.sections.nominierte">
      <SectionNominierte :section="data.sections.nominierte" />
    </SectionWrapper>

    <SectionWrapper :section="data.sections.ausstellung">
      <SectionAusstellung :section="data.sections.ausstellung" />
    </SectionWrapper>

    <SectionWrapper :section="data.sections.katalog">
      <SectionKatalog :section="data.sections.katalog" />
    </SectionWrapper>
  </div>
</template>

<script setup>
const { currentLang } = useLanguage();
import SectionWrapper from '~/components/sections/SectionWrapper.vue';
import SectionUeber from '~/components/sections/SectionUeber.vue';
import SectionPreistragende from '~/components/sections/SectionPreistragende.vue';
import SectionNominierte from '~/components/sections/SectionNominierte.vue';
import SectionKatalog from '~/components/sections/SectionKatalog.vue';
import SectionAusstellung from '~/components/sections/SectionAusstellung.vue';

const { data, pending, error } = await useFetch('/api/root', {
  server: false,
  query: {
    lang: currentLang,
  },
});
</script>
