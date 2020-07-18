<template>
  <div class="reviews-page reviews-page--small-pad">
    <article class="container relative">
      <h1 class="reviews-page--h1">
        Контакты компании ООО «Первая Транспортная Компания»
      </h1>
      <div class="content_contacts">
        <div class="flex flex--column justify-between">
          <div>
            <h3 class="second-title">
              Фактический адрес офиса:
            </h3>
            <span>Новозаводская, дом. 2-А, строение 326</span>
          </div>
          <div>
            <h3 class="second-title">
              Телефон:
            </h3>
            <span>
              <a href="tel:+78002014850">8 (800) 201-48-50</a>
            </span>
          </div>
          <div>
            <h3 class="second-title">
              Почтовый адрес:
            </h3>
            <span>
              <a href="mailto:ptk.dkm@gmail.com">ptk.dkm@gmail.com</a>
            </span>
          </div>
        </div>
        <div>
          <yandex-map
            :settings="settings"
            :options="mapOptions"
            :coords="mapOptions.center"
            :scroll-zoom="false"
            @map-was-initialized="setObjectMap"
          >
            <ymap-marker
              :marker-id="'office'"
              :coords="mapOptions.center"
              :balloon-template="balloonTemplate"
            />
          </yandex-map>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { isClient } from '~/helpers'
export default {
  name: 'Contacts',
  asyncData ({ req }) {
    return {
      baseURL: isClient ? '' : req.headers.host
    }
  },
  data () {
    return {
      balloonTemplate: '<p>«Первая Транспортная Компания» <br> Новозаводская, дом. 2-А, строение 326</p>',
      yMap: null
    }
  },
  computed: {
    settings () {
      return {
        apiKey: 'b6ae3e63-aa63-422f-9d84-5db7fe63c0a1',
        lang: 'ru',
        coordorder: 'latlong',
        version: '2.1'
      }
    },
    mapOptions () {
      return Object.assign({}, {
        center: [53.565862, 49.457440],
        zoom: 12
      },
      {
        searchControlProvider: 'yandex#search'
      })
    },
    ymaps () {
      return isClient && window.ymaps ? window.ymaps : null
    }
  },
  methods: {
    setObjectMap (objectMap) {
      if (!this.ymaps || !objectMap) {
        return
      }

      const zoomControl = new this.ymaps.control.ZoomControl({
        options: {
          adjustMapMargin: true,
          size: 'small',
          left: 'auto',
          right: 40,
          top: 200
        }
      })

      this.yMap = objectMap
      this.yMap.margin.addArea({
        left: 0,
        top: 0,
        width: 78,
        height: 100
      })
      this.yMap.controls.remove('zoomControl')
      this.yMap.controls.remove('geolocationControl')
      this.yMap.controls.remove('trafficControl')
      this.yMap.controls.remove('fullscreenControl')
      this.yMap.controls.remove('typeSelector')
      this.yMap.controls.remove('rulerControl')
      this.yMap.controls.remove('searchControl')
      this.yMap.controls.add(zoomControl)
    }
  },
  head () {
    const canonical = this.baseURL + this.$route.fullPath

    return {
      title: 'Контакты компании ООО «Первая Транспортная Компания»',
      meta: [
        { name: 'description', hid: 'description', content: 'Контакты компании ООО «Первая Транспортная Компания»' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:site_name', content: this.baseURL },
        { property: 'og:title', content: 'Контакты компании ООО «Первая Транспортная Компания»' },
        { property: 'og:description', content: 'Контакты компании ООО «Первая Транспортная Компания», связаться с нами, посмотреть на карте' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: this.baseURL },
        { property: 'og:image', content: this.baseURL + '/img/big-logo.png' }
      ],
      link: [{
        rel: 'canonical',
        href: canonical
      }]
    }
  }
}
</script>

<style lang="scss">
@import '~/assets/scss/reviews';
.content_contacts {
  padding-right: 20px;
  grid-gap: 20px;
  display: grid;
  grid-template-columns: 2fr 5fr;
  grid-template-rows: max-content;

  @media (max-width: 1023px) {
    padding-right: 20px;
    grid-gap: 20px;
    display: grid;
    grid-template-columns: 100%;
  }
}
.ymap-container {
  height: 400px;
  padding-top: 10px;
  width: 100%;
}
</style>
