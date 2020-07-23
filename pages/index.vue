<template>
  <div v-bind="$attrs">
    <div class="flex banner">
      <section class="container">
        <h1 class="main--h1">
          Первая Транспортная Компания.
          Профессиональная организация
          грузоперевозок
        </h1>
        <p class="main--p">
          Ваш груз в надежных руках.
        </p>
        <div class="mobile-only banner--phone flex">
          <svg-phone-circle fill="#fff" />
          <a href="tel:+78002014850">8 (800) 201-48-50</a>
        </div>
        <button-full class="primary-button" @click="goToBlock({ link: '#request'})">
          ОФОРМИТЬ ЗАЯВКУ
        </button-full>
      </section>
    </div>
    <details-cargo />
    <!-- <stocks /> -->
    <car-park />
    <app-docs />
    <app-reviews />
    <app-request />
  </div>
</template>

<script>
import SvgPhoneCircle from '@/components/svg/PhoneCircle.vue'
import goto from '~/mixins/goto.js'

export default {
  name: 'Index',
  scrollToTop: true,
  components: {
    SvgPhoneCircle,
    DetailsCargo: () => import('~/components/Details.vue'),
    ButtonFull: () => import('~/components/elements/ButtonFull.vue'),
    // Stocks: () => import('~/components/Stocks.vue'),
    AppDocs: () => import('~/components/AppDocs.vue'),
    AppReviews: () => import('~/components/AppReviews.vue'),
    CarPark: () => import('~/components/CarPark.vue'),
    AppRequest: () => import('~/components/AppRequest.vue')
  },
  mixins: [goto],
  async asyncData ({ $axios, store }) {
    const review = await $axios.get(`${process.env.baseUrl}/api/reviews/get-all`)
    store.dispatch('reviews/setReviews', review)
  }
}
</script>
<style lang="scss">
@import '~/assets/scss/body-main';
</style>
