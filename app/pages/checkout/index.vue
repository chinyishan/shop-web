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
          <div class="p-checkout__layout" v-if="!cart.isEmpty">
            <!-- 表單 .......................................................... -->
            <div class="p-checkout__form">
              <el-form ref="formRef" :model="form" label-position="top">
                <h2 class="p-checkout__group">收件資訊</h2>

                <el-form-item
                  label="收件人姓名"
                  prop="name"
                  :rules="[{ required: true, message: '請輸入收件人姓名' }]"
                >
                  <el-input v-model="form.name" placeholder="請輸入姓名" :disabled="loading" />
                </el-form-item>

                <el-form-item
                  label="手機號碼"
                  prop="mobile"
                  :rules="[
                    { required: true, message: '請輸入手機號碼' },
                    { pattern: /^09\d{8}$/, message: '請輸入正確的手機號碼' },
                  ]"
                >
                  <el-input
                    v-model="form.mobile"
                    placeholder="09xxxxxxxx"
                    :disabled="loading"
                  />
                </el-form-item>

                <el-form-item
                  label="電子信箱"
                  prop="email"
                  :rules="[
                    { required: true, message: '請輸入電子信箱' },
                    {
                      validator: (rules, val) => isEmail(val),
                      message: '請輸入正確的 Email',
                    },
                  ]"
                >
                  <el-input
                    v-model="form.email"
                    placeholder="請輸入 Email"
                    :disabled="loading"
                  />
                </el-form-item>

                <h2 class="p-checkout__group">配送方式</h2>

                <el-form-item prop="delivery" :rules="[{ required: true, message: '請選擇配送方式' }]">
                  <el-radio-group v-model="form.delivery" :disabled="loading">
                    <el-radio value="home">宅配到府（滿 NT$ 1,000 免運）</el-radio>
                    <el-radio value="store">超商取貨</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item
                  :label="form.delivery === 'store' ? '取貨門市' : '收件地址'"
                  prop="address"
                  :rules="[{ required: true, message: '請填寫配送地址或門市' }]"
                >
                  <el-input
                    v-model="form.address"
                    :placeholder="
                      form.delivery === 'store'
                        ? '例：7-ELEVEN 健康門市'
                        : '例：台北市中正區健康路 1 號 5 樓'
                    "
                    :disabled="loading"
                  />
                </el-form-item>

                <h2 class="p-checkout__group">付款方式</h2>

                <el-form-item prop="payment" :rules="[{ required: true, message: '請選擇付款方式' }]">
                  <el-radio-group v-model="form.payment" :disabled="loading">
                    <el-radio value="credit">信用卡一次付清</el-radio>
                    <el-radio value="atm">ATM 轉帳</el-radio>
                    <el-radio value="cod">貨到付款</el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item label="訂單備註" prop="memo">
                  <el-input
                    type="textarea"
                    v-model="form.memo"
                    :rows="4"
                    :disabled="loading"
                    placeholder="有特殊需求可以在這裡告訴我們（選填）"
                  />
                </el-form-item>
              </el-form>
            </div>

            <!-- 訂單摘要 ...................................................... -->
            <aside class="p-checkout__summary">
              <h2 class="p-checkout__summary-title">訂單明細</h2>

              <ul class="p-checkout__items">
                <li class="p-checkout__item" v-for="item in cart.items" :key="item.key">
                  <span class="p-checkout__item-media">
                    <img :src="item.image" :alt="item.name" :title="item.name" />
                  </span>
                  <span class="p-checkout__item-body">
                    <span class="p-checkout__item-name">{{ item.name }}</span>
                    <span class="p-checkout__item-spec" v-if="item.spec_label">
                      {{ item.spec_label }}
                    </span>
                    <span class="p-checkout__item-qty">× {{ item.qty }}</span>
                  </span>
                  <span class="p-checkout__item-amount">
                    {{ formatPrice(item.price * item.qty) }}
                  </span>
                </li>
              </ul>

              <!-- 優惠碼 -->
              <div class="p-checkout__coupon">
                <div class="p-checkout__coupon-row" v-if="!coupon">
                  <input
                    class="p-checkout__coupon-input"
                    type="text"
                    v-model="couponCode"
                    placeholder="輸入優惠碼"
                    :disabled="couponLoading"
                    @keyup.enter="onApplyCoupon"
                  />
                  <button
                    type="button"
                    class="p-checkout__coupon-btn"
                    :disabled="couponLoading"
                    @click="onApplyCoupon"
                  >
                    套用
                  </button>
                </div>
                <div class="p-checkout__coupon-applied" v-else>
                  <span>
                    <strong>{{ coupon.code }}</strong>
                    {{ coupon.label }}
                  </span>
                  <button type="button" @click="onRemoveCoupon">移除</button>
                </div>
                <p class="p-checkout__coupon-hint">可用：HEALTH100、VIP10、FREESHIP</p>
              </div>

              <dl class="p-checkout__amounts">
                <div class="p-checkout__amount-row">
                  <dt>商品小計</dt>
                  <dd>{{ formatPrice(cart.subtotal) }}</dd>
                </div>
                <div class="p-checkout__amount-row" v-if="discount">
                  <dt>優惠折抵</dt>
                  <dd class="p-checkout__amount-row--discount">
                    -{{ formatPrice(discount) }}
                  </dd>
                </div>
                <div class="p-checkout__amount-row">
                  <dt>運費</dt>
                  <dd>{{ shipping ? formatPrice(shipping) : "免運" }}</dd>
                </div>
              </dl>

              <div class="p-checkout__total">
                <span>應付金額</span>
                <strong>{{ formatPrice(total) }}</strong>
              </div>

              <button
                type="button"
                class="c-btn p-checkout__submit"
                :disabled="loading"
                @click="onSubmit"
              >
                {{ loading ? "送出中…" : "送出訂單" }}
              </button>

              <NuxtLink class="p-checkout__back" to="/cart">返回購物車</NuxtLink>
            </aside>
          </div>

          <div class="p-checkout__empty" v-else>
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

