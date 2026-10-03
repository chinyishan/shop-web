import { defineStore } from "pinia";
export const useNavRouterStore = defineStore("navRouter", () => {
  /** 語系轉換 */
  const langCookie = useCookie("lang");

  /** 導覽列 */
  const navRouter = reactive({
    zh_TW: {
      brands: {
        name: "系列品牌",
        key: "page.brands",
        href: "/brands",
        path: "/brands",
        children: [],
      },
      products: {
        name: "商品專區",
        key: "page.products",
        href: "/products",
        path: "/products",
        children: [],
      },
      qualites: {
        name: "品質檢驗",
        key: "page-quality",
        href: "/qualities",
        path: "/qualities",
        children: [],
      },
      articles: {
        name: "資訊專欄",
        key: "page-articles",
        href: "/articles",
        path: "/articles",
        children: [
          {
            name: "全部文章",
            key: "page-articles",
            href: "/articles/all",
            path: "/articles/all",
          },
        ],
      },
      contact_us: {
        name: "聯絡我們",
        key: "contact-us",
        href: "/contact-us",
        path: "/contact-us",
        children: [
          {
            name: "Q&A專區",
            key: "page-question",
            href: "/contact-us/questions",
            path: "/contact-us/questions",
          },
          {
            name: "聯絡資訊",
            key: "page-contact_us",
            href: "/contact-us/information",
            path: "/contact-us/information",
          },
        ],
      },
    },
  });

  const navRouterData = computed(() => {
    if (langCookie.value == "zh_TW" || langCookie.value == null) {
      return navRouter.zh_TW;
    } else {
      return navRouter.en;
    }
  });

  return {
    navRouterData,
  };
});
