<template>
  <div class="p-quiz__result">
    <div class="p-quiz__result-head">
      <span class="c-section__eyebrow">Result</span>
      <h2 class="c-section__title">為你推薦的組合</h2>
      <p class="p-quiz__summary">{{ summary }}</p>
    </div>

    <ul v-if="results.length" class="p-quiz__grid">
      <li v-for="item in results" :key="item.id">
        <ProductCard :item="item" />
        <ul class="p-quiz__reasons">
          <li v-for="reason in item.reasons" :key="reason">{{ reason }}</li>
        </ul>
      </li>
    </ul>
    <p v-else class="c-empty">找不到完全符合的商品，建議放寬預算再試一次。</p>

    <div class="p-quiz__result-actions">
      <button v-if="results.length" type="button" class="c-btn" @click="onAddAll">
        推薦商品全部加入購物車
      </button>
      <button type="button" class="c-btn c-btn--ghost" @click="emit('restart')">
        重新測驗
      </button>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";

/** 測驗結果：推薦商品與一鍵加入購物車 */
const props = defineProps({
  results: { type: Array, default: () => [] },
  summary: { type: String, default: "" },
});
const emit = defineEmits(["restart"]);

const cart = useCartStore();

const onAddAll = () => {
  props.results.forEach((item) => {
    const spec = (item.specs ?? []).find((option) => option.stock > 0) ?? null;
    cart.add(
      {
        id: item.id,
        name: item.name,
        brand: item.brand,
        brand_id: item.brand_id,
        image: item.main_image,
        price: item.price,
        stock: item.stock,
      },
      { spec, qty: 1 }
    );
  });

  ElMessage.success(`已加入 ${props.results.length} 項推薦商品`);
  cart.openDrawer();
};
</script>

<style lang="scss" scoped>
.p-quiz {
  // ------------------------------------------------------------ 結果
  &__result-head {
    margin-bottom: $space-7;
  }

  &__summary {
    margin-top: $space-3;
    color: $content;
    font-size: $fz-body;
    letter-spacing: $ls-body;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $space-7 $space-6;

    @include sm() {
      grid-template-columns: 1fr;
    }
  }

  &__reasons {
    margin-top: $space-3;

    li {
      position: relative;
      padding-left: $space-4;
      color: $content;
      font-size: $fz-xs;
      line-height: 1.9;
      letter-spacing: $ls-body;

      &::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: $primary;
      }
    }
  }

  &__result-actions {
    display: flex;
    flex-wrap: wrap;
    gap: $space-3;
    margin-top: $space-8;
  }
}
</style>
