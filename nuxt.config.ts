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


  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://bundespreis-backend.czkaa.site'
      // apiBaseUrl: 'http://localhost:8000'
    }
  },

  // ssr: true,

  // nitro: {
  //   preset: 'static',
  //   prerender: {
  //     crawlLinks: true,
  //     routes: 
  //     ['/', 
  //     '/en',
  //     '/api/site',
  //     '/api/de/site', 
  //     '/api/en/site', 
  //     '/api/language',
  //     '/api/de',
  //     '/api/en'
  //     ], 
      
  //   }
  // },

  hooks: {
    'pages:extend' (pages) {
      pages.push(
        {
          name: 'custom-info', 
          path: '/info/:slug(.*)',
          file: '~/pages/[...slug].vue'
        },
        {
          name: 'custom-preistragende-de', // Add this for /preistragende/:slug
          path: '/preistragende/:slug',
          file: '~/pages/[...slug].vue'
        },
        {
          name: 'custom-preistragende-en', // Add this for /preistragende/:slug
          path: '/winners/:slug',
          file: '~/pages/[...slug].vue'
        },
        {
          name: 'custom-landing',
          path: '/:slug([^/]+)', // Single-level paths
          file: '~/pages/[...slug].vue'
        }
      );
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

  },
})