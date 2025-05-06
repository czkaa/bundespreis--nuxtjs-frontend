
export default defineNuxtRouteMiddleware(async (to, from) => {
  const gap = useGapStore()
  

  if (gap.isGap) {
      gap.setGap(false)
      await new Promise(resolve => setTimeout(resolve, 500))
      setTimeout(() => {
        gap.setGap(true)
      }, 1500)
    } else {
      gap.setGap(true)
    }
})