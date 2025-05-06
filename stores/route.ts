import { defineStore } from 'pinia'

export const useRouteStore = defineStore('route', {
  state: () => ({
    isHome: false,
    view: 'home'
  }),
  actions: {
     setHome(value: boolean) {
       this.isHome = value;
    }, 
    setView(value: string) {
      this.view = value;
    }
  }
})