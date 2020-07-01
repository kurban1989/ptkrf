
module.exports = {
  // Only Production
  server: {
  // nuxt.js server options ( can be overrided by environment variables )
    port: 3000,
    host: process.env.NODE_ENV !== 'production' ? '127.0.0.1' : 'ptkrf.com'
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Первая транспортная компания',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Первая транспортная компания. Профессиональная организация грузоперевозок' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#095FA8' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/style.scss'
  ],
  env: {
    baseUrl: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'http://ptkrf.com'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '~/plugins/hummer',
      ssr: false
    },
    { src: '~/plugins/VScrollLock', mode: 'client' },
    '~/plugins/portal'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    publicPath: '/_dist/',
    /*
    ** You can extend webpack config here
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
