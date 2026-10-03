<template>
  <div class="l-page p-home" v-if="pageData">
    <!-- 主視覺 ................................................................ -->
    <SwipersBanner class="p-home__hero" :info="pageData.carousel" size="large" />

    <!-- 品牌理念 .............................................................. -->
    <section class="c-section p-home__intro" v-if="pageData.intro">
      <div class="c-section__inner">
        <div class="p-home__intro-head">
          <div class="p-home__intro-lead">
            <span class="c-section__eyebrow">{{ pageData.intro.eyebrow }}</span>
            <h2 class="c-section__title p-home__intro-title">
              {{ pageData.intro.title }}
            </h2>
          </div>
          <div>
            <p class="p-home__intro-text">{{ pageData.intro.description }}</p>
            <NuxtLink class="c-btn c-btn--ghost p-home__intro-cta" to="/quiz">
              做個 1 分鐘保健測驗
            </NuxtLink>
          </div>
        </div>

        <ul class="p-home__features">
          <li
            class="c-feature p-home__feature"
            v-for="(feature, index) in pageData.intro.features"
            :key="index"
          >
            <span class="c-feature__index">{{ String(index + 1).padStart(2, "0") }}</span>
            <h3 class="c-feature__title">{{ feature.title }}</h3>
            <p class="c-feature__desc">{{ feature.description }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- 系列品牌：左右交錯 ..................................................... -->
    <section class="c-section c-section--tint p-home__brands" v-if="brands.length">
      <div class="c-section__inner">
        <div class="c-section__head">
          <div>
            <span class="c-section__eyebrow">Brands</span>
            <h2 class="c-section__title">系列品牌</h2>
          </div>
        </div>

        <div class="p-home__brand-list">
          <article class="p-home__brand" v-for="brand in brands" :key="brand.id">
            <NuxtLink class="p-home__brand-media" :to="`/brands/${brand.id}`">
              <div class="c-figure">
                <img :src="brand.logo" :alt="brand.name" :title="brand.name" />
              </div>
            </NuxtLink>

            <div class="p-home__brand-body">
              <h3 class="p-home__brand-name">{{ brand.name }}</h3>
              <p class="p-home__brand-desc">{{ brand.description }}</p>

              <ul class="p-home__brand-products">
                <li
                  class="p-home__brand-product"
                  v-for="product in brand.products"
                  :key="product.id"
                >
                  <NuxtLink
                    class="c-product"
                    :to="`/products/${brand.id}/product/${product.id}`"
                  >
                    <div class="c-product__media">
                      <img
                        :src="product.image"
                        :alt="product.name"
                        :title="product.name"
                      />
                    </div>
                    <h4 class="c-product__name">{{ product.name }}</h4>
                    <Price :value="product.price" :origin="product.origin_price" size="sm" />
                  </NuxtLink>
                </li>
              </ul>

              <NuxtLink class="c-link-more" :to="`/brands/${brand.id}`">
                <span>了解品牌</span>
                <span class="c-link-more__arrow">→</span>
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 精選商品 .............................................................. -->
    <section class="c-section p-home__products" v-if="pageData.featured_products">
      <div class="c-section__inner">
        <div class="c-section__head">
          <div>
            <span class="c-section__eyebrow">Products</span>
            <h2 class="c-section__title">精選商品</h2>
          </div>
          <div class="c-section__action" v-if="pageData.featured_products.more">
            <NuxtLink class="c-link-more" to="/products/1/detail">
              <span>商品專區</span>
              <span class="c-link-more__arrow">→</span>
            </NuxtLink>
          </div>
        </div>

        <ul class="p-home__product-grid">
          <li v-for="item in pageData.featured_products.items" :key="item.id">
            <ProductCard :item="item" />
          </li>
        </ul>
      </div>
    </section>

    <!-- 資訊專欄 .............................................................. -->
    <section
      class="c-section c-section--surface p-home__journal"
      v-if="pageData.carousel_article"
    >
      <div class="c-section__inner">
        <div class="c-section__head">
          <div>
            <span class="c-section__eyebrow">Journal</span>
            <h2 class="c-section__title">資訊專欄</h2>
          </div>
          <div class="c-section__action" v-if="pageData.carousel_article.more">
            <NuxtLink class="c-link-more" to="/articles/all">
              <span>所有文章</span>
              <span class="c-link-more__arrow">→</span>
            </NuxtLink>
          </div>
        </div>

        <ul class="p-home__journal-grid">
          <li v-for="item in journalItems" :key="item.id">
            <NuxtLink
              class="c-card"
              :to="{
                name: 'articles-categoryId-id',
                params: { categoryId: 'all', id: item.id },
              }"
            >
              <div class="c-card__media">
                <div class="c-figure">
                  <img :src="item.main_image" :alt="item.title" :title="item.title" />
                </div>
              </div>
              <div class="c-card__meta">
                <span class="c-tag">{{ item.category }}</span>
              </div>
              <h3 class="c-card__title">{{ item.title }}</h3>
              <p class="c-card__desc">{{ item.sub_title }}</p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- 好評回饋 .............................................................. -->
    <section class="c-section p-home__voices" v-if="pageData.carousel_reviews">
      <div class="c-section__inner">
        <div class="c-section__head">
          <div>
            <span class="c-section__eyebrow">Voices</span>
            <h2 class="c-section__title">使用者的話</h2>
          </div>
        </div>

        <ul class="p-home__voice-grid">
          <li class="p-home__voice" v-for="item in voiceItems" :key="item.id">
            <blockquote class="p-home__voice-text">{{ item.content }}</blockquote>
            <div class="p-home__voice-person">
              <div class="p-home__voice-avatar">
                <img :src="item.image" :alt="item.user_name" :title="item.user_name" />
              </div>
              <div>
                <p class="p-home__voice-name">{{ item.user_name }}</p>
                <p class="p-home__voice-job">
                  {{ item.company }}・{{ item.career }}
                </p>
              </div>
            </div>
            <NuxtLink
              class="p-home__voice-product"
              :to="`/products/${item.brand_id}/product/${item.product_id}`"
            >
              {{ item.product_name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- 專業合作 .............................................................. -->
    <section
      class="c-section c-section--tint p-home__cooperation"
      v-if="pageData.cooperation"
    >
      <div class="c-section__inner">
        <div class="p-home__cooperation-row">
          <div class="p-home__cooperation-media">
            <div class="c-figure c-figure--plain">
              <img
                :src="pageData.cooperation.image"
                :alt="pageData.cooperation.title"
                :title="pageData.cooperation.title"
              />
            </div>
          </div>
          <div class="p-home__cooperation-body">
            <span class="c-section__eyebrow">Cooperation</span>
            <h2 class="c-section__title">{{ pageData.cooperation.title }}</h2>
            <p class="p-home__cooperation-text">
              {{ pageData.cooperation.description }}
            </p>
            <NuxtLink class="c-btn c-btn--ghost" to="/contact-us/information">
              合作與提案
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部形象帶 ............................................................ -->
    <section class="p-home__cta" v-if="pageData.carousel_small">
      <NuxtLink
        class="p-home__cta-item"
        v-for="(item, index) in pageData.carousel_small.items"
        :key="index"
        to="/qualities/3"
      >
        <picture>
          <source :srcset="item.image" media="(min-width: 769px)" />
          <img :src="item.image_m" alt="HealthLab" title="HealthLab" />
        </picture>
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
const { page } = useSiteConfig();
const pageData = computed(() => page("page-index")?.attribute_data);

useSeo("page-index");

const { data: brands } = await useFetch("/api/index/config", {
  transform: (res) => res.result.data ?? [],
  default: () => [],
});

const journalItems = computed(() => (pageData.value?.carousel_article?.items ?? []).slice(0, 3));
const voiceItems = computed(() => (pageData.value?.carousel_reviews?.items ?? []).slice(0, 3));
</script>

<style lang="scss" scoped>
.p-home {
  background-color: $white;

  // ------------------------------------------------------------ 品牌理念
  &__intro-head {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: $space-8;
    align-items: end;
    margin-bottom: $space-10;

    @include lm() {
      grid-template-columns: 1fr;
      gap: $space-5;
      margin-bottom: $space-8;
    }
  }

  &__intro-title {
    font-size: $fz-h1;

    @include md() {
      font-size: $fz-h3;
    }
  }

  &__intro-text {
    color: $content;
    font-size: $fz-body-lg;
    line-height: $lh-body;
    letter-spacing: $ls-body;
    white-space: pre-line;

    @include md() {
      font-size: $fz-body;
    }
  }

  &__intro-cta {
    margin-top: $space-5;
  }

  &__features {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: $space-7;

    @include tb() {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: $space-6;
    }
    @include sm() {
      grid-template-columns: 1fr;
    }
  }

  &__feature {
    padding-top: $space-5;
    border-top: 1px solid $primary-100;
  }

  // ------------------------------------------------------------ 系列品牌
  &__brand-list {
    display: flex;
    flex-direction: column;
    gap: $space-10;

    @include md() {
      gap: $space-8;
    }
  }

  &__brand {
    display: grid;
    grid-template-columns: minmax(0, 380px) minmax(0, 1fr);
    gap: $space-8;
    align-items: center;

    &:nth-child(even) {
      grid-template-columns: minmax(0, 1fr) minmax(0, 380px);

      .p-home__brand-media {
        order: 2;
      }
    }

    @include lm() {
      grid-template-columns: 1fr;
      gap: $space-5;

      &:nth-child(even) {
        grid-template-columns: 1fr;

        .p-home__brand-media {
          order: 0;
        }
      }
    }
  }

  &__brand-media {
    display: block;

    .c-figure {
      // 品牌識別卡的原始比例，避免裁切到品牌名
      aspect-ratio: #{532} / #{372};
      border-radius: $radius-lg;
      background-color: $white;
    }

    &:hover .c-figure img {
      transform: scale(1.03);
    }
  }

  &__brand-name {
    color: $ink;
    font-size: $fz-h3;
    font-weight: 600;
    line-height: $lh-heading;
    letter-spacing: $ls-heading;
  }

  &__brand-desc {
    max-width: $container-text;
    margin-top: $space-3;
    color: $content;
    font-size: $fz-body;
    line-height: $lh-body;
    letter-spacing: $ls-body;
  }

  &__brand-products {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: $space-5;
    margin: $space-6 0;

    @include sm() {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: $space-4;
    }
  }

  &__brand-product {
    .c-product__media {
      background-color: $white;
    }

    .c-product__name {
      font-size: $fz-sm;
    }
  }

  // ------------------------------------------------------------ 精選商品
  &__product-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: $space-8 $space-6;

    @include tb() {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    @include md() {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: $space-6 $space-4;
    }
  }

  // ------------------------------------------------------------ 資訊專欄
  &__journal-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: $space-7;

    @include tb() {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    @include md() {
      grid-template-columns: 1fr;
      gap: $space-6;
    }
  }

  // ------------------------------------------------------------ 好評回饋
  &__voice-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: $space-7;

    @include tb() {
      grid-template-columns: 1fr;
      gap: $space-6;
    }
  }

  &__voice {
    display: flex;
    flex-direction: column;
    padding-top: $space-5;
    border-top: 1px solid $primary-100;
  }

  &__voice-text {
    color: $text;
    font-size: $fz-body;
    line-height: $lh-body;
    letter-spacing: $ls-body;
    @include line-clamp(5);
  }

  &__voice-person {
    display: flex;
    align-items: center;
    gap: $space-3;
    margin-top: auto; // 讓各欄的人物資訊對齊底部
    padding-top: $space-5;
  }

  &__voice-avatar {
    flex-shrink: 0;
    @include size(48px);
    border-radius: $radius-pill;
    overflow: hidden;
    background-color: $primary-50;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__voice-name {
    color: $ink;
    font-size: $fz-sm;
    font-weight: 500;
    letter-spacing: $ls-body;
  }

  &__voice-job {
    margin-top: 2px;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
  }

  &__voice-product {
    margin-top: $space-4;
    color: $primary;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
    transition: color $duration $ease;

    &:hover {
      color: $primary-dark;
    }
  }

  // ------------------------------------------------------------ 專業合作
  &__cooperation-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: $space-9;
    align-items: center;

    @include lm() {
      grid-template-columns: 1fr;
      gap: $space-6;
    }
  }

  &__cooperation-text {
    margin: $space-5 0 $space-7;
    color: $content;
    font-size: $fz-body;
    line-height: $lh-body;
    letter-spacing: $ls-body;
    white-space: pre-line;
  }

  // ------------------------------------------------------------ 底部形象帶
  &__cta {
    display: grid;
    grid-template-columns: 1fr;
  }

  &__cta-item {
    display: block;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: auto;
      transition: transform $duration $ease;
    }

    &:hover img {
      transform: scale(1.02);
    }
  }
}
</style>
