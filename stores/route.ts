import { defineStore } from 'pinia'

export const useRouteStore = defineStore('route', {
  state: () => ({
    template: '',
    route: {},
    scrollTrigger: ''
  }),
  actions: {

    setTemplate(value: string) {
       this.template = value
    },
    setRoute (value: object) {
      this.route = value
    },
    setScrollTrigger (value: string) {
      setTimeout(() => {
        this.scrollTrigger = value
      }, 100)
    }
  }
})