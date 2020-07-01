<template>
  <div class="flex container">
    <form id="request" action="#" class="main-form relative">
      <div class="main-form--back" @click="prevStep">
        <svg-back v-if="currentStep > 0 && !mobile" />
      </div>
      <div class="main-form__group main-form__step" data-step="s0" :class="{active: currentStep === 0 || mobile}">
        <base-input :is-clear-form="isClearForm" id="departure" v-model="formData.departure" :placeholder="'Пункт отправления'" required-filed />
        <svg-triangle class="main-form--next" />
        <base-input :is-clear-form="isClearForm" id="destination" v-model="formData.destination" :placeholder="'Пункт назначения'" required-filed />
        <svg-triangle class="main-form--next" />
        <base-input :is-clear-form="isClearForm" id="nameCargo" v-model="formData.nameCargo" :placeholder="'Наименование груза'" required-filed />
      </div>
      <div class="main-form__group main-form__step" data-step="s1" :class="{active: currentStep === 1 || mobile}">
        <base-input :is-clear-form="isClearForm" id="lengthCargo" v-model="formData.lengthCargo" :placeholder="'Длина груза, м'" required-filed type="number" />
        <svg-triangle class="main-form--next" />
        <base-input :is-clear-form="isClearForm" id="widthCargo" v-model="formData.widthCargo" :placeholder="'Ширина груза, м'" required-filed type="number" />
        <svg-triangle class="main-form--next" />
        <base-input :is-clear-form="isClearForm" id="heightCargo" v-model="formData.heightCargo" :placeholder="'Высота груза, м'" required-filed type="number" />
        <svg-triangle class="main-form--next" />
        <base-input :is-clear-form="isClearForm" id="weightCargo" v-model="formData.weightCargo" :placeholder="'Вес груза, кг'" required-filed type="number" />
      </div>
      <div class="main-form__group main-form__step" data-step="s2" :class="{active: currentStep === 2 || mobile}">
        <base-input :is-clear-form="isClearForm" id="nameCustomer" v-model="formData.nameCustomer" :placeholder="'Как к вам обращаться?'" required-filed />
        <svg-triangle class="main-form--next" />
        <base-input :is-clear-form="isClearForm" id="phone" v-model="formData.phone" :placeholder="'Телефон'" required-filed type="phone" />
        <svg-triangle class="main-form--next" />
        <base-input :is-clear-form="isClearForm" id="email" v-model="formData.email" :placeholder="'Ваш E-mail'" required-filed type="email" />
      </div>

      <button-full class="primary-button main-form__inline" @click.stop="nextStep">
        {{ submitText }}
      </button-full>
    </form>

    <portal to="modal-zone">
      <base-modal @close="toggleModal(false)">
        <h3 v-if="errText.length" slot="header">
          Произошла ошибка
        </h3>
        <template #body>
          <p v-if="errText.length" class="modal__text-body">
            {{ errText }}
          </p>
          <p v-else class="modal__text-body">
            {{ `Спасибо, ${formData.nameCustomer}! Ваша заявка принята.` }}
          </p>
        </template>

        <button-full slot="footer" class="primary-button" @click="toggleModal(false)">
          ОК
        </button-full>
      </base-modal>
    </portal>
  </div>
</template>

