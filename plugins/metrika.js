import Vue from 'vue'
import VueYandexMetrika from 'vue-yandex-metrika'
const configObjects = require('../server/conf')

Vue.use(VueYandexMetrika, {
  id: configObjects.yametrika.key,
  env: process.env.NODE_ENV,
  ignoreRoutes: ['confirm-admin']
  // other options
})
