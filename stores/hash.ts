import { defineStore } from 'pinia'

export const useHashStore = defineStore('hash', {
  state: () => ({
    currentHash: '',
    isBlocked: false,
  }),
  actions: {
    setCurrentHash(value: string) {
       this.currentHash = value;
    },
     setBlocked(value: boolean) {
       this.isBlocked = value;
    }
  }
})