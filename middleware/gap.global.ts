export default defineNuxtRouteMiddleware(async (to, from) => {
  const gap = useGapStore()

  if (to.path !== from.path) {
    if (gap.isGap) {
      console.log('SET GAP TO FALSE')
      gap.setGap(false)
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('SET GAP TO True')
      gap.setGap(true)
    } else {
      console.log('SET GAP TO True')
      await new Promise(resolve => setTimeout(resolve, 100))
      gap.setGap(true)
    }

  }  else if (to.fullPath !== from.fullPath) {

    console.log('NO NAV :(')
    if (!gap.isGap) gap.setGap(true)
  }
  

})