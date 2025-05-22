import { defineStore } from 'pinia'

export const useRouteStore = defineStore('route', {
  state: () => ({
    template: '',
  }),
  actions: {

    setTemplate(value: string) {
       this.template = value
    }
  }
})