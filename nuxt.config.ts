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
  
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/i18n'],
  
  css: [
    '~/assets/css/main.css'
  ],


  runtimeConfig: {
    apiToken: 'test',
    
    public: {
      apiBaseUrl: 'https://bundespreis-backend.czkaa.site'
      // apiBaseUrl: 'http://localhost:3000'

    }
  },

  ssr: true,

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: 
      ['/', '/en'], 
      
    }
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ]
    }
  },


  i18n: {
    defaultLocale: 'de',
    locales: [
      {
        code: 'de',
        file: 'de-DE.json'
      },
      {
        code: 'en',
        file: 'en-US.json'
      },
    ],
    strategy: 'prefix_except_default',
    customRoutes: 'config',
    pages: {
      'preistragendesub-slug': {
        en: '/winners/[slug]',
        de: '/preistragende/[slug]'
      },
      'info-slug': {
        en: '/info/[slug]',
        de: '/info/[slug]'
      },
    }
  },
})