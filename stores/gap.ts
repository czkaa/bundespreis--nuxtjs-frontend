import { defineStore } from 'pinia'

export const useGapStore = defineStore('gap', {
  state: () => ({
    isGap: false,
  }),
  actions: {
    toggle() {
      this.isGap = !this.isGap
    },
    setGap(value: boolean) {
       this.isGap = value
    }
  }
})