import type { RouterConfig } from "@nuxt/schema";

export default {
  // 換頁一律回到頁首；瀏覽器上一頁／下一頁則回到原本的位置
  scrollBehavior: (_to, _from, savedPosition) => savedPosition ?? { left: 0, top: 0 },
} satisfies RouterConfig;
