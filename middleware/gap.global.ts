export default defineNuxtRouteMiddleware(async (to, from) => {
  const gap = useGapStore()

  // handle hash as the body is not scrollable yet while transitioning
  if (to.path !== from.path) {
    if (to.hash.length > 0) {
      setTimeout(() => {
        const targetElement = document.querySelector(to.hash); 
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500)
    }

    if (gap.isGap) {
      gap.setGap(false)
      setTimeout(() => {
        gap.setGap(true)
      }, 1500)
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('SET GAP TO True')
    } else {
      console.log('SET GAP TO True')
      await new Promise(resolve => setTimeout(resolve, 100))
      setTimeout(() => {
        gap.setGap(true)
      }, 500)
    }

  }  else if (to.fullPath !== from.fullPath) {

    console.log('NO NAV :(')
    if (!gap.isGap) {
      setTimeout(() => {
        gap.setGap(true)
      }, 500)
    }
  }
  

})