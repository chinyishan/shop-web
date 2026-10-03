<template>
  <article class="c-product-item">
    <NuxtLink class="c-product" :to="`/products/${item.brand_id}/product/${item.id}`">
      <div class="c-product__media">
        <img
          :src="item.main_image ?? item.image ?? noImage"
          :alt="item.name"
          :title="`${item.brand}-${item.name}`"
          @error="onImageError"
        />
        <span class="c-product__badges">
          <span class="c-tag c-tag--solid" v-if="item.is_new">新品</span>
          <span class="c-tag c-tag--accent" v-if="item.origin_price">特價</span>
          <span class="c-tag c-tag--ghost" v-if="item.stock === 0">補貨中</span>
        </span>
        <span class="c-product__actions">
          <ProductFavoriteButton :product="item" />
          <CompareToggle :product="item" />
        </span>
      </div>

      <h3 class="c-product__name">{{ item.name }}</h3>
      <p class="c-product__brand">{{ item.brand }}</p>
      <Rating
        class="c-product__rating"
        :value="item.rating"
        :count="item.review_count"
        v-if="item.rating"
      />
      <Price :value="item.price" :origin="item.origin_price" size="sm" />
    </NuxtLink>

    <CartQuickAdd class="c-product-item__add" :product="item" />
  </article>
</template>

<script setup>
import noImage from "@/assets/images/picture/no-image.png";

defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});

const onImageError = (event) => {
  event.target.src = noImage;
};
</script>
