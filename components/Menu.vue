<template>
  <menu class="flex header__menu" role="menu">
    <template v-for="(item, index) in mainMenu">
      <li :key="index" :title="item.hint" role="button" class="desktop pointer" @click="goToBlock(item)">
        {{ item.title }}
      </li>
    </template>
    <li class="burger no-outline pointer relative" role="button" area-mobile="mobile-menu" @click="showMenu">
      <span />
      <span />
      <span />
    </li>
  </menu>
</template>
<script>
import mainMenu from '~/resourse/mainMenu.json'
import goto from '~/mixins/goto.js'
export default {
  name: 'MenuSite',
  mixins: [goto],
  data () {
    return {
      mainMenu
    }
  },
  methods: {
    showMenu () {
      this.$store.dispatch('mobilemenu/switchMobileMenu', true)
    }
  }
}
</script>
