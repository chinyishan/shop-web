<template>
  <div class="l-page p-complete">
    <Breadcrumb />

    <section class="c-section">
      <div class="c-section__inner c-section__inner--narrow">
        <div class="p-complete__box">
          <span class="p-complete__icon">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="24" cy="24" r="21" />
              <path d="M15 24.5l6.5 6.5L33 19" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>

          <span class="c-section__eyebrow">Order received</span>
          <h1 class="p-complete__title">訂單已送出</h1>
          <p class="p-complete__text">
            感謝你的訂購，我們已收到訂單並寄出確認信。<br >
            本站為個人作品，這筆訂單僅為介面展示，不會真的出貨或扣款。
          </p>

          <dl v-if="orderNo" class="p-complete__info">
            <dt>訂單編號</dt>
            <dd>{{ orderNo }}</dd>
          </dl>

          <div class="p-complete__actions">
            <NuxtLink class="c-btn" to="/products/1/detail">繼續選購</NuxtLink>
            <NuxtLink class="c-btn c-btn--ghost" to="/">回首頁</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute();
const orderNo = computed(() => route.query.no ?? "");

useSeo("page-index", {
  title: "訂單完成",
  description: "訂單已送出。",
});
</script>

<style lang="scss" scoped>
.p-complete {
  background-color: $white;

  &__box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $space-9 $space-6;
    border: 1px solid $primary-100;
    border-radius: $radius-lg;
    background-color: $primary-50;
    text-align: center;

    @include md() {
      padding: $space-7 $space-5;
    }
  }

  &__icon {
    display: block;
    margin-bottom: $space-5;
    color: $primary;

    svg {
      @include size(56px);
    }
  }

  &__title {
    margin-bottom: $space-4;
    color: $ink;
    font-size: $fz-h1;
    font-weight: 600;
    letter-spacing: $ls-heading;

    @include md() {
      font-size: $fz-h3;
    }
  }

  &__text {
    color: $content;
    font-size: $fz-body;
    line-height: $lh-body;
    letter-spacing: $ls-body;
  }

  &__info {
    margin-top: $space-6;
    padding: $space-4 $space-6;
    border-radius: $radius-md;
    background-color: $white;

    dt {
      color: $muted;
      font-size: $fz-xs;
      letter-spacing: $ls-eyebrow;
      text-transform: uppercase;
    }

    dd {
      margin-top: $space-2;
      color: $primary-dark;
      font-size: $fz-h4;
      font-weight: 600;
      letter-spacing: $ls-heading;
    }
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: $space-3;
    margin-top: $space-7;
  }
}
</style>
