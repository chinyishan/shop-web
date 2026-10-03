<template>
  <div class="l-page p-checkout">
    <Breadcrumb />

    <header class="c-page-head">
      <span class="c-page-head__eyebrow">Checkout</span>
      <h1 class="c-page-head__title">結帳</h1>
      <p class="c-page-head__lead">
        本站為個人作品，送出後只會產生模擬訂單，不會真的扣款或出貨。
      </p>
    </header>

    <section class="c-section c-section--flush-top">
      <div class="c-section__inner">
        <ClientOnly>
          <div v-if="!cart.isEmpty" class="p-checkout__layout">
            <CheckoutForm ref="formRef" v-model="form" :loading="loading" />

            <CheckoutSummary
              v-model:coupon="coupon"
              :discount="discount"
              :shipping="shipping"
              :total="total"
              :loading="loading"
              @submit="onSubmit"
            />
          </div>

          <div v-else class="p-checkout__empty">
            <p class="c-empty">購物車是空的，先挑幾樣商品吧</p>
            <NuxtLink class="c-btn c-btn--ghost" to="/products/1/detail">去逛逛商品</NuxtLink>
          </div>

          <template #fallback>
            <p class="c-empty">結帳資料讀取中…</p>
          </template>
        </ClientOnly>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";

const cart = useCartStore();
const orders = useOrderStore();
const router = useRouter();

useSeo("page-index", {
  title: "結帳",
  description: "填寫收件資訊並確認訂單內容。",
});

const formRef = ref(null);
const form = ref({
  name: "",
  mobile: "",
  email: "",
  delivery: "home",
  address: "",
  payment: "credit",
  memo: "",
});
const loading = ref(false);

/** 金額 */
const coupon = ref(null);
const discount = computed(() => coupon.value?.discount ?? 0);
const shipping = computed(() =>
  calcShipping({
    subtotal: cart.subtotal,
    isEmpty: cart.isEmpty,
    delivery: form.value.delivery,
    freeShipping: coupon.value?.free_shipping,
  })
);
const total = computed(() => calcTotal(cart.subtotal, discount.value, shipping.value));

const onSubmit = async () => {
  if (!(await formRef.value.validate())) {
    ElMessage.warning("請確認紅字欄位是否填寫完整");
    return;
  }

  loading.value = true;
  try {
    const res = await $fetch("/api/orders/create", {
      method: "POST",
      body: {
        ...form.value,
        items: cart.items,
        shipping_fee: shipping.value,
        discount: discount.value,
        coupon: coupon.value?.code ?? null,
      },
    });
    const order = res?.result;
    // 存一份到本機，訂單查詢頁才看得到
    orders.add({
      ...order,
      discount: discount.value,
      coupon: coupon.value?.code ?? null,
      total: total.value,
    });
    cart.clear();
    router.push({ path: "/checkout/complete", query: { no: order?.order_no } });
  } catch {
    ElMessage.error("訂單送出失敗，請稍後再試");
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.p-checkout {
  background-color: $white;

  &__layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 400px);
    gap: $space-9;
    align-items: start;

    @include lm() {
      grid-template-columns: 1fr;
      gap: $space-7;
    }
  }

  // ------------------------------------------------------------ 空狀態
  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $space-5;
    padding-bottom: $space-9;
  }
}
</style>
