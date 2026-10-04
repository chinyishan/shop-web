<template>
  <div
    v-if="info?.items"
    class="c-banner"
    :class="size === 'large' ? 'c-banner--hero' : 'c-banner--page'"
  >
    <Swiper class="c-banner__swiper" v-bind="swiperBanner">
      <SwiperSlide v-for="(item, index) in info.items" :key="index" class="c-banner__slide">
        <component
          :is="item.url ? 'a' : 'div'"
          class="c-banner__link"
          :href="item.url || undefined"
          :target="item.new_page === true ? '_blank' : '_self'"
        >
          <picture class="c-banner__picture">
            <source :srcset="item.image" media="(min-width: 769px)" >
            <img
              class="c-banner__image"
              :src="item.image_m"
              :alt="item.alt"
              :title="item.alt"
            >
          </picture>
        </component>
      </SwiperSlide>
    </Swiper>
    <div class="c-banner__pagination swiper-pagination"/>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

const props = defineProps({
  info: {
    type: Object,
    default: () => ({}),
  },
  size: {
    type: String,
    default: "small",
  },
});

const swiperBanner = {
  modules: [Autoplay, EffectFade, Pagination],
  slidesPerView: 1,
  spaceBetween: 0,
  speed: 900,
  loop: props.info?.items?.length > 1,
  autoplay: { delay: 6500, disableOnInteraction: false },
  pagination: { el: ".c-banner__pagination", clickable: true },
};
</script>

<style lang="scss" scoped>
.c-banner {
  position: relative;
  width: 100%;
  background-color: $primary-50;
  overflow: hidden;

  &__swiper {
    width: 100%;
  }

  &__link {
    display: block;
  }

  &__picture {
    display: block;
  }

  &__image {
    display: block;
    width: 100%;
    height: auto;
  }

  &__pagination {
    position: absolute;
    left: 0;
    right: 0;
    bottom: $space-5 !important;
    z-index: 2;
    display: flex;
    justify-content: center;
    gap: $space-2;

    :deep(.swiper-pagination-bullet) {
      width: 24px !important;
      height: 2px !important;
      margin: 0 !important;
      border-radius: 0 !important;
      background: alpha($white, 0.55) !important;
      opacity: 1 !important;
      transition: background $duration $ease;
    }

    :deep(.swiper-pagination-bullet-active) {
      padding: 0 !important;
      background: $white !important;
    }
  }

  // 首頁主視覺：滿版
  &--hero {
    .c-banner__image {
      min-height: 320px;
      object-fit: cover;
    }
  }

  // 內頁：稍矮的形象帶
  &--page {
    .c-banner__pagination {
      display: none;
    }
  }

  @include md() {
    &__pagination {
      bottom: $space-4 !important;
    }
  }
}
</style>
