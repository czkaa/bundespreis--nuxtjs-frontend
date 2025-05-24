import { defineStore } from 'pinia'

export const useRouteStore = defineStore('route', {
  state: () => ({
    template: '',
    route: {},
    scrollTrigger: '',
    locale: 'de'
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
    },

    setLocale(value: string) {
      this.locale = value
    }
  }
})