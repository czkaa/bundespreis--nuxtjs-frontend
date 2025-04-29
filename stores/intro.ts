import { defineStore } from 'pinia'

export const useIntroStore = defineStore('intro', {
  state: () => ({
    isIntro: false,
  }),
  actions: {
    toggle() {
      this.isIntro = !this.isIntro
    },
    setIntro(value: boolean) {
       this.isIntro = value
    }
  }
})