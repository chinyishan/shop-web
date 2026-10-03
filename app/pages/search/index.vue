<template>
  <div class="l-page p-search">
    <Breadcrumb />

    <header class="c-page-head">
      <span class="c-page-head__eyebrow">Search</span>
      <h1 class="c-page-head__title">搜尋結果</h1>
      <p v-if="keyword" class="c-page-head__lead">
        「{{ keyword }}」共找到 {{ pageInfo.total }} 項商品
      </p>
    </header>

    <section class="c-section c-section--flush-top">
      <div class="c-section__inner">
        <div v-loading="loading">
          <ul v-if="items.length" class="p-search__grid">
            <li v-for="item in items" :key="item.id">
              <ProductCard :item="item" />
            </li>
          </ul>
          <p v-else-if="!loading" class="c-empty">沒有符合的商品，換個關鍵字試試。</p>
        </div>

        <Pagination
          v-if="pageInfo.total / pageInfo.perPage > 1"
          :prop-page-info="pageInfo"
          @click-handler="onPageChange"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute();
const loading = ref(false);
const items = ref([]);
const keyword = computed(() => route.query.search ?? "");

const pageInfo = ref({ currentPage: 1, perPage: 15, total: 0 });

const getProductListByName = (page) => {
  loading.value = true;

  return $fetch("/api/products/search", {
    query: { keyword: route.query.search, page: page ?? pageInfo.value.currentPage },
  })
    .then((res) => {
      const { result } = res;
      items.value = result.data;
      pageInfo.value = {
        currentPage: result.meta.current_page,
        perPage: result.meta.per_page,
        total: result.meta.total,
      };
    })
    .finally(() => {
      loading.value = false;
    });
};

const onPageChange = ({ page }) => {
  nextTick(() => getProductListByName(page));
};

watch(
  route,
  () => {
    pageInfo.value.currentPage = 1;
    getProductListByName(1);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.p-search {
  background-color: $white;

  &__grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: $space-8 $space-6;

    @include lg() {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    @include tb() {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @include md() {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: $space-6 $space-4;
    }
  }
}
</style>
