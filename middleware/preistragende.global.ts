// middleware/preistragende.global.ts
export default defineNuxtRouteMiddleware((to) => {
    if (to.path === '/preistragende' || to.path.match(/^\/[a-z]{2}\/preistragende$/)) {
      // Set a context flag instead of redirecting
      to.meta.handleAsSlug = 'preistragende'
      to.meta.isCatchAll = true
    }
  })