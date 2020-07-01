<template>
  <header class="flex header" :class="{scroll: scroll}">
    <nav class="container header__nav">
      <nuxt-link to="/" class="header__logo" />
      <menu-site />
      <div class="header__phone">
        <svg-phone-circle />
        <a href="tel:+78002014850">8 (800) 201-48-50</a>
        <p class="town">
          Тольятти
        </p>
      </div>
    </nav>
  </header>
</template>
<script>
import MenuSite from '@/components/Menu.vue'
import SvgPhoneCircle from '@/components/svg/PhoneCircle.vue'

export default {
  name: 'HeaderSite',
  components: {
    MenuSite,
    SvgPhoneCircle
  },
  props: {
    scroll: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
