<template>
  <div class="c-commodity" v-if="header">
    <div class="c-commodity__gallery">
      <div class="c-commodity__stage">
        <img
          :src="activeImage ?? noImage"
          :alt="header.name"
          :title="header.name"
          @error="onImageError"
        />
      </div>

      <ul class="c-commodity__thumbs" v-if="images.length > 1">
        <li v-for="(item, index) in images" :key="index">
          <button
            type="button"
            class="c-commodity__thumb"
            :class="{ 'c-commodity__thumb--is-active': imageIndex === index }"
            @click="imageIndex = index"
          >
            <img :src="item ?? noImage" alt="商品圖" title="商品圖" @error="onImageError" />
          </button>
        </li>
      </ul>
    </div>

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
      <div class="c-commodity__specs" v-if="specs.length">
        <p class="c-commodity__label">規格</p>
        <ul class="c-commodity__spec-list">
          <li v-for="spec in specs" :key="spec.id">
            <button
              type="button"
              class="c-commodity__spec"
              :class="{
                'c-commodity__spec--is-active': activeSpec?.id === spec.id,
                'c-commodity__spec--is-sold-out': spec.stock === 0,
              }"
              :disabled="spec.stock === 0"
              @click="onSelectSpec(spec)"
            >
              {{ spec.label }}
              <span class="c-commodity__spec-price">{{ formatPrice(spec.price) }}</span>
            </button>
          </li>
        </ul>
      </div>

      <!-- 購買方式 -->
      <div class="c-commodity__modes">
        <p class="c-commodity__label">購買方式</p>
        <ul class="c-commodity__mode-list">
          <li v-for="item in modes" :key="item.key">
            <button
              type="button"
              class="c-commodity__mode"
              :class="{ 'c-commodity__mode--is-active': mode === item.key }"
              @click="mode = item.key"
            >
              <span class="c-commodity__mode-title">{{ item.title }}</span>
              <span class="c-commodity__mode-note">{{ item.note }}</span>
            </button>
          </li>
        </ul>
      </div>

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
import _ from "lodash";
import { ElMessage } from "element-plus";
import noImage from "@/assets/images/picture/no-image.png";

const props = defineProps({
  productInfo: {
    type: Object,
    default: () => ({}),
  },
});

const header = computed(() => _.get(props.productInfo, "attribute_data.product_header"));
const images = computed(() => _.get(header.value, "product_images", []) ?? []);

const imageIndex = ref(0);
const activeImage = computed(() => images.value[imageIndex.value]);

const onImageError = (event) => {
  event.target.src = noImage;
};

/** 規格與庫存 */
const specs = computed(() => _.get(header.value, "specs", []) ?? []);
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

const onSelectSpec = (spec) => {
  activeSpec.value = spec;
  qty.value = 1;
};

/** 購買方式：單次 or 定期購 9 折 */
const modes = [
  { key: "once", title: "單次購買", note: "一次性訂購" },
  { key: "subscribe", title: "定期購 9 折", note: "每月自動配送，可隨時取消" },
];
const mode = ref("once");

const basePrice = computed(() => activeSpec.value?.price ?? header.value?.price ?? 0);

const trustPoints = [
  "逐批第三方檢驗",
  "45 天安心退貨",
  "滿 NT$ 1,000 免運",
];

const activePrice = computed(() =>
  mode.value === "subscribe"
    ? Math.round((basePrice.value * 0.9) / 10) * 10
    : basePrice.value
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

  // ------------------------------------------------------------ 圖片
  &__stage {
    @include ratio(1, 1);
    border-radius: $radius-lg;
    background-color: $primary-50;

    img {
      object-fit: contain;
      padding: $space-8;
      box-sizing: border-box;
    }
  }

  &__thumbs {
    display: flex;
    gap: $space-3;
    margin-top: $space-4;
  }

  &__thumb {
    @include size(72px);
    padding: 0;
    border: 1px solid $gray-200;
    border-radius: $radius-md;
    background-color: $white;
    overflow: hidden;
    cursor: pointer;
    transition: border-color $duration $ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &:hover {
      border-color: $primary-300;
    }

    &--is-active {
      border-color: $primary;
    }
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

  // ------------------------------------------------------------ 規格
  &__specs {
    margin-top: $space-6;
  }

  &__label {
    margin-bottom: $space-3;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-eyebrow;
    text-transform: uppercase;
  }

  &__spec-list {
    display: flex;
    flex-wrap: wrap;
    gap: $space-3;
  }

  &__spec {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    padding: $space-3 $space-4;
    border: 1px solid $gray-200;
    border-radius: $radius-md;
    background: none;
    color: $text;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
    text-align: left;
    cursor: pointer;
    transition: border-color $duration $ease, color $duration $ease,
      background-color $duration $ease;

    &:hover:not(:disabled) {
      border-color: $primary-300;
    }

    &--is-active {
      border-color: $primary;
      background-color: $primary-50;
      color: $primary-dark;
    }

    &--is-sold-out {
      color: $gray-300;
      cursor: not-allowed;
      text-decoration: line-through;
    }
  }

  &__spec-price {
    color: $primary;
    font-size: $fz-xs;
  }

  &--is-sold-out &__spec-price,
  &__spec--is-sold-out &__spec-price {
    color: $gray-300;
  }

  // ------------------------------------------------------------ 購買方式
  &__modes {
    margin-top: $space-5;
  }

  &__mode-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $space-3;

    @include sm() {
      grid-template-columns: 1fr;
    }
  }

  &__mode {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    width: 100%;
    padding: $space-3 $space-4;
    border: 1px solid $gray-200;
    border-radius: $radius-md;
    background: none;
    text-align: left;
    cursor: pointer;
    transition: border-color $duration $ease, background-color $duration $ease;

    &:hover {
      border-color: $primary-300;
    }

    &--is-active {
      border-color: $primary;
      background-color: $primary-50;
    }
  }

  &__mode-title {
    color: $text;
    font-size: $fz-sm;
    font-weight: 500;
    letter-spacing: $ls-body;
  }

  &__mode-note {
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
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
