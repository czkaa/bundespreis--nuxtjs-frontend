// stores/site.js
import { defineStore } from 'pinia';

export const useSiteStore = defineStore('site', {
  state: () => ({
    metadata: null,
  }),

  actions: {
    setAllMetadata(data) {
      this.metadata = data;
    },
  },

  getters: {
    getSiteData: (state) => state.metadata,
    getSEO: (state) => state.metadata?.seo || {},
    getSiteTitle: (state) => state.metadata?.seo?.title || '',
  },
});
