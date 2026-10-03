<template>
  <nav class="c-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        :to="item.href ?? ''"
        v-for="(item, index) in breadcrumbData"
        :key="index"
        >{{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from "#vue-router";
import _ from "lodash";
const router = useRouter();
const route = useRoute();
const { options } = useResourceStore();
const { breadcrumb, navbar } = options;
const initBreadcrumb = [
  {
    title: "首頁",
    href: "/",
  },
];

const breadcrumbData = ref(initBreadcrumb);
onMounted(() => {
  watch(
    route,
    (newVal) => {
      // 依照路由去拆分麵包屑
      breadcrumbData.value = _.cloneDeep(initBreadcrumb);
      switch (newVal.name) {
        // path: brands/1
        case "brands-id":
          breadcrumbData.value.push({
            title: "系列品牌",
            href: null,
          });

          breadcrumbData.value.push({
            title: _.find(navbar.brands, { key: Number(route.params.id) })
              ?.label,
            href: `/brands/${route.params.id}`,
          });

          break;
        case "brands-preview-id":
          breadcrumbData.value.push({
            title: "系列品牌",
            href: null,
          });

          breadcrumbData.value.push({
            title: _.find(navbar.brands, { key: Number(route.params.id) })
              ?.label,
            href: `/brands/${route.params.id}`,
          });

          break;

        // path: products/1/detail
        case "products-brandId-detail":
          // 商品列表
          breadcrumbData.value.push({
            title: "商品專區",
            href: null,
          });

          breadcrumbData.value.push({
            title: _.find(navbar.brands, { key: Number(route.params.brandId) })
              ?.label,
          });

          breadcrumbData.value.push({
            title: _.find(navbar.productCategories, {
              key: route.query.category ?? "products",
            })?.label,
          });

          break;

        // path: products/1/product/1
        case "products-brandId-product-id":
          // 商品單筆
          breadcrumbData.value.push({
            title: "商品專區",
            href: null,
          });

          breadcrumbData.value.push({
            title: _.find(navbar.brands, { key: Number(route.params.brandId) })
              ?.label,
            href: `/products/${route.params.brandId}/detail`,
          });

          breadcrumbData.value.push({
            title: "商品列表",
            href: `/products/${route.params.brandId}/detail`,
          });
          breadcrumbData.value.push({
            title: _.find(breadcrumb.productsInfo, {
              key: Number(route.params.id),
            })?.label,
            href: `/products/${route.params.brandId}/product/${route.params.id}`,
          });
          break;

        case "products-brandId-product-preview-id":
          // 商品單筆
          breadcrumbData.value.push({
            title: "商品專區",
            href: null,
          });

          breadcrumbData.value.push({
            title: _.find(navbar.brands, { key: Number(route.params.brandId) })
              ?.label,
            href: `/products/${route.params.brandId}/detail`,
          });

          breadcrumbData.value.push({
            title: "商品列表",
            href: `/products/${route.params.brandId}/detail`,
          });
          breadcrumbData.value.push({
            title: _.find(breadcrumb.productsInfo, {
              key: Number(route.params.id),
            })?.label,
            href: `/products/${route.params.brandId}/product/preview/${route.params.id}`,
          });
          break;

        // path: qualities/91
        case "qualities-id":
          breadcrumbData.value.push({
            title: "品質檢驗",
            href: null,
          });
          breadcrumbData.value.push({
            title: _.find(navbar.qualities, { key: Number(route.params.id) })
              ?.label,
            href: `/qualities/${route.params.id}`,
          });

          break;
        case "qualities-preview-id":
          breadcrumbData.value.push({
            title: "品質檢驗",
            href: null,
          });
          breadcrumbData.value.push({
            title: _.find(navbar.qualities, { key: Number(route.params.id) })
              ?.label,
            href: `/qualities/${route.params.id}`,
          });
          break;

        // path: articles/all
        case "articles-id":
          breadcrumbData.value.push({
            title: "資訊專欄",
            href: null,
          });
          let categoryId = route.query.category_id ?? route.params.id;
          if (categoryId) {
            breadcrumbData.value.push({
              title: _.find(navbar.article_categories, {
                key: isNumeric(categoryId) ? Number(categoryId) : categoryId,
              })?.label,
              href: `/articles/${route.params.id}`,
            });
          } else {
            breadcrumbData.value.push({
              title: "全部文章",
              href: null,
            });
          }
          break;
        // path: articles/all/2

        case "articles-categoryId-id":
          breadcrumbData.value.push({
            title: "資訊專欄",
            href: null,
          });
          let categoryType = route.params.categoryId;
          if (categoryType !== "all") {
            breadcrumbData.value.push({
              title: _.find(navbar.article_categories, {
                key: isNumeric(categoryType)
                  ? Number(categoryType)
                  : categoryType,
              })?.label,
              href: `/articles/${categoryType}`,
            });
          } else {
            breadcrumbData.value.push({
              title: "全部文章",
              href: `/articles/all`,
            });
          }
          breadcrumbData.value.push({
            title: _.find(breadcrumb.articlesInfo, {
              key: Number(route.params.id),
            })?.label,
            href: `/articles/article/${route.params.id}`,
          });
          break;
        case "articles-article-preview-id":
          breadcrumbData.value.push({
            title: "資訊專欄",
            href: null,
          });
          breadcrumbData.value.push({
            title: "全部文章",
            href: `/articles/all`,
          });
          breadcrumbData.value.push({
            title: _.find(breadcrumb.articlesInfo, {
              key: Number(route.params.id),
            })?.label,
            href: `/articles/preview/${route.params.id}`,
          });
          break;
        //   path: contact-us/questions
        case "contact-us-questions":
          breadcrumbData.value.push({
            title: "聯絡我們",
          });
          breadcrumbData.value.push({
            title: "Q&A專區",
            href: "/contact-us/questions",
          });
          breadcrumbData.value.push({
            title: _.find(breadcrumb.questionsCategories, {
              key: Number(
                route.query.category_id ??
                  breadcrumb.questionsCategories[0]?.key
              ),
            })?.label,
            href: "/contact-us/questions",
          });

          break;
        //   path: contact-us/information
        case "contact-us-information":
          breadcrumbData.value.push({
            title: "聯絡我們",
          });
          breadcrumbData.value.push({
            title: "聯絡資訊",
            href: "/contact-us/information",
          });
          break;
        case "search":
          breadcrumbData.value.push({
            title: `搜尋內容：${route.query.search}`,
          });
          break;
        //   path: cart
        case "cart":
          breadcrumbData.value.push({
            title: "購物車",
            href: "/cart",
          });
          break;
        //   path: checkout
        case "checkout":
          breadcrumbData.value.push({ title: "購物車", href: "/cart" });
          breadcrumbData.value.push({ title: "結帳", href: "/checkout" });
          break;
        case "checkout-complete":
          breadcrumbData.value.push({ title: "購物車", href: "/cart" });
          breadcrumbData.value.push({ title: "訂單完成" });
          break;
        case "wishlist":
          breadcrumbData.value.push({ title: "收藏清單", href: "/wishlist" });
          break;
        case "orders":
          breadcrumbData.value.push({ title: "訂單查詢", href: "/orders" });
          break;
        case "compare":
          breadcrumbData.value.push({ title: "商品比較", href: "/compare" });
          break;
        case "quiz":
          breadcrumbData.value.push({ title: "保健需求測驗", href: "/quiz" });
          break;
      }
    },
    { immediate: true, deep: true }
  );
});
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
