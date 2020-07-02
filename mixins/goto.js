export default {
  methods: {
    goToBlock (item) {
      if (item.link.startsWith('/')) {
        this.$router.push({ path: item.link })
      } else {
        let timer = null
        // eslint-disable-next-line no-lonely-if
        if (this.$route.fullPath === '/') {
          this.scrollToEl(item.link)
        } else {
          this.$router.push({ path: '/' })
          timer = setTimeout(() => {
            this.scrollToEl(item.link)
            clearTimeout(timer)
          }, 300)
        }
      }
    },
    scrollToEl (el) {
      el = document.querySelector(`.${el.substring(1, el.length)}`)
      const caf = 3.2
      const top = Number(window.scrollY) + Number(el.getBoundingClientRect().y) - Number(el.scrollHeight / caf)
      // Перемотка до карточки события
      window.scrollTo({
        top,
        behavior: 'smooth'
      })
    }
  }
}
