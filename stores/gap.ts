import { defineStore } from 'pinia'
import { GAP_DURATION } from '../utils/tailwind';

export const useGapStore = defineStore('gap', {
  state: () => ({
    isGap: false,
    isTransitioning: true
  }),
  actions: {
    toggle() {
      this.isGap = !this.isGap
    },
    setGap(value: boolean) {
       this.isGap = value
       this.isTransitioning = true;
       setTimeout(() => {
         this.isTransitioning = false
       }, GAP_DURATION)
    }
  }
})