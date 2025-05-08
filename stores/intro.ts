const durationIntro = 1000;

export const useIntroStore = defineStore('intro', {
  state: () => ({
    isIntro: false,
    isScaled: false,
    isDone: false,
    isStart: false,
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
    setStart(value: boolean) {
      this.isStart = value
    },
    setScaled(value: boolean) {
      this.isScaled = value
    }
  }
})