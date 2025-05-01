import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', {
  state: () => ({
    currentIndex: 0,
  }),
  actions: {
    setCurrentIndex(value: number) {
        console.log('SETTING INDEX')
       this.currentIndex = value;
    },

  }
})