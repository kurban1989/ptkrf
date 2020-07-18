<template>
  <footer>
    <div class="flex flex--column container">
      <div class="flex footer__top-section">
        <div class="footer__left">
          <nuxt-link to="/" class="header__logo header__logo--footer" />

          <p class="footer__recvizite">
            ООО «Первая Транспортная Компания»
          </p>
          <p class="footer__recvizite plate">
&nbsp;
          </p>
          <p class="footer__recvizite">
            ИНН/КПП 6324107971 /632401001
          </p>
          <p class="footer__recvizite plate">
&nbsp;
          </p>
          <p class="footer__recvizite pseudo-last">
            ОГРН 12345678907849
          </p>

          <p class="footer__recvizite mobile-only pseudo-last">
            445007, Российская Федерация ,
            Самарская область, г. Тольятти,
            ул. Новозаводская, дом. 2-А, строение 326 ,
            этаж/комната 2/28
          </p>

          <p class="footer__recvizite mobile-only">
            Банк: Филиал  «Нижегородский» АО
            «Альфа-Банк» ВОЛГО-ВЯТСКОЕ
            ГУ БАНКА РОССИИ
            БИК  042202824
            Кор. счет № 3010 1810 2000 0000 0824
          </p>

          <PortalTarget name="mobile-bank" class="flex logo-banks footer__recvizite--bank mobile-only" tag="p" />
        </div>
        <div class="flex flex--column footer__middle">
          <b class="plate">
            ООО «Первая Транспортная Компания»
          </b>

          <ul>
            <template v-for="(item, index) in mainMenu">
              <li :key="index" :title="item.hint" role="button" @click="goToBlock(item)">
                {{ item.title }}
              </li>
            </template>
            <li @click="goToBlock({ link: '#stocks'})">
              Акции
            </li>
          </ul>
        </div>
        <div class="flex flex--column footer__right">
          <a href="tel:+78002014850" class="footer__phones">8 (800) 201-48-50</a>
          <a href="tel:+79879168066" class="footer__phones">8 (987) 916-80-66</a>
          <a href="tel:+79879168063" class="footer__phones last">8 (987) 916-80-63</a>

          <div class="flex footer__messengers">
            <span>
              <a href="tg://resolve?phone=+79879168066">Telegram</a>
            </span>
            <span>
              <a href="viber://chat?number=+79879168066">Viber</a>
            </span>
            <span>
              <a href="whatsapp://send?phone=+79879168066">WhatsApp</a>
            </span>
          </div>

          <a href="mailto:ptk.dkm@gmail.com" class="footer__messengers--mail">ptk.dkm@gmail.com</a>
        </div>
      </div>
      <footer-bottom-section />
    </div>
  </footer>
</template>

<script>
import { isClient } from '~/helpers'
import mainMenu from '~/resourse/mainMenu.json'
import FooterBottomSection from '@/components/FooterBottomSection.vue'
import goto from '~/mixins/goto.js'

export default {
  name: 'FooterSite',
  components: {
    FooterBottomSection
  },
  mixins: [goto],
  data () {
    return {
      mainMenu
    }
  },
  mounted () {
    if (isClient()) {
      this.isMobile()
      window.addEventListener('resize', () => {
        this.isMobile()
      })
    }
  },
  beforeDestroy () {
    if (isClient()) {
      window.removeEventListener('resize', () => {
        this.isMobile()
      })
    }
  },
  methods: {
    isMobile () {
      if (window.matchMedia('(max-width: 768px)').matches) {
        this.$store.dispatch('mobilemenu/mobileDetect', true)
      } else {
        this.$store.dispatch('mobilemenu/mobileDetect', false)
      }
    }
  }
}
</script>
