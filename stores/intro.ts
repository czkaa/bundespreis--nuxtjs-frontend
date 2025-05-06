const durationIntro = 1000;

export const useIntroStore = defineStore('intro', {
  state: () => ({
    isIntro: false,
    isDone: true,
    isScaled: false

  }),
  actions: {
    toggle() {
      this.isIntro = !this.isIntro
    },
    setIntro(value: boolean) {
      this.isIntro = value
      setTimeout(() => {
        this.setDone(true);
      }, durationIntro);
    },
    setDone(value: boolean) {
      this.isDone = value
    },
    setScaled(value: boolean) {
      this.isScaled = value
    }
  }
})