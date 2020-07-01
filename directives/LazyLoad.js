export default {
  inserted: (el) => {
    const preloadImage = (element) => {
      if (element.dataset && element.dataset.srcset) {
        element.srcset = element.dataset.srcset
      }
    }

    function handleIntersect (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          preloadImage(entry.target)
          observer.unobserve(el)
        }
      })
    }

    function createObserver () {
      const options = {
        root: null,
        threshold: '0'
      }

      const observer = new IntersectionObserver(handleIntersect, options)

      observer.observe(el) // target element to watch
    }

    if (!window.IntersectionObserver) {
      preloadImage()
    } else {
      createObserver()
    }
  }
}
