<template>
  <div class="slider" v-bind="$attrs" @mouseenter="isRepeat = false" @mouseleave="isRepeat = true">
    <template v-show="isTouch">
      <v-touch @swipeleft="nextSlide" @swiperight="prevSlide">
        <div class="slider__body js-slider" :style="{left: sliderOffsetLeft + 'px'}">
          <slot name="sliders" />
        </div>
      </v-touch>
    </template>

    <template v-else>
      <div class="slider__body js-slider" :style="{left: sliderOffsetLeft + 'px'}">
        <slot name="sliders" />
      </div>
    </template>
    <ul v-show="mustPaginator" class="slider__paginator">
      <li v-for="i in sliderAllCount" :key="`btn${i}`" role="button" :class="{active: i === sliderActive}" @click="openSlide(i)">
        {{ i }}
      </li>
    </ul>
  </div>
</template>

<script>
import { isClient, isEmpty } from '~/helpers'

export default {
  name: 'AppSlider',
  props: {
    // Пагинация в виде "кружочков"
    mustPaginator: {
      type: Boolean,
      required: false,
      default: false
    },
    full: {
      type: Boolean,
      required: false,
      default: false
    },
    repeat: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      // Всего слайдов
      sliderAllCount: 0,
      // Номер активного слайда
      sliderActive: 1,
      // Отступ тела со слайдами в контейнере
      sliderOffsetLeft: 0,
      // Шаг одного слайда = его длина
      sliderOffsetStep: 0,
      // Таймер для интервала, его ID в системе
      timer: null,
      isRepeat: true
    }
  },
  computed: {
    dataSlider () {
      if (isClient()) {
        // Получаем элементы сладера и его слайдов
        const sliderBody = this.$el.querySelector('.js-slider')
        const sliderSlidies = this.$el.querySelectorAll('.js-slider > *')
        const lengthElements = [].map.call(sliderSlidies, (el) => {
          return { width: el.getBoundingClientRect().width }
        })

        return {
          sliderBody,
          sliderSlidies,
          lengthElements
        }
      }
      return {}
    },
    isTouch () {
      return isClient()
    }
  },
  mounted () {
    if (isClient()) {
      this.initSlider()
      // Перенастройка слайдера при ресайзе окна
      window.addEventListener('resize', () => {
        this.initSlider()
        this.openSlide(this.sliderActive)
        this.everySlideOffsetLeft()
      })
    }
  },
  beforeDestroy () {
    if (isClient()) {
      window.removeEventListener('resize', () => {
        this.initSlider()
        this.openSlide(this.sliderActive)
        this.everySlideOffsetLeft()
      })

      if (this.timer) {
        clearInterval(this.timer)
      }
    }
  },
  methods: {
    // Иницилизация слайдера
    initSlider () {
      if (!isEmpty(this.dataSlider)) {
        // Записываем длину одного слайда для перелистывания
        this.offsetStep()
        // Общее количество слайдов для стопов
        this.sliderAllCount = this.$el.querySelectorAll('.js-slider > *').length
        this.everySlideOffsetLeft()

        if (this.repeat >= 1000) {
          this.timer = setInterval(() => {
            if (this.isRepeat) {
              this.nextSlide()
            }
          }, this.repeat)
        }
      }
    },
    // Делаем отступ каждому слайду
    everySlideOffsetLeft () {
      const allSlides = this.$el.querySelectorAll('.js-slider > *')
      const lengthElements = [].map.call(allSlides, (el) => {
        return { width: el.getBoundingClientRect().width }
      })

      allSlides.forEach((el, index) => {
        el.style.left = `${lengthElements[index].width * index}px`
      })
    },
    // Текущий шаг длины для перелистывания
    offsetStep (id) {
      if (this.full && id) {
        id--
        this.sliderOffsetStep =
        this.dataSlider.lengthElements.length && this.dataSlider.lengthElements[id].width
          ? this.dataSlider.lengthElements[id].width
          : this.dataSlider.lengthElements[0].width
      }

      this.sliderOffsetStep = this.dataSlider.sliderBody.clientWidth
    },

    // Открыть слайд по номеру
    openSlide (id) {
      if (id > 0 && id <= this.sliderAllCount) {
        this.sliderActive = id
        this.offsetStep(this.sliderActive)
        // Сдвигаем элемент со слайдами
        this.sliderOffsetLeft = -(this.sliderActive * this.sliderOffsetStep - this.sliderOffsetStep)
      }
    },

    nextSlide () {
      if (this.sliderActive < this.sliderAllCount) {
        this.offsetStep(this.sliderActive)
        this.sliderActive += 1
        this.openSlide(this.sliderActive)
      } else {
        this.openSlide(1)
      }
    },
    prevSlide () {
      if (this.sliderActive > 1) {
        this.offsetStep(this.sliderActive)
        this.sliderActive -= 1
        this.openSlide(this.sliderActive)
      }
    }
  }
}
</script>

<style lang="scss">
$slider-height: 380px;
$slide-width: 100%;

.slider {
  width: 100%;
  height: $slider-height;
  position: relative;
  overflow: hidden;

  &__body {
    min-width: auto;
    height: inherit;
    display: flex;
    position: relative;
    align-items: stretch;
    transition: all .5s ease;

    &> * {
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  &__paginator {
    display: flex;
    width: fit-content;
    align-items: center;
    position: absolute;
    left: 50%;
    bottom: 35px;
    transform: translateX(-50%);
    list-style: none;

    @media (max-width: 767px) {
      bottom: 25px;
    }

    li {
      width: 18px;
      height: 18px;
      cursor: pointer;
      border-radius: 50%;
      background: #707070;
      margin-right: 15px;
      font-size: 0;

      @media (max-width: 767px) {
        width: 10px;
        height: 10px;
        margin-right: 8px;
      }

      &.active {
        background: #fff;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
