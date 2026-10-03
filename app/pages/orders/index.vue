<template>
  <div class="l-page p-orders">
    <Breadcrumb />

    <header class="c-page-head">
      <span class="c-page-head__eyebrow">Orders</span>
      <h1 class="c-page-head__title">訂單查詢</h1>
      <p class="c-page-head__lead">
        輸入訂單編號查詢，或直接看下方這台裝置的訂購紀錄。
      </p>
    </header>

    <section class="c-section c-section--flush-top">
      <div class="c-section__inner c-section__inner--narrow">
        <!-- 查詢 -->
        <form class="p-orders__search" @submit.prevent="onSearch">
          <input
            class="p-orders__input"
            type="text"
            v-model="keyword"
            placeholder="請輸入訂單編號，例如 HL202610021234"
          />
          <button type="submit" class="c-btn c-btn--sm">查詢</button>
        </form>

        <ClientOnly>
          <!-- 查詢結果 -->
          <div class="p-orders__result" v-if="searched">
            <p class="c-empty" v-if="!matched">找不到這筆訂單，請確認編號是否正確。</p>
            <article class="p-orders__card" v-else>
              <p class="p-orders__found">查詢結果</p>
              <OrderCard :order="matched" />
            </article>
          </div>

          <!-- 本機紀錄 -->
          <div class="p-orders__history">
            <h2 class="p-orders__subtitle">我的訂購紀錄</h2>

            <ul class="p-orders__list" v-if="!orders.isEmpty">
              <li v-for="order in orders.items" :key="order.order_no">
                <OrderCard :order="order" />
              </li>
            </ul>
            <p class="c-empty" v-else>這台裝置還沒有訂購紀錄。</p>

            <div class="p-orders__foot" v-if="!orders.isEmpty">
              <button type="button" class="p-orders__clear" @click="onClear">
                清除本機紀錄
              </button>
            </div>
          </div>

          <template #fallback>
            <p class="c-empty">訂單資料讀取中…</p>
          </template>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";

const route = useRoute();
const orders = useOrderStore();

setSEO("page-index", {
  title: "訂單查詢",
  description: "查詢訂單狀態與訂購紀錄。",
});

const keyword = ref(route.query.no ?? "");
const searched = ref(false);
const matched = ref(null);

const onSearch = () => {
  searched.value = true;
  matched.value = keyword.value ? orders.findByNo(keyword.value) : null;
};

const onClear = () => {
  orders.clear();
  matched.value = null;
  ElMessage.success("已清除本機訂購紀錄");
};

onMounted(() => {
  if (keyword.value) onSearch();
});
</script>

<style lang="scss" scoped>
.p-orders {
  background-color: $white;

  &__search {
    display: flex;
    gap: $space-3;
    margin-bottom: $space-8;

    @include sm() {
      flex-direction: column;
    }
  }

  &__input {
    flex: 1;
    min-height: 48px;
    padding: 0 $space-4;
    border: 1px solid $gray-200;
    border-radius: $radius-sm;
    background-color: $white;
    color: $text;
    font-size: $fz-body;
    letter-spacing: $ls-body;
    outline: none;
    transition: border-color $duration $ease;

    &:focus {
      border-color: $primary;
    }
  }

  &__result {
    margin-bottom: $space-8;
  }

  &__found {
    margin-bottom: $space-3;
    color: $primary-400;
    font-size: $fz-xs;
    letter-spacing: $ls-eyebrow;
    text-transform: uppercase;
  }

  &__subtitle {
    margin-bottom: $space-5;
    padding-bottom: $space-3;
    border-bottom: 1px solid $gray-100;
    color: $ink;
    font-size: $fz-body-lg;
    font-weight: 600;
    line-height: $lh-heading;
    letter-spacing: $ls-heading;
    text-align: left;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: $space-5;
  }

  &__foot {
    display: flex;
    justify-content: center;
    margin-top: $space-7;
  }

  &__clear {
    padding: 0;
    background: none;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: $primary;
    }
  }
}
</style>
