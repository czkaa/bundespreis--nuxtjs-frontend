
export default defineNuxtRouteMiddleware(async (to, from) => {
  const gap = useGapStore()
  

  if (gap.isGap) {
      gap.setGap(false)
      await new Promise(resolve => setTimeout(resolve, 1000))
      gap.setGap(true)
    } else {
      gap.setGap(true)
    }
})