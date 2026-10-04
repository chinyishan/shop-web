<template>
  <svg
    class="c-logo"
    :class="{ 'c-logo--mark': mark }"
    :viewBox="mark ? '0 0 48 48' : '0 0 232 64'"
    role="img"
    :aria-label="label"
  >
    <title>{{ label }}</title>
    <!-- 太陽：半圓 + 放射光芒 + 微笑弧線 -->
    <g :transform="mark ? undefined : 'translate(2 8)'">
      <path class="c-logo__core" d="M10 36a14 14 0 0 1 28 0z" />
      <line
        v-for="(ray, index) in rays"
        :key="index"
        class="c-logo__ray"
        :class="{ 'c-logo__ray--alt': index % 2 }"
        :x1="ray[0]"
        :y1="ray[1]"
        :x2="ray[2]"
        :y2="ray[3]"
      />
      <path class="c-logo__smile" d="M6 41q18 6 36 0" />
    </g>
    <template v-if="!mark">
      <text class="c-logo__name" x="60" y="35">好日補給</text>
      <text class="c-logo__sub" x="61" y="56">VITADAY</text>
    </template>
  </svg>
</template>

<script setup lang="ts">
/** 品牌 logo：文字顏色跟著主題變化。mark 為只有太陽圖示的版本 */
defineProps<{ mark?: boolean }>();

const label = "好日補給 VITADAY";

/** 光芒 [x1, y1, x2, y2]，48×48 座標 */
const rays = [
  [24, 15, 24, 6],
  [13.5, 19.5, 8, 13],
  [34.5, 19.5, 40, 13],
  [7, 29, 1, 26.5],
  [41, 29, 47, 26.5],
] as const;
</script>

<style lang="scss" scoped>
.c-logo {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;

  &__core {
    fill: $accent;
  }

  &__ray,
  &__smile {
    fill: none;
    stroke: $accent-dark;
    stroke-width: 3.6;
    stroke-linecap: round;
  }

  &__ray--alt {
    stroke: #ffd36b; // 光芒的亮黃色，深淺模式相同
  }

  &__name {
    fill: $primary-dark;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 3px;
  }

  &__sub {
    fill: $accent-dark;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 6.2px;
  }
}
</style>
