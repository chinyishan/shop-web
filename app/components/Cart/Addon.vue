<template>
  <section v-if="items.length" class="c-addon">
    <header class="c-addon__head">
      <h2 class="c-addon__title">常一起購買</h2>
      <p class="c-addon__note">結帳前加購享 85 折，省下的運費也一起省</p>
    </header>

    <ul class="c-addon__list">
      <li v-for="item in items" :key="item.id" class="c-addon__item">
        <NuxtLink
          class="c-addon__media"
          :to="`/products/${item.brand_id}/product/${item.id}`"
        >
          <img :src="item.main_image" :alt="item.name" :title="item.name" >
        </NuxtLink>

        <div class="c-addon__body">
          <NuxtLink
            class="c-addon__name"
            :to="`/products/${item.brand_id}/product/${item.id}`"
          >
            {{ item.name }}
          </NuxtLink>
          <p class="c-addon__price">
            <span class="c-addon__now">{{ formatPrice(item.addon_price) }}</span>
            <span class="c-addon__origin">{{ formatPrice(item.price) }}</span>
          </p>
        </div>

        <button type="button" class="c-addon__btn" @click="onAdd(item)">＋ 加購</button>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ElMessage } from "element-plus";

const cart = useCartStore();
const items = ref([]);

const fetchAddons = () => {
  const ids = cart.items.map((item) => item.id).join(",");
  if (!ids) {
    items.value = [];
    return;
  }

  $fetch("/api/products/addon", { query: { ids, limit: 3 } }).then((res) => {
    items.value = res.result?.data ?? [];
  });
};

const onAdd = (item) => {
  cart.add(
    {
      id: item.id,
      name: item.name,
      brand: item.brand,
      brand_id: item.brand_id,
      image: item.main_image,
      price: item.addon_price,
      stock: item.stock,
    },
    {
      spec: {
        id: `${item.id}addon`,
        label: "加購價",
        price: item.addon_price,
        stock: item.stock,
      },
      qty: 1,
    }
  );
  ElMessage.success(`已加購：${item.name}`);
  fetchAddons();
};

onMounted(fetchAddons);
</script>

<style lang="scss" scoped>
.c-addon {
  margin-top: $space-8;
  padding: $space-6;
  border: 1px dashed $primary-200;
  border-radius: $radius-lg;
  background-color: $primary-50;

  @include md() {
    padding: $space-5;
  }

  &__head {
    margin-bottom: $space-5;
  }

  &__title {
    color: $ink;
    font-size: $fz-body-lg;
    font-weight: 600;
    line-height: $lh-heading;
    letter-spacing: $ls-heading;
    text-align: left;
  }

  &__note {
    margin-top: $space-2;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
  }

  &__list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: $space-4;

    @include tb() {
      grid-template-columns: 1fr;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    gap: $space-3;
    padding: $space-3;
    border-radius: $radius-md;
    background-color: $white;
  }

  &__media {
    flex-shrink: 0;
    @include size(56px);
    border-radius: $radius-sm;
    background-color: $primary-50;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: $space-1;
      box-sizing: border-box;
    }
  }

  &__body {
    flex: 1;
    min-width: 0;
  }

  &__name {
    color: $text;
    font-size: $fz-sm;
    line-height: $lh-heading;
    letter-spacing: $ls-body;
    @include line-clamp(2);

    &:hover {
      color: $primary;
    }
  }

  &__price {
    display: flex;
    align-items: baseline;
    gap: $space-2;
    margin-top: $space-1;
  }

  &__now {
    color: $primary-dark;
    font-size: $fz-sm;
    font-weight: 600;
  }

  &__origin {
    color: $muted;
    font-size: $fz-xs;
    text-decoration: line-through;
  }

  &__btn {
    flex-shrink: 0;
    padding: $space-2 $space-3;
    border: 1px solid $primary;
    border-radius: $radius-pill;
    background: none;
    color: $primary;
    font-size: $fz-xs;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color $duration $ease, color $duration $ease;

    &:hover {
      background-color: $primary;
      color: $on-primary;
    }
  }
}
</style>
