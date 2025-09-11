import { repositoryName, apiEndpoint } from "./slicemachine.config.json";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  experimental: {
    viewTransition: true,
    crossOriginPrefetch: true,
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
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
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
          type: "page",
          uid: "home",
          path: "/",
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
    },
  },

  compatibilityDate: "2025-07-16",
});
