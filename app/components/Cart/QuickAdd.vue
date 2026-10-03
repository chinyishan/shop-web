<template>
  <button
    type="button"
    class="c-quick-add"
    :class="{ 'c-quick-add--is-sold-out': soldOut }"
    :disabled="soldOut"
    @click.prevent.stop="onAdd"
  >
    {{ soldOut ? "補貨中" : "加入購物車" }}
  </button>
</template>

<script setup>
import { ElMessage } from "element-plus";

const props = defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
});

const cart = useCartStore();

/** 列表快速加入：取第一個有庫存的規格 */
const spec = computed(
  () => (props.product.specs ?? []).find((item) => item.stock > 0) ?? null
);
const soldOut = computed(() => {
  if (props.product.specs?.length) return !spec.value;
  return props.product.stock === 0;
});

const onAdd = () => {
  if (soldOut.value) return;

  cart.add(
    {
      id: props.product.id,
      name: props.product.name,
      brand: props.product.brand,
      brand_id: props.product.brand_id,
      image: props.product.main_image ?? props.product.image,
      price: props.product.price,
      stock: props.product.stock,
    },
    { spec: spec.value, qty: 1 }
  );

  ElMessage.success(`已加入購物車：${props.product.name}`);
  cart.openDrawer();
};
</script>