const FREE_SHIPPING = 1000;
const SHIPPING_FEE = 80;
const STORE_FEE = 60;

const cart = useCartStore();
const orders = useOrderStore();
const router = useRouter();

setSEO("page-index", {
  title: "結帳",
  description: "填寫收件資訊並確認訂單內容。",
});

const formRef = ref(null);
const form = reactive({
  name: "",
  mobile: "",
  email: "",
  delivery: "home",
  address: "",
  payment: "credit",
  memo: "",
});
const loading = ref(false);

/** 優惠碼 */
const couponCode = ref("");
const coupon = ref(null);
const couponLoading = ref(false);

const onApplyCoupon = () => {
  const code = couponCode.value.trim();
  if (!code) return;

  couponLoading.value = true;
  $fetch("/api/orders/coupon", {
    query: { code, subtotal: cart.subtotal },
  })
    .then((res) => {
      if (!res.success) {
        ElMessage.warning(res.message);
        return;
      }
      coupon.value = res.result;
      ElMessage.success(`已套用優惠碼：${res.result.label}`);
    })
    .finally(() => {
      couponLoading.value = false;
    });
};

const onRemoveCoupon = () => {
  coupon.value = null;
  couponCode.value = "";
};

const discount = computed(() => coupon.value?.discount ?? 0);

const shipping = computed(() => {
  if (cart.isEmpty) return 0;
  if (coupon.value?.free_shipping) return 0;
  if (form.delivery === "store") return STORE_FEE;
  return cart.subtotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE;
});
const total = computed(() =>
  Math.max(cart.subtotal - discount.value + shipping.value, 0)
);

