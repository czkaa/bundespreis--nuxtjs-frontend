// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  components: {
    dirs: [
      '~/components',
      { path: '~/components/global', global: true },
      { path: '~/components', pathPrefix: false, prefix: '', extensions: ['vue'], },
    ]
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/image', ],
  css: [
    '~/assets/css/main.css'
  ],

  ssr: false,

  // nitro: {
  //   preset: 'static',
  //   prerender: {
  //     crawlLinks: true,
  //     routes: ['/', 
  //       '/en',
  //      '/api/site',
  //      '/api/de/site', 
  //     '/api/en/site', 
  //     '/api/language',
  //     ], 
      
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
        // Create aliases that all redirect to home (/)
        const aliases = [
          'preistragende',
          'winners', 
          'nominierte',
          'nominees',
          'exhibition',
          'ausstellung', 
          'catalog',
          'katalog',
          'about',
          'ueber'
        ];

        aliases.forEach(alias => {
          pages.push({
            name: `${alias}-alias`,
            path: `/${alias}`,
            file: catchAllRoute.file,
            meta: { 
              isAlias: true, 
              aliasFor: '/',
              originalPath: alias 
            }
          });
        });
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
    strategy: 'prefix_except_default',
    customRoutes: 'config',
    pages: {
      'preistragende-slug': {
        en: '/winners/[slug]'
      },
      'info-slug': {
        en: '/info/[slug]'
      },
    }
  },

})