<template>
  <svg aria-hidden="true" width="30" height="30" viewBox="0 0 12 12"><g fill="none" fill-rule="evenodd" aria-hidden="true"><path d="M0 0h12v12H0" />
    <path class="fill" :fill="fill" d="M9.5 3.205L8.795 2.5 6 5.295 3.205 2.5l-.705.705L5.295 6 2.5 8.795l.705.705L6 6.705 8.795 9.5l.705-.705L6.705 6" /></g>
  </svg>
</template>

<script>
export default {
  name: 'SvgCross',
  props: {
    fill: {
      type: String,
      required: false,
      default: '#ccc'
    }
  }
}
</script>