<script>
import { isClient } from '~/helpers'
export default {
  name: 'AppMainForm',
  components: {
    ButtonFull: () => import('~/components/elements/ButtonFull.vue'),
    BaseModal: () => import('~/components/elements/modals/BaseModal.vue'),
    BaseInput: () => import('~/components/elements/BaseInput.vue'),
    SvgTriangle: () => import('~/components/svg/SvgTriangle.vue'),
    SvgBack: () => import('~/components/svg/SvgBack.vue')
  },
  data () {
    return {
      mobile: false,
      formData: {
        nameCustomer: '',
        phone: '',
        email: '',
        departure: '',
        destination: '',
        nameCargo: '',
        lengthCargo: '',
        weightCargo: '',
        widthCargo: '',
        heightCargo: ''
      },
      submitText: 'Далее',
      currentStep: 0,
      error: false,
      errText: '',
      isReady: false,
      isClearForm: false
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
      this.isReady = this.mobile
      this.submitText = this.mobile ? 'Отправить' : this.currentStep === 2 ? 'Отправить' : 'Далее'
    },
    nextStep () {
      const steps = this.$el.querySelectorAll('.main-form__step')
      if (this.isNotInputFill()) {
        return
      }

      this.isReady && this.send()

      if (steps.length - 1 > this.currentStep) {
        this.currentStep++
      }

      if (this.currentStep === 2) {
        this.isReady = true
        this.submitText = 'Отправить'
      }
    },
    prevStep () {
      if (this.currentStep > 0) {
        this.currentStep--
        this.isReady = false
        this.submitText = 'Далее'
      }
    },
    isNotInputFill () {
      const parent = this.$el.querySelector('#request')
      let blockForm = null
      let isError = false

      if (!this.mobile) {
        blockForm = parent.querySelectorAll(`.main-form__step[data-step="s${this.currentStep}"] div[id]`)
      } else {
        blockForm = parent.querySelectorAll('.main-form__step div[id]')
      };

      [].forEach.call(blockForm, (element) => {
        // console.log(this.formData[element.getAttribute('id')], element.getAttribute('id'))
        if (this.formData[element.getAttribute('id')] === '') {
          element.classList.add('error')
          isError = true
        } else {
          element.classList.remove('error')
        }
      })

      this.error = isError
      return isError
    },
    send () {
      if (!this.error) {
        this.$axios.post(`${process.env.baseUrl}/api/sendmail/send`, {
          formCargo: this.formData
        }).then((result) => {
          this.errText = ''
          this.isClearForm = true
          this.toggleModal(true)

          Object.keys(this.formData).forEach((item) => {
            this.formData[item] = ''
          })
          this.isClearForm = false
        }).catch((e) => {
          this.errText = 'Ваш запрос не отправлен!'
          this.toggleModal(true)
        })
      }
    },
    toggleModal (bool) {
      this.$store.dispatch('modals/toggleModal', bool)
    }
  }
}
</script>
<style lang="scss">
.primary-button_form {
  margin-right: 20px;
}
.main-form {
  display: flex;
  align-items: center;
  overflow: hidden;
  flex-wrap: wrap;
  margin-bottom: 95px;

  @media (max-width: 1200px) {
    width: 70vw;
    flex-direction: column;
    background: #fff;
    padding: 40px 70px;
  }

  @media (max-width: 767px) {
    width: 100%;
    padding: 30px 24px;
    margin-bottom: 40px;
  }

  &__group {
    align-items: center;
    background-color: #fff;
    padding: 15px 50px;
    padding-right: 30px;
    display: inline-flex;
    margin-right: 10px;

    @media (max-width: 1200px) {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
    }

    .input-wrap {
      width: 205px !important;
      display: inline-block;
      margin-right: 20px;

      @media (max-width: 1200px) {
        width: 100% !important;
        margin-right: 0;
        margin-bottom: 17px;
      }
    }
  }

  &__inline {
    display: inline-flex;

    @media (max-width: 1200px) {
      width: 100%;
      justify-content: center;
      margin-top: 20px;
    }
  }

  &__step {
    transition: all .4s ease-in-out;
    position: absolute;
    pointer-events: none;
    top: -100%;
    left: 0;
    opacity: 0;
    z-index: 0;

    &.active {
      top: 0;
      opacity: 1;
      position: relative;
      pointer-events: all;
    }
  }

  &--next {
    margin-right: 20px;

    @media (max-width: 1200px) {
      display: none;
    }
  }

  &--back {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
  }
}
</style>
