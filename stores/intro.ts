import { defineStore } from 'pinia'

export const useIntroStore = defineStore('intro', {
  state: () => ({
    isIntro: true,
    isDone: false
  }),
  actions: {
    toggle() {
      this.isIntro = !this.isIntro
    },
    setIntro(value: boolean) {
       this.isIntro = value
    },
    setDone(value: boolean) {
      this.isDone = value
    }
  }
})