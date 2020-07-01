<template>
  <div class="container relative stocks">
    <h2>Акции</h2>
    <div class="flex main__arrow-box">
      <button-full class="slider__btn" @click="next">
        <svg-arrow />
      </button-full>
      <button-full class="slider__btn slider__btn--right" @click="prev">
        <svg-arrow />
      </button-full>
    </div>

    <app-slider ref="slider" :must-paginator="true" :repeat="8000" :full="true" class="stocks-h">
      <template #sliders>
        <div
          v-for="i in 4"
          :key="i"
          class="tes"
        >
          <span>Акция №&nbsp;{{ i }}</span>
        </div>
      </template>
    </app-slider>
  </div>
</template>

<script>
export default {
  name: 'Stocks',
  components: {
    ButtonFull: () => import('~/components/elements/ButtonFull.vue'),
    SvgArrow: () => import('~/components/svg/SvgArrow.vue'),
    AppSlider: () => import('~/components/slider')
  },
  methods: {
    next () {
      this.$refs.slider.prevSlide()
    },
    prev () {
      this.$refs.slider.nextSlide()
    }
  }
}
</script>
<style lang="scss">
.stocks {
  margin-bottom: 120px;

  @media (max-width: 767px) {
    margin-bottom: 60px;

    &.container {
      padding: 0;
    }

    .main__arrow-box {
      display: none;
    }

    h2 {
      padding-left: 20px;
    }
  }

  &-h {
    height: 340px !important;
    @media (max-width: 767px) {
      height: 248px !important;
    }
  }
}
.tes {
  text-transform: uppercase;
  display: inline-flex;
  width: 100%;
  height: 340px;
  background: #000;
  color: aliceblue;
  font-size: 20px;
  font-weight: bold;
  align-items: center;
  justify-content: center;

  // loop!
  @for $i from 1 through 4 {
  &:nth-child(#{$i}) {
      // multiply by 10 for larger hue increments
      background: hsl($i * 100, 50%, 50%);
    }
  }
}
</style>
