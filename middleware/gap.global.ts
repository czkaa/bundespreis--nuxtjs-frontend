export default defineNuxtRouteMiddleware(async (to, from) => {
  const gap = useGapStore()
  
  if (gap.isGap && to.path !== from.path) {
    gap.toggle()
    await new Promise(resolve => setTimeout(resolve, 300))
  } else {
    gap.toggle()
  }
})