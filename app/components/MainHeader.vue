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
        <ul class="l-header__menu">
          <li
            class="l-header__item"
            v-for="item in navMenu"
            :key="item.key"
            :class="{ 'l-header__item--is-open': openKey === item.key }"
          >
            <button
              type="button"
              class="l-header__link"
              v-if="item.children?.length"
              @click="onToggleMenu(item.key)"
            >
              {{ item.name }}
            </button>
            <NuxtLink class="l-header__link" :to="item.href" v-else>
              {{ item.name }}
            </NuxtLink>

            <ul class="l-header__dropdown" v-if="item.children?.length">
              <li
                class="l-header__dropdown-item"
                v-for="child in item.children"
                :key="child.key"
              >
                <NuxtLink class="l-header__dropdown-link" :to="child.href">
                  {{ child.name }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>

        <div class="l-header__search" :class="{ 'l-header__search--is-open': searchOpen }">
          <input
            class="l-header__search-input"
            type="text"
            placeholder="輸入關鍵字"
            v-model="searchText"
            ref="searchInputRef"
            @keyup.enter="onSearch"
          />
          <button type="button" class="l-header__search-btn" @click="onSearch">
            <img src="@/assets/images/picture/search-icon-1.png" alt="搜尋" title="搜尋" />
          </button>
        </div>

        <NuxtLink class="l-header__cart" to="/wishlist" aria-label="收藏清單">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path
              d="M12 20s-7-4.3-7-9.2A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7 2.8c0 4.9-7 9.2-7 9.2z"
              stroke-linejoin="round"
            />
          </svg>
          <ClientOnly>
            <span class="l-header__cart-badge" v-if="wishlist.count">{{ wishlist.count }}</span>
          </ClientOnly>
        </NuxtLink>

        <NuxtLink class="l-header__cart" to="/cart" aria-label="購物車">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
            <path
              d="M7 8h10l-1 11H8L7 8z"
              stroke-linejoin="round"
            />
            <path d="M9.5 8a2.5 2.5 0 0 1 5 0" stroke-linecap="round" />
          </svg>
          <ClientOnly>
            <span class="l-header__cart-badge" v-if="cart.count">{{ cart.count }}</span>
          </ClientOnly>
        </NuxtLink>

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
const router = useRouter();
const { maintenanceMode } = useRuntimeConfig().public;
const { siteName, header } = useSiteConfig();
const navMenu = useNavMenu();

const cart = useCartStore();
const wishlist = useWishlistStore();

const slogan = computed(() => header.value?.slogan ?? "");
const logoSrc = computed(() => header.value?.logo ?? "/logo.svg");

/** 下拉選單 */
const openKey = ref<string | null>(null);
const onToggleMenu = (key: string) => {
  openKey.value = openKey.value === key ? null : key;
};

/** 手機選單 */
const menuOpen = useMobileMenu();
const onToggleBurger = () => {
  menuOpen.value = !menuOpen.value;
  if (!menuOpen.value) openKey.value = null;
};

/** 搜尋 */
const searchText = ref(route.query.search as string | undefined);
const searchInputRef = ref<HTMLInputElement | null>(null);
const searchOpen = ref(false);

const onSearch = () => {
  if (!searchOpen.value) {
    searchOpen.value = true;
    nextTick(() => searchInputRef.value?.focus());
    return;
  }

  searchOpen.value = false;
  router.push({ name: "search", query: { search: searchText.value ?? "" } });
};

/** 換頁時收合 */
watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false;
    openKey.value = null;
    searchOpen.value = false;
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

  &__menu {
    display: flex;
    align-items: center;
    gap: $space-7;

    @include lm() {
      display: none;
    }
  }

  &__item {
    position: relative;

    // 只在桌機用 hover 展開，避免影響手機的靜態選單
    @media screen and (min-width: 1200px) {
      &:hover .l-header__dropdown {
        opacity: 1;
        visibility: visible;
        transform: translate(-50%, 0);
      }
    }
  }

  &__link {
    display: block;
    padding: $space-2 0;
    background: none;
    color: $text;
    font-size: $fz-body;
    letter-spacing: $ls-heading;
    white-space: nowrap;
    cursor: pointer;
    transition: color $duration $ease;

    &:hover,
    &.router-link-active {
      color: $primary;
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + #{$space-4});
    left: 50%;
    transform: translate(-50%, 8px);
    min-width: 200px;
    padding: $space-3 0;
    border: 1px solid $gray-100;
    border-radius: $radius-md;
    background-color: $white;
    box-shadow: $shadow-md;
    opacity: 0;
    visibility: hidden;
    transition: opacity $duration $ease, transform $duration $ease,
      visibility $duration $ease;
  }

  &__dropdown-link {
    display: block;
    padding: $space-3 $space-5;
    color: $content;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
    white-space: nowrap;
    transition: color $duration $ease, background-color $duration $ease;

    &:hover {
      background-color: $primary-50;
      color: $primary;
    }
  }

  // ------------------------------------------------------------ 搜尋
  &__search {
    display: flex;
    align-items: center;
    gap: $space-2;
  }

  &__search-input {
    width: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid transparent;
    background: transparent;
    color: $text;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
    outline: none;
    opacity: 0;
    transition: width $duration $ease, opacity $duration $ease;
  }

  &__search--is-open &__search-input {
    width: 180px;
    padding: $space-2 0;
    border-bottom-color: $primary-100;
    opacity: 1;

    @include md() {
      width: 130px;
    }
  }

  &__search-btn {
    @include size(24px);
    padding: 0;
    background: none;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  // ------------------------------------------------------------ 購物車
  &__cart {
    position: relative;
    display: flex;
    align-items: center;
    color: $text;
    transition: color $duration $ease;

    svg {
      @include size(26px);
      display: block;
    }

    &:hover {
      color: $primary;
    }
  }

  &__cart-badge {
    position: absolute;
    top: -6px;
    right: -8px;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: $radius-pill;
    background-color: $primary;
    color: $white;
    font-size: 11px;
    line-height: 18px;
    text-align: center;
    box-sizing: border-box;
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

  // ------------------------------------------------------------ 手機選單
  @include lm() {
    &--is-open {
      .l-header__menu {
        display: block;
        position: fixed;
        top: 80px;
        left: 0;
        right: 0;
        bottom: 0;
        padding: $space-5 $gutter-md $space-9;
        background-color: $white;
        overflow-y: auto;

        @include md() {
          top: 64px;
        }
      }

      .l-header__item {
        border-bottom: 1px solid $gray-100;
      }

      .l-header__link {
        width: 100%;
        padding: $space-4 0;
        font-size: $fz-body-lg;
        text-align: left;
      }

      .l-header__dropdown {
        position: static;
        left: auto;
        transform: none;
        opacity: 1;
        visibility: visible;
        display: none;
        min-width: 0;
        padding: 0 0 $space-4;
        border: 0;
        border-radius: 0;
        box-shadow: none;
      }

      .l-header__item--is-open .l-header__dropdown {
        display: block;
      }

      .l-header__dropdown-link {
        padding: $space-3 $space-4;
        font-size: $fz-body;

        &:hover {
          background-color: transparent;
        }
      }
    }
  }
}
</style>
