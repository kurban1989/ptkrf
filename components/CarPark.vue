<template>
  <div class="container relative cars--park">
    <h2>Автопарк</h2>
    <div class="flex main__arrow-box">
      <button-full class="slider__btn" @click="next">
        <svg-arrow />
      </button-full>
      <button-full class="slider__btn slider__btn--right" @click="prev">
        <svg-arrow />
      </button-full>
    </div>

    <app-slider ref="slider">
      <template #sliders>
        <div
          v-for="(subCarArray, index) in autoPark"
          :key="index"
          class="flex cars__slide"
        >
          <div
            v-for="car in subCarArray"
            :key="car.title"
            class="cars cars--sub-slide"
          >
            <img :src="car.img" :alt="car.title" class="cars__img">
            <p class="cars__title">
              {{ car.title }}
            </p>
          </div>
        </div>
      </template>
    </app-slider>
  </div>
</template>

<script>
import carPark from '~/resourse/carPark.json'
import { isClient } from '~/helpers'

export default {
  name: 'CarPark',
  components: {
    ButtonFull: () => import('~/components/elements/ButtonFull.vue'),
    SvgArrow: () => import('~/components/svg/SvgArrow.vue'),
    AppSlider: () => import('~/components/slider')
  },
  data () {
    return {
      mobile: false,
      carPark
    }
  },
  computed: {
    autoPark () {
      return this.carPark.reduce((p, c) => {
        if (p[p.length - 1].length === this.size) {
          p.push([])
        }

        p[p.length - 1].push(c)
        return p
      }, [[]])
    },
    size () {
      if (isClient() && this.mobile) {
        if (window.matchMedia('(max-width: 1200px)').matches && window.matchMedia('(min-width: 768px)').matches) {
          return 2
        }

        if (window.matchMedia('(max-width: 767px)').matches) {
          return 1
        }
      }
      return 3
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
      this.mobile = false
      this.mobile = window.matchMedia('(max-width: 1200px)').matches
    },
    next () {
      this.$refs.slider.prevSlide()
    },
    prev () {
      this.$refs.slider.nextSlide()
    }
  }
}
</script>
