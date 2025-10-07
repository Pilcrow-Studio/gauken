import { repositoryName, apiEndpoint } from "./slicemachine.config.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  experimental: {
    viewTransition: false,
    crossOriginPrefetch: true,
    asyncEntry: true,
    componentIslands: true,
  },

  app: {
    head: {
      title: "David Wilson",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
        { rel: "preconnect", href: "https://images.prismic.io" },
        { rel: "dns-prefetch", href: "https://images.prismic.io" },
        { rel: "preconnect", href: "https://gauken.cdn.prismic.io" },
        { rel: "dns-prefetch", href: "https://gauken.cdn.prismic.io" },
      ],
    },
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/prismic",
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "nuxt-vitalizer",
    "motion-v/nuxt",
    "@nuxt/scripts",
    "@nuxtjs/seo",
    "nuxt-swiper",
  ],

  site: {
    url: "https://gauken.art",
    name: "Gauken Art",
    description: "Gauken Art is a collection of art pieces by David Wilson.",
    logo: "/logo.png",
    icon: "/favicon.png",
    defaultLocale: "en",
    locales: ["en"],
  },

  components: true,

  css: ["~/assets/css/tailwind.css", "~/assets/css/main.css"],

  image: {
    provider: "prismic",
    prismic: {
      endpoint: repositoryName,
    },
    screens: {
      mobile: 600,
      tablet: 800,
      desktop: 1200,
    },
    quality: 70,
    format: ["avif", "webp"],
    ipx: {
      modifiers: {
        format: "avif",
      },
    },
    imgix: {
      defaultParams: {
        fm: "avif",
        q: 70,
      },
    },
  },

  build: {
    transpile: ["gsap"],
  },

  runtimeConfig: {
    prismicWebhookSecret: process.env.PRISMIC_WEBHOOK_SECRET,
  },

  prismic: {
    endpoint: repositoryName || apiEndpoint,
    preview: "/api/preview",
    clientConfig: {
      routes: [
        {
          type: "page",
          path: "/:uid",
        },
        {
          type: "front_page",
          uid: "home",
          path: "/",
        },
        {
          type: "work",
          uid: "work",
          path: "/work",
        },
        {
          type: "about",
          uid: "about",
          path: "/about",
        },
        {
          type: "contact",
          uid: "contact",
          path: "/contact",
        },
        {
          type: "exhibitions_overview",
          uid: "exhibitions",
          path: "/exhibitions",
        },
        {
          type: "exhibitions",
          path: "/exhibitions/:uid",
        },
        {
          type: "art_piece",
          path: "/work/:uid",
        },
      ],
      brokenRoute: "/404",
    },
  },
  compatibilityDate: "2025-07-16",

  nitro: {
    preset: "netlify",
    experimental: {
      wasm: true,
    },
  },
});
