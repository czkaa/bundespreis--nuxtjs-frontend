import { defineStore } from 'pinia'

export const useRouteStore = defineStore('route', {
  state: () => ({
    template: '',
    route: {},
  }),
  actions: {

    setTemplate(value: string) {
       this.template = value
    },
    setRoute (value: object) {
      this.route = value
    },
  }
})