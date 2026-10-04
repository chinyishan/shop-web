// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  devServer: {
    host: "0.0.0.0",
    port: 1212,
  },

  modules: [
    "@nuxt/eslint",
    "@element-plus/nuxt",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "nuxt-svgo",
  ],

  // 深色模式：預設跟隨系統，使用者切換後記在 localStorage；<html class="dark">
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "",
    storageKey: "healthlab-color-mode",
  },

  piniaPluginPersistedstate: {
    storage: "localStorage",
  },

  svgo: {
    autoImportPath: "./assets/images/icon/",
    defaultImport: "component",
  },

  runtimeConfig: {
    public: {
      // 可用環境變數 NUXT_PUBLIC_MAINTENANCE_MODE=true 開啟
      maintenanceMode: false,
    },
  },

  app: {
    head: {
      titleTemplate: "%s - HealthLab 健康實驗室",
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
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico", sizes: "any" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
    },
  },

  css: [
    "element-plus/theme-chalk/dark/css-vars.css",
    "@/assets/scss/style.scss",
    "@/assets/css/main.css",
  ],

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
  },

  compatibilityDate: "2026-09-13",
});