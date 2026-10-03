<template>
  <nav class="c-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        v-for="(item, index) in items"
        :key="index"
        :to="item.href ?? ''"
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </nav>
</template>

<script setup lang="ts">
interface Crumb {
  title?: string;
  href?: string;
}

const PRODUCT_TABS: Record<string, string> = {
  products: "商品列表",
  popular: "熱銷排行",
  reviews: "好評回饋",
};

const route = useRoute();
const { navbar, brandLabel } = useSiteConfig();
const currentTitle = useCurrentBreadcrumbTitle();

const findLabel = (list: { key: number; label: string }[], id: unknown) =>
  list.find((item) => item.key === Number(id))?.label;

const articleCategoryLabel = (id: unknown) =>
  id === "all" ? "全部文章" : findLabel(navbar.value.article_categories, id);

/** 依路由名稱組出首頁之後的層級 */
const trail = computed<Crumb[]>(() => {
  const { params, query } = route;
  const brandId = params.brandId as string;

  switch (route.name) {
    case "brands-id":
    case "brands-preview-id":
      return [{ title: "系列品牌" }, { title: brandLabel(params.id as string), href: `/brands/${params.id}` }];

    case "products-brandId-detail":
      return [
        { title: "商品專區" },
        { title: brandLabel(brandId) },
        { title: PRODUCT_TABS[(query.category as string) ?? "products"] },
      ];

    case "products-brandId-product-id":
    case "products-brandId-product-preview-id":
      return [
        { title: "商品專區" },
        { title: brandLabel(brandId), href: `/products/${brandId}/detail` },
        { title: "商品列表", href: `/products/${brandId}/detail` },
        { title: currentTitle.value, href: route.path },
      ];

    case "qualities-id":
    case "qualities-preview-id":
      return [{ title: "品質檢驗" }, { title: findLabel(navbar.value.qualities, params.id), href: `/qualities/${params.id}` }];

    case "articles-id": {
      const categoryId = query.category_id ?? params.id;
      return [{ title: "資訊專欄" }, { title: articleCategoryLabel(categoryId), href: `/articles/${params.id}` }];
    }

    case "articles-categoryId-id": {
      const { categoryId } = params;
      return [
        { title: "資訊專欄" },
        { title: articleCategoryLabel(categoryId), href: `/articles/${categoryId}` },
        { title: currentTitle.value, href: route.path },
      ];
    }

    case "articles-article-preview-id":
      return [
        { title: "資訊專欄" },
        { title: "全部文章", href: "/articles/all" },
        { title: currentTitle.value, href: route.path },
      ];

    case "contact-us-questions":
      return [
        { title: "聯絡我們" },
        { title: "Q&A專區", href: "/contact-us/questions" },
        { title: currentTitle.value, href: "/contact-us/questions" },
      ];

    case "contact-us-information":
      return [{ title: "聯絡我們" }, { title: "聯絡資訊", href: "/contact-us/information" }];

    case "search":
      return [{ title: `搜尋內容：${query.search}` }];

    case "cart":
      return [{ title: "購物車", href: "/cart" }];

    case "checkout":
      return [{ title: "購物車", href: "/cart" }, { title: "結帳", href: "/checkout" }];

    case "checkout-complete":
      return [{ title: "購物車", href: "/cart" }, { title: "訂單完成" }];

    case "wishlist":
      return [{ title: "收藏清單", href: "/wishlist" }];

    case "orders":
      return [{ title: "訂單查詢", href: "/orders" }];

    case "compare":
      return [{ title: "商品比較", href: "/compare" }];

    case "quiz":
      return [{ title: "保健需求測驗", href: "/quiz" }];

    default:
      return [];
  }
});

const items = computed<Crumb[]>(() => [{ title: "首頁", href: "/" }, ...trail.value]);
</script>

<style lang="scss" scoped>
.c-breadcrumb {
  // 窄螢幕改為橫向捲動，避免斷行
  @include md() {
    overflow-x: auto;
    white-space: nowrap;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
