<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div v-click-outside="emitClose" class="modal-container">
        <div class="modal-header">
          <slot name="header" />

          <button-full class="modal__close" @click="emitClose">
            <svg-cross />
          </button-full>
        </div>

        <div class="modal-body">
          <slot name="body" />
        </div>

        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from '~/directives/vue-click-outside.js'
export default {
  name: 'Modal',
  directives: {
    ClickOutside
  },
  components: {
    ButtonFull: () => import('~/components/elements/ButtonFull.vue'),
    SvgCross: () => import('~/components/svg/SvgCross.vue')
  },
  methods: {
    emitClose () {
      this.$emit('close')
    }
  }
}
</script>
