import { defineStore } from "pinia";
export const useResourceStore = defineStore("resource", () => {
  const options = reactive({
    navbar: {
      article_categories: [
        {
          key: "all",
          label: "全部文章",
        },
      ],
      productCategories: [
        {
          key: "products",
          label: "商品列表",
        },
        {
          key: "popular",
          label: "熱銷排行",
        },
        {
          key: "reviews",
          label: "好評回饋",
        },
      ],
    },
    breadcrumb: {
      productsInfo: [],
      articlesInfo: [],
      questionsCategories: [],
    },
  });

  return {
    options,
  };
});
