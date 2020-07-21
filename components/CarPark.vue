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
          :class="{'align-left': Array.isArray(subCarArray) && subCarArray.length < 3 && size === 3}"
        >
          <template v-if="Array.isArray(subCarArray) && subCarArray.length">
            <div
              v-for="car in subCarArray"
              :key="car.title"
              class="cars cars--sub-slide"
              @click.stop.prevent="callModal(car)"
            >
              <img :src="car.img" :alt="car.title" class="cars__img">
              <p class="cars__title">
                {{ car.title }}
              </p>
            </div>
          </template>
        </div>
      </template>
    </app-slider>

    <portal to="modal-zone-second">
      <base-modal class="modal-review" @close="toggleModal(false)">
        <h3 slot="header">
          {{ titleCar }}
        </h3>
        <template #body>
          <img :src="imgCar" :alt="titleCar" class="cars__img cars__img--modal">
          <ul class="cat-features">
            <li>
              Длина внутренняя:&nbsp;<b>
                {{ descr.length }}
              </b>
            </li>
            <li>
              Ширина внутренняя:&nbsp;<b>
                {{ descr.width }}
              </b>
            </li>
            <li>
              Высота внутренняя:&nbsp;<b>
                {{ descr.height }}
              </b>
            </li>
            <li>
              Грузоподъемность:&nbsp;<b>
                {{ descr.weight }}
              </b>
            </li>
          </ul>
        </template>
      </base-modal>
    </portal>
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
    BaseModal: () => import('~/components/elements/modals/BaseModal.vue'),
    AppSlider: () => import('~/components/slider')
  },
  data () {
    return {
      mobile: false,
      titleCar: '',
      imgCar: '',
      descr: '',
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
    },
    toggleModal (bool) {
      this.$store.dispatch('modals/toggleModalCar', bool)
    },
    callModal (car) {
      this.titleCar = car.title
      this.imgCar = car.img
      this.descr = car.description
      this.toggleModal(true)
    }
  }
}
</script>
<style lang="scss">
.align-left {
  justify-content: flex-start !important;

  .cars--sub-slide {
    margin-right: 2rem;
  }
}
.cat-features {
  max-width: 600px;
  columns: 2;
  column-gap: 20px;
  column-fill: balance;

  @media (max-width: 767px) {
    columns: 1;
  }
}
</style>
