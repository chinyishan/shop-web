<template>
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
</template>

<script setup>
/** 購買方式：單次 or 定期購 9 折，v-model 為 mode key */
const mode = defineModel({ type: String, default: "once" });

const modes = [
  { key: "once", title: "單次購買", note: "一次性訂購" },
  { key: "subscribe", title: "定期購 9 折", note: "每月自動配送，可隨時取消" },
];
</script>

<style lang="scss" scoped>
.c-commodity {
  &__label {
    margin-bottom: $space-3;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-eyebrow;
    text-transform: uppercase;
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
}
</style>
