<template>
  <div class="wrapper relative">
    <mobile-menu :menu-list="mainMenu" />
    <header-site :scroll="scroll" />
    <nuxt :class="{'scroll-head': scroll }" />
    <footer-site />
    <transition name="modal">
      <PortalTarget v-show="active" name="modal-zone" />
    </transition>

    <transition name="modal">
      <PortalTarget v-show="activeCar" name="modal-zone-second" />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isClient } from '~/helpers'
import MobileMenu from '~/components/menus/MobileMenu'
import mainMenu from '~/resourse/mainMenu.json'

export default {
  name: 'DefaultLayout',
  components: {
    MobileMenu,
    HeaderSite: () => import('~/components/Header.vue'),
    FooterSite: () => import('~/components/Footer.vue')
  },
  htmlAttrs: {
    prefix: 'og: http://ogp.me/ns#'
  },
  data () {
    return {
      scroll: false,
      mainMenu
    }
  },
  computed: {
    ...mapState({
      active: state => state.modals.active,
      activeCar: state => state.modals.activeCar
    })
  },
  mounted () {
    if (isClient()) {
      this.handleScroll()
      window.addEventListener('scroll', this.handleScroll)
    }
  },
  beforeDestroy () {
    if (isClient()) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    handleScroll () {
      this.scroll = window.scrollY > 10
    }
  },
  head () {
    return {
      htmlAttrs: {
        lang: 'ru',
        prefix: 'og: http://ogp.me/ns#'
      }
    }
  }
}
</script>
