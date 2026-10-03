<template>
  <div class="c-commodity__specs">
    <p class="c-commodity__label">規格</p>
    <ul class="c-commodity__spec-list">
      <li v-for="spec in specs" :key="spec.id">
        <button
          type="button"
          class="c-commodity__spec"
          :class="{
            'c-commodity__spec--is-active': activeSpec?.id === spec.id,
            'c-commodity__spec--is-sold-out': spec.stock === 0,
          }"
          :disabled="spec.stock === 0"
          @click="activeSpec = spec"
        >
          {{ spec.label }}
          <span class="c-commodity__spec-price">{{ formatPrice(spec.price) }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
/** 規格選擇，v-model 為目前選取的規格 */
const activeSpec = defineModel({ type: Object, default: null });
defineProps({
  specs: { type: Array, default: () => [] },
});
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

  // ------------------------------------------------------------ 規格
  &__specs {
    margin-top: $space-6;
  }

  &__label {
    margin-bottom: $space-3;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-eyebrow;
    text-transform: uppercase;
  }

  &__spec-list {
    display: flex;
    flex-wrap: wrap;
    gap: $space-3;
  }

  &__spec {
    display: flex;
    flex-direction: column;
    gap: $space-1;
    padding: $space-3 $space-4;
    border: 1px solid $gray-200;
    border-radius: $radius-md;
    background: none;
    color: $text;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
    text-align: left;
    cursor: pointer;
    transition: border-color $duration $ease, color $duration $ease,
      background-color $duration $ease;

    &:hover:not(:disabled) {
      border-color: $primary-300;
    }

    &--is-active {
      border-color: $primary;
      background-color: $primary-50;
      color: $primary-dark;
    }

    &--is-sold-out {
      color: $gray-300;
      cursor: not-allowed;
      text-decoration: line-through;
    }
  }

  &__spec-price {
    color: $primary;
    font-size: $fz-xs;
  }

  &--is-sold-out &__spec-price,
  &__spec--is-sold-out &__spec-price {
    color: $gray-300;
  }
}
</style>
