const durationIntro = 1000;

export const useIntroStore = defineStore('intro', {
  state: () => ({
    isIntro: false,
    isScaled: false,
    isDone: false,
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
    },
    setScaled(value: boolean) {
      this.isScaled = value
    }
  }
})