const onSubmit = () => {
  formRef.value.validate((success) => {
    if (!success) {
      ElMessage.warning("請確認紅字欄位是否填寫完整");
      return;
    }

    loading.value = true;
    $fetch("/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        items: cart.items,
        shipping_fee: shipping.value,
        discount: discount.value,
        coupon: coupon.value?.code ?? null,
      }),
    })
      .then((res) => {
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
      })
      .catch(() => {
        ElMessage.error("訂單送出失敗，請稍後再試");
      })
      .finally(() => {
        loading.value = false;
      });
  });
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

  // ------------------------------------------------------------ 表單
  &__group {
    margin-bottom: $space-5;
    padding-bottom: $space-3;
    border-bottom: 1px solid $gray-100;
    color: $ink;
    font-size: $fz-body-lg;
    font-weight: 600;
    line-height: $lh-heading;
    letter-spacing: $ls-heading;
    text-align: left;

    &:not(:first-child) {
      margin-top: $space-7;
    }
  }

  &__form {
    :deep(.el-form-item) {
      margin-bottom: $space-5;
    }

    :deep(.el-form-item__label) {
      margin-bottom: $space-2;
      padding: 0;
      color: $text;
      font-size: $fz-sm;
      line-height: 1.6;
      letter-spacing: $ls-body;
    }

    :deep(.el-input__wrapper),
    :deep(.el-textarea__inner) {
      min-height: 52px;
      border-radius: $radius-sm;
      box-shadow: 0 0 0 1px $gray-200 inset;
    }

    :deep(.el-radio-group) {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: $space-3;
      width: 100%;
    }

    :deep(.el-radio) {
      display: flex;
      align-items: center;
      height: auto;
      margin: 0;
      padding: 0;
    }

    :deep(.el-radio__label) {
      color: $text;
      font-size: $fz-body;
      letter-spacing: $ls-body;
    }
  }

  // ------------------------------------------------------------ 摘要
  &__summary {
    position: sticky;
    top: 120px;
    padding: $space-6;
    border: 1px solid $primary-100;
    border-radius: $radius-lg;
    background-color: $primary-50;

    @include lm() {
      position: static;
    }
  }

  &__summary-title {
    color: $ink;
    font-size: $fz-h4;
    font-weight: 600;
    letter-spacing: $ls-heading;
  }

  &__items {
    margin-top: $space-5;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: $space-3;
    padding: $space-3 0;
    border-bottom: 1px solid rgba($primary-100, 0.8);
  }

  &__item-media {
    flex-shrink: 0;
    @include size(48px);
    border-radius: $radius-sm;
    background-color: $white;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 4px;
      box-sizing: border-box;
    }
  }

  &__item-body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__item-name {
    color: $text;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
    @include line-clamp(1);
  }

  &__item-spec,
  &__item-qty {
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
  }

  &__item-amount {
    color: $ink;
    font-size: $fz-sm;
    font-weight: 600;
    white-space: nowrap;
  }

  // ------------------------------------------------------------ 優惠碼
  &__coupon {
    margin-top: $space-5;
    padding-top: $space-4;
    border-top: 1px solid $primary-100;
  }

  &__coupon-row {
    display: flex;
    gap: $space-2;
  }

  &__coupon-input {
    flex: 1;
    min-width: 0;
    min-height: 40px;
    padding: 0 $space-3;
    border: 1px solid $gray-200;
    border-radius: $radius-sm;
    background-color: $white;
    color: $text;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
    outline: none;

    &:focus {
      border-color: $primary;
    }
  }

  &__coupon-btn {
    padding: 0 $space-4;
    border: 1px solid $primary;
    border-radius: $radius-sm;
    background: none;
    color: $primary;
    font-size: $fz-sm;
    cursor: pointer;
    transition: background-color $duration $ease, color $duration $ease;

    &:hover:not(:disabled) {
      background-color: $primary;
      color: $white;
    }
  }

  &__coupon-applied {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-3;
    padding: $space-3;
    border: 1px dashed $primary;
    border-radius: $radius-sm;
    background-color: $white;
    color: $text;
    font-size: $fz-sm;

    strong {
      margin-right: $space-2;
      color: $primary-dark;
    }

    button {
      padding: 0;
      background: none;
      color: $muted;
      font-size: $fz-xs;
      cursor: pointer;

      &:hover {
        color: $primary;
      }
    }
  }

  &__coupon-hint {
    margin-top: $space-2;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
  }

  &__amounts {
    margin-top: $space-4;
  }

  &__amount-row--discount {
    color: $accent-dark;
  }

  &__amount-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $space-2 0;
    color: $content;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
  }

  &__total {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-top: $space-3;
    padding-top: $space-4;
    border-top: 1px solid $primary-100;
    color: $text;
    font-size: $fz-sm;

    strong {
      color: $primary-dark;
      font-size: $fz-h3;
      font-weight: 600;
    }
  }

  &__submit {
    width: 100%;
    margin-top: $space-5;
  }

  &__back {
    display: block;
    margin-top: $space-4;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
    text-align: center;

    &:hover {
      color: $primary;
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
