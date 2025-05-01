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
      setTimeout(() => {
        this.setDone(true);
      }, 2000);
    },
    setDone(value: boolean) {
      this.isDone = value
    }
  }
})