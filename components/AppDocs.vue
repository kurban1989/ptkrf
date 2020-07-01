<template>
  <div class="docs">
    <div class="container">
      <div class="docs__header flex">
        <h2>Документы</h2>

        <a href="/pdf/download" target="_blank" class="secondary-link">
          Скачать все документы в формате PDF
        </a>
      </div>

      <div class="docs__images">
        <img v-for="(img, i) in docsImages" :key="`D${i}`" :src="img.img" :alt="img.alt">
      </div>
    </div>
  </div>
</template>

<script>
import docsImages from '~/resourse/docsImages.json'
export default {
  name: 'AppDocs',
  data () {
    return {
      docsImages
    }
  }
}
</script>
