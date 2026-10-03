<template>
  <div class="l-page p-products" v-if="pageInfo">
    <SwipersBanner :info="pageInfo.modules?.carousel" />
    <Breadcrumb />

    <section class="c-section c-section--flush-top p-products__body">
      <div class="c-section__inner">
        <div class="p-products__layout">
          <!-- 側邊分類 ........................................................ -->
          <aside class="c-sidenav p-products__aside">
            <p class="c-sidenav__title">{{ brandLabel }}</p>
            <ul class="c-sidenav__list">
              <li class="c-sidenav__item" v-for="tab in tabs" :key="tab.key">
                <button
                  type="button"
                  class="c-sidenav__link"
                  :class="{ 'c-sidenav__link--is-active': toggle === tab.key }"
                  @click="onTabChange(tab.key)"
                >
                  {{ tab.label }}
                </button>
              </li>
            </ul>

            <ProductFilter
              class="p-products__filter"
              v-if="toggle === 'products'"
              :resource="filterResource"
              @change="onFilterChange"
            />
          </aside>

          <!-- 內容 ............................................................ -->
          <div class="p-products__main">
            <!-- 商品列表 -->
            <div v-if="toggle === 'products'">
              <div class="c-section__head c-section__head--stack p-products__head">
                <span class="c-section__eyebrow">Products</span>
                <h2 class="c-section__title">商品列表</h2>
              </div>

              <div class="p-products__toolbar">
                <p class="p-products__count">
                  共 <strong>{{ productPage.total }}</strong> 項商品
                </p>
                <label class="p-products__sort">
                  <span>排序</span>
                  <select v-model="sort" @change="onSortChange">
                    <option
                      v-for="option in filterResource.sorts"
                      :key="option.key"
                      :value="option.key"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                </label>
              </div>

              <ul class="p-products__grid" v-if="productData.length">
                <li v-for="item in productData" :key="item.id">
                  <ProductCard :item="item" />
                </li>
              </ul>
              <p class="c-empty" v-else>沒有符合條件的商品，調整一下篩選試試。</p>

              <Pagination
                :propPageInfo="productPage"
                @clickHandler="onProductPageChange"
                v-if="productPage.total / productPage.perPage > 1"
              />
            </div>

            <!-- 熱銷排行 -->
            <div v-if="toggle === 'popular'">
              <div class="c-section__head c-section__head--stack p-products__head">
                <span class="c-section__eyebrow">Ranking</span>
                <h2 class="c-section__title">熱銷排行</h2>
              </div>

              <div class="c-prose" v-if="popularData">
                <Editor :html="popularData?.editor?.content.zh_TW"></Editor>
              </div>
              <p class="c-empty" v-else>目前沒有排行資料</p>
            </div>

            <ProductsReviewsTab v-if="toggle === 'reviews'" :brand-id="brandId" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import noImage from "@/assets/images/picture/no-image.png";

const route = useRoute();
const router = useRouter();
const { brandId } = route.params;
const site = useSiteConfig();
const brandLabel = computed(() => site.brandLabel(brandId) ?? "商品專區");

const tabs = [
  { key: "products", label: "商品列表" },
  { key: "popular", label: "熱銷排行" },
  { key: "reviews", label: "好評回饋" },
];

const toggle = ref(route.query.category ?? "products");
const onTabChange = (val) => {
  router.replace({ query: { category: val } });
  toggle.value = val;
};

const { data: pageInfo } = await useFetch(`/api/products/${brandId}/page-products`, {
  transform: (res) => res.result,
});
if (!pageInfo.value) {
  throw createError({ statusCode: 404, message: "找不到品牌" });
}
useSeo("page-products", pageInfo.value.modules?.seo);

/** 篩選與排序 */
const { data: filterResource } = await useFetch("/api/products/resource", {
  transform: (res) => res.result ?? {},
  default: () => ({}),
});
const filters = ref({});
const sort = ref(route.query.sort ?? "recommend");

/**
 * 商品列表：每頁筆數依視窗寬度決定，所以只在瀏覽器端抓。
 * 篩選、排序、頁碼改變時 useFetch 會自動重抓。
 */
const perPage = Number(route.query.per_page) || (import.meta.client && window.innerWidth <= 768 ? 8 : 12);
const productPageNo = ref(Number(route.query.page) || 1);

const { data: products } = useFetch(`/api/products/${brandId}/products`, {
  query: computed(() => ({ ...filters.value, sort: sort.value, page: productPageNo.value, per_page: perPage })),
  transform: (res) => res.result,
  server: false,
});
const productData = computed(() => products.value?.data ?? []);
const productPage = computed(() => toPageInfo(products.value?.meta, perPage));

const onFilterChange = (value) => {
  filters.value = cleanParams(value);
  productPageNo.value = 1;
};

const onSortChange = () => {
  productPageNo.value = 1;
};

const onProductPageChange = ({ page }) => {
  productPageNo.value = page;
  replaceQuery(router, { category: toggle.value, page, per_page: perPage, sort: sort.value });
};

/** 熱銷排行 */
const { data: popularData } = useFetch(`/api/products/${brandId}/popular`, {
  transform: (res) => res.result,
  server: false,
});

const onImageError = (event) => {
  event.target.src = noImage;
};
</script>

<style lang="scss" scoped>
.p-products {
  background-color: $white;

  &__layout {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr);
    gap: $space-10;
    align-items: start;

    @include lm() {
      grid-template-columns: 1fr;
      gap: $space-6;
    }
  }

  &__aside {
    position: sticky;
    top: 120px;

    @include lm() {
      position: static;
    }
  }

  &__head {
    margin-bottom: $space-5;
  }

  &__filter {
    margin-top: $space-7;

    @include lm() {
      margin-top: $space-5;
    }
  }

  &__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-4;
    padding-bottom: $space-4;
    margin-bottom: $space-6;
    border-bottom: 1px solid $gray-100;
  }

  &__count {
    color: $content;
    font-size: $fz-sm;
    letter-spacing: $ls-body;

    strong {
      color: $ink;
      font-weight: 600;
    }
  }

  &__sort {
    display: flex;
    align-items: center;
    gap: $space-2;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;

    select {
      padding: $space-2 $space-3;
      border: 1px solid $gray-200;
      border-radius: $radius-pill;
      background-color: $white;
      color: $text;
      font-size: $fz-sm;
      letter-spacing: $ls-body;
      cursor: pointer;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: $space-8 $space-6;

    @include md() {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: $space-6 $space-4;
    }
  }
}
</style>
