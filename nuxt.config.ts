import { repositoryName, apiEndpoint } from './slicemachine.config.json';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  experimental: {
    viewTransition: true,
  },
  app: {
    head: {
      title: 'Prismic + Nuxt Minimal Starter',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/prismic',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    'nuxt-vitalizer',
    'motion-v/nuxt',
    '@nuxt/scripts',
  ],
  
  components: true,

  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],

  image: {
    provider: 'prismic',
    prismic: {
      endpoint: repositoryName,
    },
    imgix: {
      defaultParams: {
        fm: 'avif',
        q: 60,
      },
    },
  },

  build: {
    transpile: ['gsap'],
  },

  prismic: {
    endpoint: apiEndpoint || repositoryName,
    preview: '/api/preview',
    clientConfig: {
      routes: [
        {
          type: 'page',
          path: '/:uid',
        },
        {
          type: 'page',
          uid: 'home',
          path: '/',
        },
        {
          type: 'exhibitions',
          path: '/exhibitions/:uid',
        },
        {
          type: 'art_piece',
          path: '/work/:uid',
        },
      ]
    }
  },

  compatibilityDate: '2025-07-16',
})