<template>
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
</template>

<script setup lang="ts">
/** 頁首導覽選單：桌機為下拉，手機在漢堡選單展開時改為全螢幕清單 */
const route = useRoute();
const navMenu = useNavMenu();
const menuOpen = useMobileMenu();

const openKey = ref<string | null>(null);
const onToggleMenu = (key: string) => {
  openKey.value = openKey.value === key ? null : key;
};

// 收起手機選單或換頁時，下拉一併收合
watch(menuOpen, (open) => {
  if (!open) openKey.value = null;
});
watch(
  () => route.fullPath,
  () => {
    openKey.value = null;
  },
);
</script>

<style lang="scss" scoped>
.l-header {
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
