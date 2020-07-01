<template>
  <transition name="menuup">
    <div
      v-if="isShow"
      class="mobile-menu relative flex"
    >
      <div class="sections-menu__head flex">
        <nuxt-link to="/" class="header__logo" />

        <button-full class="sections-menu__close" @click="closeMenu">
          <svg-cross fill="#1D3D6E" />
        </button-full>
      </div>
      <div v-scroll-lock="isShow" class="sections-menu">
        <menu class="flex flex--column" role="menu" aria-modal="mobile menu">
          <template v-for="(item, index) in menuList">
            <li
              :key="index"
              :title="item.hint"
              role="button"
              class="sections-menu--item pointer"
              :class="{current: currentActive === index}"
              @click="goToBlockPrev(item, index)"
            >
              {{ item.title }}
            </li>
          </template>
        </menu>

        <div class="flex flex--column sections-menu--footer">
          <a href="tel:+78002014850" class="footer__phones">8 (800) 201-48-50</a>
          <a href="tel:+79879168066" class="footer__phones">8 (987) 916-80-66</a>
          <a href="tel:+79879168063" class="footer__phones last">8 (987) 916-80-63</a>

          <div class="flex footer__messengers">
            <span>
              <a href="tg://resolve?phone=+79879168063">Telegram</a>
            </span>
            <span>
              <a href="viber://chat?number=+79879168066">Viber</a>
            </span>
            <span>
              <a href="whatsapp://send?phone=+79879168063">WhatsApp</a>
            </span>
          </div>
          <br>
          <a href="mailto:ptk.dkm@gmail.com" class="footer__messengers--mail">ptk.dkm@gmail.com</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import goto from '~/mixins/goto.js'

export default {
  name: 'MobileMenu',
  components: {
    ButtonFull: () => import('~/components/elements/ButtonFull.vue'),
    SvgCross: () => import('~/components/svg/SvgCross.vue')
  },
  mixins: [goto],
  props: {
    menuList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      currentActive: -1
    }
  },
  computed: {
    ...mapState({
      isShow: state => state.mobilemenu.active
    })
  },
  methods: {
    closeMenu () {
      this.$store.dispatch('mobilemenu/switchMobileMenu', false)
    },
    goToBlockPrev (item, index) {
      this.currentActive = index
      this.closeMenu()

      this.$nextTick(() => {
        this.goToBlock(item)
      })
    }
  }
}
</script>

<style lang="scss">
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #2F295D;
  flex-direction: column;
  z-index: 999;
}
.sections-menu {
  width: 100vw;
  min-width: 320px;
  padding: 30px;

  &__head {
    background: #fff;
    padding: 25px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  &--text {
    color: rgba(255, 255, 255, 0.57);
  }

  &--item {
    width: auto;
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 20px;
    color: #fff;

    &.current {
      color: #FF6D6D;
    }

    a {
      color: #fff;
    }
  }

  &__close {
    width: 40px;
    height: 40px;
    background: transparent;
  }

  menu {
    position: relative;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: -30px;
      width: 100vw;
      height: 1px;
      border-bottom: 1px solid #FFFFFF;
    }
  }

  &--footer {
    padding-top: 30px;
    color: #ACAABF;

    .footer__phones, .footer__messengers--mail {
      color: #ACAABF;
    }
  }

  .footer__messengers span {
    width: 40px;
    height: 40px;
  }
}
</style>
