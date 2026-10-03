<template>
  <header class="l-header" :class="{ 'l-header--is-open': menuOpen }">
    <h1 class="l-header__seo">{{ siteName }}</h1>

    <div class="l-header__inner">
      <NuxtLink class="l-header__brand" to="/">
        <span class="l-header__logo">
          <img :src="logoSrc" :alt="siteName" :title="siteName" />
        </span>
        <span class="l-header__slogan" v-if="slogan">{{ slogan }}</span>
      </NuxtLink>

      <nav class="l-header__nav" v-if="!maintenanceMode">
        <HeaderMenu />

        <HeaderSearch />

        <HeaderCartLinks />

        <button
          type="button"
          class="l-header__burger"
          :class="{ 'l-header__burger--is-open': menuOpen }"
          @click="onToggleBurger"
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
    </div>

    <ClientOnly>
      <CartDrawer />
      <CompareBar />
    </ClientOnly>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();
const { maintenanceMode } = useRuntimeConfig().public;
const { siteName, header } = useSiteConfig();

const slogan = computed(() => header.value?.slogan ?? "");
const logoSrc = computed(() => header.value?.logo ?? "/logo.svg");

/** 手機選單 */
const menuOpen = useMobileMenu();
const onToggleBurger = () => {
  menuOpen.value = !menuOpen.value;
};

/** 換頁時收合 */
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
  },
);
</script>

<style lang="scss" scoped>
.l-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  // 不使用 backdrop-filter：它會讓內層 position: fixed 的手機選單以 header 為容器
  background-color: $white;
  border-bottom: 1px solid $gray-100;

  &__seo {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  &__inner {
    @include container($container-wide);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $space-6;
    height: 80px;

    @include md() {
      height: 64px;
    }
  }

  // ------------------------------------------------------------ 品牌
  &__brand {
    display: flex;
    align-items: center;
    gap: $space-3;
    flex-shrink: 0;
  }

  &__logo {
    display: block;
    width: 44px;

    img {
      width: 100%;
      height: auto;
    }

    @include md() {
      width: 36px;
    }
  }

  &__slogan {
    color: $content;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
    white-space: nowrap;

    @include sm() {
      display: none;
    }
  }

  // ------------------------------------------------------------ 導覽
  &__nav {
    display: flex;
    align-items: center;
    gap: $space-6;
  }

  // ------------------------------------------------------------ 漢堡
  &__burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    @include size(24px);
    padding: 0;
    background: none;
    cursor: pointer;

    span {
      display: block;
      width: 100%;
      height: 1.5px;
      background-color: $text;
      transition: transform $duration $ease, opacity $duration $ease;
    }

    &--is-open {
      span:nth-child(1) {
        transform: translateY(6.5px) rotate(45deg);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: translateY(-6.5px) rotate(-45deg);
      }
    }

    @include lm() {
      display: flex;
    }
  }

}
</style>
