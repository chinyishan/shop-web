<template>
  <div class="c-filter">
    <!-- 功效 -->
    <section v-if="resource.effects?.length" class="c-filter__group">
      <p class="c-filter__title">功效需求</p>
      <ul class="c-filter__chips">
        <li v-for="tag in resource.effects" :key="tag.key">
          <button
            type="button"
            class="c-filter__chip"
            :class="{ 'c-filter__chip--is-active': model.effect.includes(tag.key) }"
            @click="onToggle('effect', tag.key)"
          >
            {{ tag.label }}
          </button>
        </li>
      </ul>
    </section>

    <!-- 族群 -->
    <section v-if="resource.audiences?.length" class="c-filter__group">
      <p class="c-filter__title">適用族群</p>
      <ul class="c-filter__chips">
        <li v-for="tag in resource.audiences" :key="tag.key">
          <button
            type="button"
            class="c-filter__chip"
            :class="{ 'c-filter__chip--is-active': model.audience.includes(tag.key) }"
            @click="onToggle('audience', tag.key)"
          >
            {{ tag.label }}
          </button>
        </li>
      </ul>
    </section>

    <!-- 價格 -->
    <section class="c-filter__group">
      <p class="c-filter__title">價格區間</p>
      <ul class="c-filter__chips">
        <li v-for="range in priceRanges" :key="range.label">
          <button
            type="button"
            class="c-filter__chip"
            :class="{
              'c-filter__chip--is-active':
                model.min_price === range.min && model.max_price === range.max,
            }"
            @click="onPriceRange(range)"
          >
            {{ range.label }}
          </button>
        </li>
      </ul>
    </section>

    <!-- 其他條件 -->
    <section class="c-filter__group">
      <p class="c-filter__title">其他條件</p>
      <label class="c-filter__check">
        <input v-model="model.on_sale" type="checkbox" @change="emitChange" >
        <span>只看特價商品</span>
      </label>
      <label class="c-filter__check">
        <input v-model="model.in_stock" type="checkbox" @change="emitChange" >
        <span>只看有庫存</span>
      </label>
    </section>

    <button v-if="hasFilter" type="button" class="c-filter__reset" @click="onReset">
      清除所有條件
    </button>
  </div>
</template>

<script setup>
defineProps({
  resource: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["change"]);

const priceRanges = [
  { label: "NT$ 1,000 以下", min: null, max: 1000 },
  { label: "NT$ 1,000 - 2,000", min: 1000, max: 2000 },
  { label: "NT$ 2,000 - 4,000", min: 2000, max: 4000 },
  { label: "NT$ 4,000 以上", min: 4000, max: null },
];

const model = reactive({
  effect: [],
  audience: [],
  min_price: null,
  max_price: null,
  on_sale: false,
  in_stock: false,
});

const hasFilter = computed(
  () =>
    model.effect.length ||
    model.audience.length ||
    model.min_price ||
    model.max_price ||
    model.on_sale ||
    model.in_stock
);

const emitChange = () => {
  emit("change", {
    effect: model.effect.join(",") || null,
    audience: model.audience.join(",") || null,
    min_price: model.min_price,
    max_price: model.max_price,
    on_sale: model.on_sale ? "true" : null,
    in_stock: model.in_stock ? "true" : null,
  });
};

const onToggle = (field, key) => {
  const list = model[field];
  const index = list.indexOf(key);
  if (index === -1) list.push(key);
  else list.splice(index, 1);
  emitChange();
};

const onPriceRange = (range) => {
  const isSame = model.min_price === range.min && model.max_price === range.max;
  model.min_price = isSame ? null : range.min;
  model.max_price = isSame ? null : range.max;
  emitChange();
};

const onReset = () => {
  model.effect = [];
  model.audience = [];
  model.min_price = null;
  model.max_price = null;
  model.on_sale = false;
  model.in_stock = false;
  emitChange();
};
</script>

<style lang="scss" scoped>
.c-filter {
  &__group {
    padding: $space-5 0;
    border-bottom: 1px solid $gray-100;

    &:first-child {
      padding-top: 0;
    }
  }

  &__title {
    margin-bottom: $space-3;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-eyebrow;
    text-transform: uppercase;
  }

  &__chips {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
  }

  &__chip {
    padding: $space-2 $space-3;
    border: 1px solid $gray-200;
    border-radius: $radius-pill;
    background: none;
    color: $content;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
    cursor: pointer;
    transition: border-color $duration $ease, color $duration $ease,
      background-color $duration $ease;

    &:hover {
      border-color: $primary-300;
      color: $primary;
    }

    &--is-active {
      border-color: $primary;
      background-color: $primary;
      color: $white;
    }
  }

  &__check {
    display: flex;
    align-items: center;
    gap: $space-2;
    padding: $space-2 0;
    color: $content;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
    cursor: pointer;

    input {
      accent-color: $primary;
      width: 16px;
      height: 16px;
    }
  }

  &__reset {
    margin-top: $space-5;
    padding: 0;
    background: none;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: $primary;
    }
  }
}
</style>
