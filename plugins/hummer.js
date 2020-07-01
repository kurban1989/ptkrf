import Vue from 'vue'
import VueTouch from 'vue-touch'

VueTouch.registerCustomEvent('ctap', {
  type: 'tap',
  taps: 1
})

Vue.use(VueTouch)
