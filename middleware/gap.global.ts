import { durationGap } from "#imports";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const gap = useGapStore()
  console.log('ROUTING', to, from, gap.isGap)
  

  if (gap.isGap) {
      gap.setGap(false)
      await new Promise(resolve => setTimeout(resolve, 1000))
      gap.setGap(true)
    } else {
      gap.setGap(true)
    }
})