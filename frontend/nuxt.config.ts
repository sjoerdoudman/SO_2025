// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'nl',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' }, ,
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' },
        { rel: 'manifest', href: '/favicon/site.webmanifest' }
      ],
      script: [
        {
          type: 'text/javascript',
          src: "https://w.soundcloud.com/player/api.js",
          async: true
        },
      ],
    }
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  devServer: {
    port: 2027
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt', '@nuxt/image', 'nuxt-viewport', 'nuxt-security'],
  // @ts-ignore
  image: {
    // Options
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    }
  },
  security: {
    headers: {
      permissionsPolicy: {
        'fullscreen': ['self']
      }
    }
  }
})