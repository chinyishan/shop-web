<template>
  <div class="l-page p-compare">
    <Breadcrumb />

    <header class="c-page-head">
      <span class="c-page-head__eyebrow">Compare</span>
      <h1 class="c-page-head__title">商品比較</h1>
      <p class="c-page-head__lead">最多可同時比較 {{ compare.maxItems }} 項商品的規格與價格。</p>
    </header>

    <section class="c-section c-section--flush-top">
      <div class="c-section__inner">
        <ClientOnly>
          <template v-if="!compare.isEmpty">
            <div class="p-compare__scroll">
              <table class="p-compare__table">
                <thead>
                  <tr>
                    <th class="p-compare__label">商品</th>
                    <th v-for="item in compare.items" :key="item.id">
                      <div class="p-compare__product">
                        <NuxtLink
                          class="p-compare__media"
                          :to="`/products/${item.brand_id}/product/${item.id}`"
                        >
                          <img :src="item.main_image" :alt="item.name" :title="item.name" >
                        </NuxtLink>
                        <NuxtLink
                          class="p-compare__name"
                          :to="`/products/${item.brand_id}/product/${item.id}`"
                        >
                          {{ item.name }}
                        </NuxtLink>
                        <button
                          type="button"
                          class="p-compare__remove"
                          @click="compare.remove(item.id)"
                        >
                          移除
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <th class="p-compare__label">品牌</th>
                    <td v-for="item in compare.items" :key="item.id">{{ item.brand }}</td>
                  </tr>
                  <tr>
                    <th class="p-compare__label">售價</th>
                    <td v-for="item in compare.items" :key="item.id">
                      <Price :value="item.price" :origin="item.origin_price" size="sm" />
                    </td>
                  </tr>
                  <tr>
                    <th class="p-compare__label">評價</th>
                    <td v-for="item in compare.items" :key="item.id">
                      <Rating :value="item.rating" :count="item.review_count" />
                    </td>
                  </tr>
                  <tr>
                    <th class="p-compare__label">功效</th>
                    <td v-for="item in compare.items" :key="item.id">
                      <span
                        v-for="label in item.effect_labels"
                        :key="label"
                        class="c-tag"
                        >{{ label }}</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <th class="p-compare__label">適用族群</th>
                    <td v-for="item in compare.items" :key="item.id">
                      {{ (item.audience_labels ?? []).join("、") || "—" }}
                    </td>
                  </tr>
                  <tr>
                    <th class="p-compare__label">規格與單價</th>
                    <td v-for="item in compare.items" :key="item.id">
                      <ul class="p-compare__specs">
                        <li v-for="spec in item.specs" :key="spec.id">
                          <span>{{ spec.label }}</span>
                          <span>{{ formatPrice(spec.price) }}</span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <th class="p-compare__label">庫存狀態</th>
                    <td v-for="item in compare.items" :key="item.id">
                      {{ item.stock > 0 ? `現貨 ${item.stock} 件` : "補貨中" }}
                    </td>
                  </tr>
                  <tr>
                    <th class="p-compare__label">素食友善</th>
                    <td v-for="item in compare.items" :key="item.id">
                      {{ item.vegan ? "✓ 素食可食" : "—" }}
                    </td>
                  </tr>
                  <tr>
                    <th class="p-compare__label"/>
                    <td v-for="item in compare.items" :key="item.id">
                      <CartQuickAdd :product="item" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="p-compare__foot">
              <button type="button" class="p-compare__clear" @click="compare.clear()">
                清空比較清單
              </button>
            </div>
          </template>

          <div v-else class="p-compare__empty">
            <p class="c-empty">還沒有加入比較的商品，點商品圖上的比較圖示即可加入。</p>
            <NuxtLink class="c-btn c-btn--ghost" to="/products/1/detail">去挑選商品</NuxtLink>
          </div>

          <template #fallback>
            <p class="c-empty">比較清單讀取中…</p>
          </template>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>

<script setup>
const compare = useCompareStore();

useSeo("page-index", {
  title: "商品比較",
  description: "比較不同商品的規格、價格與適用族群。",
});
</script>

<style lang="scss" scoped>
.p-compare {
  background-color: $surface;

  &__scroll {
    overflow-x: auto;
  }

  &__table {
    width: 100%;
    min-width: 720px;
    border-collapse: collapse;

    th,
    td {
      padding: $space-4;
      border-bottom: 1px solid $gray-100;
      color: $text;
      font-size: $fz-sm;
      line-height: 1.8;
      letter-spacing: $ls-body;
      text-align: left;
      vertical-align: top;
    }

    thead th {
      border-bottom: 1px solid $primary-100;
    }
  }

  &__label {
    width: 140px;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-eyebrow;
    text-transform: uppercase;
    white-space: nowrap;
    background-color: $primary-50;
  }

  &__product {
    display: flex;
    flex-direction: column;
    gap: $space-3;
    min-width: 160px;
  }

  &__media {
    display: block;
    @include ratio(1, 1);
    border-radius: $radius-md;
    background-color: $primary-50;

    img {
      object-fit: contain;
      padding: $space-3;
      box-sizing: border-box;
    }
  }

  &__name {
    color: $ink;
    font-size: $fz-sm;
    font-weight: 500;
    line-height: $lh-heading;
    @include line-clamp(2);

    &:hover {
      color: $primary;
    }
  }

  &__remove {
    align-self: flex-start;
    padding: 0;
    background: none;
    color: $muted;
    font-size: $fz-xs;
    cursor: pointer;

    &:hover {
      color: $primary;
    }
  }

  .c-tag + .c-tag {
    margin-left: $space-1;
  }

  &__specs {
    display: flex;
    flex-direction: column;
    gap: $space-1;

    li {
      display: flex;
      justify-content: space-between;
      gap: $space-3;
      color: $content;
      font-size: $fz-xs;
    }
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

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-5;
    padding-bottom: $space-9;
  }
}
</style>
