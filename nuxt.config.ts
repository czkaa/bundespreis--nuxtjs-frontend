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

  ssr: true,

  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/', 
        '/en',
       '/api/site',
       '/api/de/site', 
      '/api/en/site', 
      '/api/language',
      ], 
      
    }
  },
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
        // Create new routes that will properly handle the slug parameter
        pages.push({
          name: 'preistragende-catch-all',
          path: '/preistragende',
          file: catchAllRoute.file,
          meta: { isAlias: true, prefix: 'preistragende' }
        }, {
          name: 'winners-catch-all',  
          path: '/winners',
          file: catchAllRoute.file,
          meta: { isAlias: true, prefix: 'winners' }
        })
      }
    },
    
  },

  i18n: {
    defaultLocale: 'de',
    locales: [  {
        code: 'de',
        file: 'de-DE.json'
      },
      {
        code: 'en',
        file: 'en-US.json'
      },
    ],
    detectBrowserLanguage: {
      useCookie: false,
      redirectOn: 'root', 
      alwaysRedirect: false,
      fallbackLocale: 'de'
    },
    differentDomains: false,
    strategy: 'prefix_except_default',
    customRoutes: 'config',
    pages: {
      'preistragende/[slug]': {
        en: '/winners/[slug]'
      },
      'info': {
        en: '/info'
      }
    }
  },

})