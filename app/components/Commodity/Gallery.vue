<template>
  <div class="c-commodity__gallery">
    <div class="c-commodity__stage">
      <img
        :src="activeImage ?? noImage"
        :alt="name"
        :title="name"
        @error="onImageError"
      />
    </div>

    <ul class="c-commodity__thumbs" v-if="images.length > 1">
      <li v-for="(item, index) in images" :key="index">
        <button
          type="button"
          class="c-commodity__thumb"
          :class="{ 'c-commodity__thumb--is-active': imageIndex === index }"
          @click="imageIndex = index"
        >
          <img :src="item ?? noImage" alt="商品圖" title="商品圖" @error="onImageError" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import noImage from "@/assets/images/picture/no-image.png";

/** 商品圖片：主圖 + 縮圖切換 */
const props = defineProps({
  images: { type: Array, default: () => [] },
  name: { type: String, default: "" },
});

const imageIndex = ref(0);
const activeImage = computed(() => props.images[imageIndex.value]);

const onImageError = (event) => {
  event.target.src = noImage;
};
</script>

<style lang="scss" scoped>
.c-commodity {
  // ------------------------------------------------------------ 圖片
  &__stage {
    @include ratio(1, 1);
    border-radius: $radius-lg;
    background-color: $primary-50;

    img {
      object-fit: contain;
      padding: $space-8;
      box-sizing: border-box;
    }
  }

  &__thumbs {
    display: flex;
    gap: $space-3;
    margin-top: $space-4;
  }

  &__thumb {
    @include size(72px);
    padding: 0;
    border: 1px solid $gray-200;
    border-radius: $radius-md;
    background-color: $white;
    overflow: hidden;
    cursor: pointer;
    transition: border-color $duration $ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    &:hover {
      border-color: $primary-300;
    }

    &--is-active {
      border-color: $primary;
    }
  }
}
</style>
