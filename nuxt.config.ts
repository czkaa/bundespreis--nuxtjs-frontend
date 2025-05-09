// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  components: {
    dirs: [
      '~/components',
      { path: '~/components/global', global: true },
      { path: '~/components', pathPrefix: false, prefix: '', extensions: ['vue'] },
    ]
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/image'],
  css: [
    '~/assets/css/main.css'
  ],
  // ssr: true,

  // nitro: {
  //   preset: 'node-server',
  //   prerender: {
  //     crawlLinks: true,
  //     routes: ['/']
  //   }
  // },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://bundespreis-backend.czkaa.site'
      // apiBaseUrl: 'http:/localhost:8000'
    }
  },

  hooks: {
    'pages:extend' (pages) {
      const catchAllRoute = pages.find(page => page.path === '/:slug(.*)*')

      if (catchAllRoute) {
        catchAllRoute.alias = ['/preistragende', '/winners']
      }
    }
  },

  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en'],
    detectBrowserLanguage: false,
    strategy: 'prefix',
    customRoutes: 'config',
    pages: {
      'preistragende/[...slug]': {
        en: '/winners/[slug]'
      },
      'info': {
        en: '/info'
      }
    }
  },
  
  
  app: {
    head: {
      title: 'Bundespreis für Kunststudierende 2025',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'robots', content: 'index, follow' },
        { name: 'description', content: 'Bundespreis data viewer application' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})