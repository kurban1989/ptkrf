<template>
  <div class="input-wrap" :class="[{'focus': focus}]" v-bind="$attrs">
    <p v-if="placeholderTitle.length" class="placeholder--title">
      {{ placeholderTitle }}
    </p>
    <input
      :id="idInput"
      v-model="valueModel"
      class="input"
      :type="type"
      :disabled="disabled"
      :class="inputClass"
      :required="requiredFiled"
      @input="checkField(valueModel)"
      @focus="handleFocus($event)"
      @blur="$emit('blur', lossFocus(valueModel))"
      @keyup="$emit('keyup', keyHandler($event))"
      @keydown.enter="$emit('press-enter', $event)"
    >
    <transition name="fade">
      <label v-if="!focus && valueModel === ''" class="placeholder">
        {{ placeholder }}
      </label>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    placeholderTitle: {
      type: String,
      required: false,
      default: ''
    },
    value: {
      type: String,
      required: false,
      default: ''
    },
    inputClass: {
      type: String,
      required: false,
      default: ''
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    validate: {
      type: Boolean,
      required: false,
      default: false
    },
    isClearForm: {
      type: Boolean,
      required: false,
      default: false
    },
    requiredFiled: {
      type: Boolean,
      required: false,
      default: false
    },
    idInput: {
      type: String,
      required: false,
      default: `t${Math.ceil(Math.random() * 100)}`
    }
  },
  data () {
    return {
      valueModel: this.value,
      focus: false,
      key: 0
    }
  },
  watch: {
    isClearForm: {
      handler () {
        if (this.isClearForm) {
          this.valueModel = ''
        }
      },
      immediate: false
    }
  },
  methods: {
    handleFocus (e) {
      this.focus = true
      this.$emit('focus', e)
    },
    lossFocus (val) {
      this.focus = false
      this.checkField(val, 'blur')
    },
    keyHandler (event) {
      this.key = event.keyCode
    },
    checkField (text, eventType) {
      let isValidEmail = false

      if (this.type === 'phone') {
        this.valueModel = this.beutifyPhone(text) || ''
        this.$emit('input', this.valueModel)
      } else if (this.type === 'email' && eventType === 'blur') {
        if (this.isEmail(this.valueModel) || !this.valueModel.length) {
          isValidEmail = true
        } else {
          isValidEmail = false
        }
        this.$emit('is-valid-email', isValidEmail)
      } else {
        this.$emit('input', text)
      }
    },
    beutifyPhone (val) {
      const regex = /\+?[()\-\s]{1,2}$/

      if (!val.length) {
        return false
      } else if (this.key === 8 || this.key === 229 || this.key === 46) {
        return val.replace(regex, '')
      }
      return this.formatPhone(val)
    },
    formatPhone (value) {
      value = value.replace(/[^0-9]/g, '')
      const len = value.length > 11 ? 11 : value.length
      let buf = ''

      if (value.charAt(0) === '7' || value.charAt(0) === '8') {
        value = value.substring(1, len)
      }

      for (let i = 0; i < len; i++) {
        switch (i) {
          case 3:
            buf += ') ' + value.charAt(i)
            break
          case 6:
          case 8:
            buf += '-' + value.charAt(i)
            break
          default:
            buf += value.charAt(i)
        }
      }
      buf = '+7 (' + buf
      return buf
    },
    isEmail (email) {
      const regex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,6})$/
      return regex.test(email)
    }
  }
}
</script>
<style lang="scss" scoped>
.input {
  width: 100%;
  height: 20px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  line-height: 20px;

  &:disabled + label {
      cursor: not-allowed;
      opacity: 0.5;
      pointer-events: none;
      &:hover,
      &:focus {
        &:before {
          border-color:#585858;
          cursor: not-allowed;
        }
      }
    }
}
.input-wrap {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 12px 20px;
  border: 1px solid rgba(182, 202, 253, 0.6);

  &.error {
    border-color: #FF5858;
  }
}
.placeholder {
  position: absolute;
  top: 50%;
  left: 20px;
  color:#585858;
  font-size: 14px;
  line-height: 140%;
  pointer-events: none;
  transform: translateY(-50%);

  &--title {
    font-weight: 500;
    font-size: 12px;
    line-height: 140%;
    color: #585858;
  }
}
.focus {
  border-color: rgba(56, 47, 114, 0.7);
}
.error-input {
  border-color: #F10000 !important;
  box-shadow: unset;
}
.fade-enter-active, .fade-leave-active {
  transition-duration: .2s;
  transition-property: opacity, transform;
}
.fade-enter, .fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
