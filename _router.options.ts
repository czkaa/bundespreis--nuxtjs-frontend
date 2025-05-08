import type { RouterOptions } from '@nuxt/schema'

export default <RouterOptions>{
  routes: (_routes) => {
    // Find your root catch-all route
    const catchAllRoute = _routes.find(route => route.path === '/:slug(.*)*')
    
    // Add alias to it
    if (catchAllRoute) {
      catchAllRoute.alias = ['/preistragende']
    }
    
    return _routes
  }
}