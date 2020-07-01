<template>
  <div class="flex footer__bottom-section">
    <div class="flex flex--column footer__bottom-section--left">
      <p class="plate">
        445007, Российская Федерация ,
        Самарская область, г. Тольятти,
        ул. Новозаводская, дом. 2-А, строение 326 ,
        этаж/комната 2/28
      </p>
      <p>
        Все права защищены &copy;
      </p>
    </div>
    <div class="flex flex--column footer__bottom-section--middle plate">
      <p>
        Банк: Филиал  «Нижегородский» АО «Альфа-Банк»
        ВОЛГО-ВЯТСКОЕ  ГУ БАНКА РОССИИ
      </p>
      <br>
      <p>
        БИК  042202824
      </p>
      <br>
      <p>
        Корреспондентский счет № 3010 1810 2000 0000 0824
      </p>
      <portal
        to="mobile-bank"
        class="flex logo-banks"
        :disabled="!disabledPortal"
        tag="p"
      >
        <span />
        <span />
        <span />
      </portal>
    </div>
    <div class="flex flex--column footer__bottom-section--right">
      <p class="plate">
        Директор:<br>
        Жусов  Дмитрий Константинович
      </p>
      <p>Политика конфиденциальности</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'FooterBottomSection',
  computed: {
    ...mapState({
      disabledPortal: state => state.mobilemenu.isMobile
    })
  }
}
</script>
