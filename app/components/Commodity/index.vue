<template>
  <div v-if="header" class="c-commodity">
    <CommodityGallery :images="images" :name="header.name" />

    <div class="c-commodity__info">
      <span class="c-commodity__brand">{{ productInfo.brand }}</span>
      <h1 class="c-commodity__name">{{ header.name }}</h1>

      <Price
        class="c-commodity__price"
        :value="activePrice"
        :origin="activeOrigin"
        size="lg"
      />

      <p class="c-commodity__desc">{{ header.description }}</p>

      <!-- 規格 -->
      <CommoditySpecs v-if="specs.length" v-model="activeSpec" :specs="specs" />

      <!-- 購買方式 -->
      <CommodityModes v-model="mode" />

      <!-- 庫存 -->
      <p class="c-commodity__stock" :class="stockClass">{{ stockText }}</p>

      <div class="c-commodity__buy">
        <CartStepper v-model="qty" :max="maxQty" />
        <button
          type="button"
          class="c-btn c-commodity__submit"
          :disabled="!canBuy"
          @click="onAddToCart"
        >
          {{ canBuy ? "加入購物車" : "補貨中" }}
        </button>
        <ProductFavoriteButton class="c-commodity__favorite" :product="favoriteItem" />
      </div>

      <ul class="c-commodity__trust">
        <li v-for="item in trustPoints" :key="item">{{ item }}</li>
      </ul>

      <p class="c-commodity__memo">本站為個人作品，結帳流程僅為介面展示。</p>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";

const props = defineProps({
  productInfo: { type: Object, default: () => ({}) },
});

const header = computed(() => props.productInfo?.attribute_data?.product_header);
const images = computed(() => header.value?.product_images ?? []);

/** 規格與庫存 */
const specs = computed(() => header.value?.specs ?? []);
const activeSpec = ref(null);

watchEffect(() => {
  if (!specs.value.length) {
    activeSpec.value = null;
    return;
  }
  if (!activeSpec.value || !specs.value.some((s) => s.id === activeSpec.value.id)) {
    activeSpec.value = specs.value.find((spec) => spec.stock > 0) ?? specs.value[0];
  }
});

/** 購買方式：單次 or 定期購 9 折 */
const mode = ref("once");

const basePrice = computed(() => activeSpec.value?.price ?? header.value?.price ?? 0);

const trustPoints = ["逐批第三方檢驗", "45 天安心退貨", "滿 NT$ 1,000 免運"];

const activePrice = computed(() =>
  mode.value === "subscribe" ? subscribePrice(basePrice.value) : basePrice.value
);
const activeOrigin = computed(() =>
  mode.value === "subscribe"
    ? basePrice.value
    : activeSpec.value?.origin_price ?? header.value?.origin_price
);
const stock = computed(() => activeSpec.value?.stock ?? header.value?.stock ?? 0);
const canBuy = computed(() => stock.value > 0);
const maxQty = computed(() => Math.max(Math.min(stock.value, 99), 1));

const stockText = computed(() => {
  if (!canBuy.value) return "此規格補貨中，請選擇其他規格";
  if (stock.value <= 5) return `庫存僅剩 ${stock.value} 件`;
  return `現貨供應中（庫存 ${stock.value} 件）`;
});
const stockClass = computed(() => ({
  "c-commodity__stock--low": canBuy.value && stock.value <= 5,
  "c-commodity__stock--out": !canBuy.value,
}));

/** 加入購物車 */
const cart = useCartStore();
const qty = ref(1);

// 換規格時數量重設為 1
watch(activeSpec, () => {
  qty.value = 1;
});

/** 收藏按鈕用的商品卡資料 */
const favoriteItem = computed(() => ({
  id: props.productInfo.id,
  name: header.value?.name,
  brand: props.productInfo.brand,
  brand_id: props.productInfo.brand_id,
  main_image: images.value[0],
  price: header.value?.price,
  origin_price: header.value?.origin_price,
  stock: header.value?.stock,
  specs: header.value?.specs,
}));

const onAddToCart = () => {
  if (!canBuy.value) return;

  const specLabel = [activeSpec.value?.label, mode.value === "subscribe" ? "定期購" : null]
    .filter(Boolean)
    .join("・");

  cart.add(
    {
      id: props.productInfo.id,
      name: header.value.name,
      brand: props.productInfo.brand,
      brand_id: props.productInfo.brand_id,
      image: images.value[0],
      price: activePrice.value,
      stock: stock.value,
    },
    {
      spec: activeSpec.value
        ? {
            ...activeSpec.value,
            id: `${activeSpec.value.id}${mode.value === "subscribe" ? "s" : ""}`,
            label: specLabel,
            price: activePrice.value,
          }
        : null,
      qty: qty.value,
    }
  );

  ElMessage.success(`已加入購物車：${header.value.name} × ${qty.value}`);
  qty.value = 1;
  cart.openDrawer();
};
</script>

<style lang="scss" scoped>
.c-commodity {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: $space-10;
  align-items: start;

  @include lm() {
    grid-template-columns: 1fr;
    gap: $space-6;
  }

  // ------------------------------------------------------------ 資訊
  &__info {
    padding-top: $space-6;

    @include lm() {
      padding-top: 0;
    }
  }

  &__brand {
    display: block;
    margin-bottom: $space-3;
    color: $primary-400;
    font-size: $fz-xs;
    font-weight: 500;
    letter-spacing: $ls-eyebrow;
    text-transform: uppercase;
  }

  &__name {
    color: $ink;
    font-size: $fz-h1;
    font-weight: 600;
    line-height: $lh-heading;
    letter-spacing: $ls-heading;

    @include md() {
      font-size: $fz-h3;
    }
  }

  &__price {
    margin-top: $space-5;
  }

  &__desc {
    margin-top: $space-6;
    padding-top: $space-6;
    border-top: 1px solid $gray-100;
    color: $content;
    font-size: $fz-body;
    line-height: $lh-body;
    letter-spacing: $ls-body;
    white-space: pre-line;
  }

  // ------------------------------------------------------------ 信任標示
  &__trust {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2 $space-4;
    margin-top: $space-5;

    li {
      position: relative;
      padding-left: $space-4;
      color: $content;
      font-size: $fz-xs;
      letter-spacing: $ls-body;

      &::before {
        content: "✓";
        position: absolute;
        left: 0;
        color: $primary;
      }
    }
  }

  &__favorite {
    flex-shrink: 0;
    @include size(52px);
  }

  // ------------------------------------------------------------ 庫存
  &__stock {
    margin-top: $space-4;
    color: $content;
    font-size: $fz-xs;
    letter-spacing: $ls-body;

    &--low {
      color: $accent-dark;
    }

    &--out {
      color: $muted;
    }
  }

  &__buy {
    display: flex;
    align-items: center;
    gap: $space-4;
    margin-top: $space-5;

    @include sm() {
      flex-direction: column;
      align-items: stretch;
    }
  }

  &__submit {
    flex: 1;
    max-width: 280px;

    @include sm() {
      max-width: none;
    }
  }

  &__memo {
    margin-top: $space-4;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
  }
}
</style>
