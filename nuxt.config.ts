export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
  ],

  runtimeConfig: {
    apiToken: process.env.API_TOKEN || 'K18eVvSsRMtu-NTG!3_M',
    public: {
      backendUrl: process.env.BACKEND_URL || 'http://localhost:8000',
    }
  },

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'de',
    detectBrowserLanguage: false,
    langDir: 'locales',
    baseUrl: 'http://localhost:8000',
    skipSettingLocaleOnNavigate: false,
    locales: [
      {
        code: 'de',
        name: 'Deutsch',
        file: 'de.json',
        iso: 'de-DE'
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
        iso: 'en-US'
      }
    ]
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  hooks: {
    async 'prerender:routes'(ctx) {
      const backendUrl = 'http://localhost:8000';
      const { footerPages } = await fetch(`${backendUrl}/site`, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN || 'K18eVvSsRMtu-NTG!3_M'}`,
          'Content-Type': 'application/json',
        },
      }).then(res => res.json());

      ctx.routes.add(`/`);
      ctx.routes.add(`/en`);
      for (const page of footerPages) {
        ctx.routes.add(`/${page.uri}`);
        ctx.routes.add(`/en/${page.uri}`);
      }
    }
  },

  routeRules: {
    '/**': { ssr: true }
  }
})