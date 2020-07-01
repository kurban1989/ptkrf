<template>
  <div class="container wrap-review">
    <div class="docs__header flex">
      <h2>Отзывы клиентов</h2>

      <button-full link="reviews-page" class="secondary-link">
        Смотреть все
      </button-full>
    </div>

    <app-slider :must-paginator="true" class="slider-review">
      <template #sliders>
        <div
          v-for="(feedback, index) in nestedReviews"
          :key="index"
          class="flex cars__slide"
        >
          <card-review
            v-for="review in feedback"
            :key="review.id"
            :title="`${review.name}${review.company.length ? `, ${review.company}` : ''}`"
            :text="review.review"
          />
        </div>
      </template>
    </app-slider>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isClient } from '~/helpers'

export default {
  name: 'AppReviews',
  components: {
    AppSlider: () => import('~/components/slider'),
    ButtonFull: () => import('~/components/elements/ButtonFull.vue'),
    CardReview: () => import('~/components/elements/CardReview')
  },
  data () {
    return {
      mobile: false
    }
  },
  computed: {
    ...mapState({
      reviews: state => state.reviews.reviews
    }),
    nestedReviews () {
      if (this.reviews) {
        return this.reviews.reduce((p, c) => {
          if (p[p.length - 1].length === this.size) {
            p.push([])
          }

          p[p.length - 1].push(c)
          return p
        }, [[]])
      }
      return []
    },
    size () {
      if (isClient() && this.mobile) {
        return window.matchMedia('(max-width: 1200px)').matches ? 1 : 2
      }
      return 2
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
      this.mobile = window.matchMedia('(max-width: 1200px)').matches
    }
  }
}
</script>
<style lang="scss">
.slider-review {
  height: 390px !important;

  @media (max-width: 767px) {
    height: 330px !important;
  }

  .slider__paginator {
    bottom: 0 !important;

    @media (max-width: 767px) {
      bottom: 23px !important;
    }

    li.active {
      background: #2F295D;
    }
  }
}
.wrap-review {
  margin-bottom: 100px;

  @media (max-width: 767px) {
    margin-bottom: 0;
  }
}
</style>
