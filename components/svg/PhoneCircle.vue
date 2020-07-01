<template>
  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28" viewBox="0 0 28 28">
    <defs>
      <clipPath id="clip-path">
        <circle
          id="Ellipse_1"
          data-name="Ellipse 1"
          cx="14"
          cy="14"
          r="14"
          transform="translate(1415 65)"
          :fill="fill"
        />
      </clipPath>
    </defs>
    <g id="Mask_Group_1" data-name="Mask Group 1" transform="translate(-1415 -65)" clip-path="url(#clip-path)">
      <g id="miscellaneous" transform="translate(1415 65)">
        <g id="Group_2006" data-name="Group 2006">
          <path id="Path_13" data-name="Path 13" d="M23.9,4.1A14,14,0,1,0,28,14,14,14,0,0,0,23.9,4.1ZM21.2,19.5l0,0v0l-.709.7a3.733,3.733,0,0,1-3.523,1.008,12.4,12.4,0,0,1-3.6-1.615,16.645,16.645,0,0,1-2.842-2.291A16.773,16.773,0,0,1,8.4,14.73,13.065,13.065,0,0,1,6.8,11.5a3.733,3.733,0,0,1,.933-3.813l.831-.831a.593.593,0,0,1,.838,0l0,0L12.031,9.48a.593.593,0,0,1,0,.838l0,0-1.54,1.54a1.255,1.255,0,0,0-.131,1.633A18.01,18.01,0,0,0,12.2,15.644a17.9,17.9,0,0,0,2.427,2.039,1.265,1.265,0,0,0,1.615-.14l1.489-1.512a.593.593,0,0,1,.838,0l0,0L21.2,18.664A.593.593,0,0,1,21.2,19.5Z" :fill="fill" />
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'PhoneCircle',
  props: {
    fill: {
      type: String,
      required: false,
      default: '#095fa8'
    }
  }
}
</script>
