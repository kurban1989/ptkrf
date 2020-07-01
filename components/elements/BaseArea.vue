<template>
  <div class="input-wrap brdr-r-5 brdr-1" :class="[{'focus': focus}, wrapperClass]" v-bind="$attrs">
    <transition name="fade">
      <label v-if="!focus && valueModel === ''" class="placeholder">
        {{ placeholder }}
      </label>
    </transition>
    <textarea
      v-model="valueModel"
      :disabled="disabled"
      :class="inputClass"
      :required="requiredFiled"
      @input="$emit('input', valueModel)"
      @focus="focus = true"
      @blur="focus = false"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseArea',
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
    wrapperClass: {
      type: String,
      required: false,
      default: ''
    },
    validate: {
      type: Boolean,
      required: false,
      default: false
    },
    requiredFiled: {
      type: Boolean,
      required: false,
      default: false
    },
    isClearForm: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      valueModel: this.value,
      focus: false
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
    },
    value: {
      handler () {
        this.valueModel = this.value
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
textarea {
  width: 100%;
  min-height: 80px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 15px;
  resize: none;
  &:disabled + label {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
    &:hover,
    &:focus {
      &:before {
        cursor: not-allowed;
      }
    }
  }
}
.input-wrap {
  width: 650px;
  position: relative;
  overflow: hidden;
  padding: 17px 20px;

  @media (max-width: 767px) {
    width: inherit;
  }

  &.error {
    border-color: #FF5858;
  }
}
.placeholder {
  position: absolute;
  top: 20px;
  left: 20px;
  color: #585858;
  font-size: 15px;
  pointer-events: none;
}
.focus {
  box-shadow: 1px 1px 7px 1px #EAEAEA;
}
</style>
