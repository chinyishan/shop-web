// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  imports: {
    dirs: ["stores"],
  },

  devServer: {
    host: "0.0.0.0", // default: localhost
    port: 1212,
  },

  modules: ["@element-plus/nuxt", "@nuxt/image", 'nuxt-svgo',[
    "@pinia/nuxt",
    {
      autoImports: ["defineStore"],
    },
  ],],

  svgo: {
    // svgo: false,
    autoImportPath: './app/assets/images/icon/',
    defaultImport: 'component',
  },

  image: {
    dir: "assets/images",
  },

  runtimeConfig: {
    public: {
      environment: process.env.NUXT_ENVIRONMENT,
      maintainceMode: process.env.NUXT_MAINTENANCE_MODE,
    },
  },

  plugins: [
    {
      src: "~/plugins/scroll.client",
      ssr: true,
    },
    {
      src: '~/plugins/vConsole.client.js' 
    }
  ],

  app: {
    head: {
      title: "",
      titleTemplate: "HealthLab 健康實驗室 %s",
      htmlAttrs: {
        lang: "zh-TW",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "description",
          content: "HealthLab 健康實驗室｜用科學守護每日健康",
        },
        { name: "format-detection", content: "telephone=no" },
        { name: "keywords", content: "HealthLab,健康實驗室,保健食品,台灣" },
        { property: "og:title", content: "HealthLab 健康實驗室" },
        {
          property: "og:description",
          content: "HealthLab 健康實驗室｜用科學守護每日健康",
        },
        { property: "og:image", content: "/og-image.svg" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "alternate icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
    },
    // pageTransition: { name: "fade", mode: "out-in" },
    // layoutTransition: { name: "fade", mode: "out-in" },
  },

  css: ["@/assets/scss/style.scss", "@/assets/css/main.css"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_var.scss" as *;',
        },
      },
    },
  },

  experimental: {
    viewTransition: true,
    renderJsonPayloads: true,
  },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: "2026-09-13",
});