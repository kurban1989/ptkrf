<template>
  <div class="reviews-page">
    <div class="container relative">
      <h1 class="reviews-page--h1">
        Отзывы клиентов
      </h1>

      <p class="reviews-page__sub-p">
        Оставьте свое честное мнение о работе нашей компании!
      </p>
      <button-full class="primary-button reviews-page__btn-leave" @click.stop="toggleModal(true)">
        ОСТАВИТЬ ОТЗЫВ
      </button-full>

      <img src="/img/big-logo.png" alt="" class="reviews-page__img-r">

      <ul v-if="Array.isArray(reviews) && reviews.length" class="reviews-page__reviews flex">
        <li v-for="review in reviews" :key="review.id" class="reviews-page__block">
          <div class="head-rev">
            {{ `${review.name}${review.company.length ? `, ${review.company}` : ''}` }}
          </div>
          <span class="time-rev">
            <time class="time" :datetime="new Date(review.date).toLocaleDateString('ru', optionDate)">
              {{ new Date(review.date).toLocaleDateString('ru', optionDate) }}
            </time>
          </span>
          <p class="text-rev">
            {{ review.review }}
          </p>
        </li>
      </ul>
    </div>

    <portal to="modal-zone">
      <base-modal class="modal-review" @close="toggleModal(false)">
        <h3 v-if="!isReviewSent" slot="header" class="reviews-page__h3">
          Оставьте честное мнение о работе нашей компании!
        </h3>
        <template #body>
          <template v-if="isReviewSent">
            <p style="text-align: center;">
              Спасибо! Ваш отзыв скоро <br>
              появится в общем списке
            </p>
          </template>
          <template v-else>
            <base-input id="name-rev" v-model="formData.name" class="reviews-page__input" :placeholder="'Ваше имя *'" required-filed />
            <base-input v-model="formData.company" class="reviews-page__input" :placeholder="'Название организации'" />
            <base-area id="review-rev" v-model="formData.review" class="reviews-page__input reviews-page__input--area" :placeholder="'Ваш отзыв *'" required-filed />
          </template>
        </template>

        <button-full slot="footer" class="primary-button" :class="{'flex-rev': isReviewSent}" @click="addReview">
          {{ `${isReviewSent ? 'OK':'ОСТАВИТЬ ОТЗЫВ'}` }}
        </button-full>
      </base-modal>
    </portal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isClient } from '~/helpers'
export default {
  name: 'ReviewsPage',
  components: {
    BaseInput: () => import('~/components/elements/BaseInput.vue'),
    BaseArea: () => import('~/components/elements/BaseArea.vue'),
    BaseModal: () => import('~/components/elements/modals/BaseModal.vue'),
    ButtonFull: () => import('~/components/elements/ButtonFull.vue')
  },
  async asyncData ({ $axios, store, req }) {
    const review = await $axios.get(`${process.env.baseUrl}/api/reviews/get-all`)
    store.dispatch('reviews/setReviews', review)
    return {
      baseURL: isClient ? '' : req.headers.host
    }
  },
  data () {
    return {
      optionDate: {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      },
      formData: {
        name: '',
        company: '',
        review: ''
      },
      isReviewSent: false
    }
  },
  computed: {
    ...mapState({
      reviews: state => state.reviews.reviews || []
    })
  },
  methods: {
    addReview () {
      if (this.isReviewSent) {
        this.toggleModal(false)
        return false
      }

      const name = document.querySelector('#name-rev')
      const review = document.querySelector('#review-rev')
      let hasError = false

      if (this.formData.name === '') {
        name.classList.add('error')
        hasError = true
      } else {
        name.classList.remove('error')
      }

      if (this.formData.review === '') {
        review.classList.add('error')
        hasError = true
      } else {
        review.classList.remove('error')
      }

      if (hasError) { return false }

      this.isReviewSent = true

      this.$axios.post(`${process.env.baseUrl}/api/reviews/set`, this.formData)
    },
    toggleModal (bool) {
      this.$store.dispatch('modals/toggleModal', bool)
    }
  },
  head () {
    const canonical = this.baseURL + this.$route.fullPath

    return {
      title: 'Отзывы клиентов',
      meta: [
        { name: 'description', hid: 'description', content: 'Отзывы клиентов о Первой транспортной компании' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:site_name', content: this.baseURL },
        { property: 'og:title', content: 'Отзывы клиентов' },
        { property: 'og:description', content: 'Отзывы клиентов' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: this.baseURL },
        { property: 'og:image', content: this.baseURL + '/img/big-logo.png' }
      ],
      link: [{
        rel: 'canonical',
        href: canonical
      }]
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/reviews';
</style>
