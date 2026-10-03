<template>
  <footer class="l-footer">
    <div class="l-footer__inner">
      <div class="l-footer__top">
        <NuxtLink class="l-footer__brand" to="/">
          <span class="l-footer__logo">
            <img src="/logo.svg" :alt="siteName" :title="siteName" />
          </span>
          <span class="l-footer__brand-text">
            <span class="l-footer__name">{{ siteName }}</span>
            <span class="l-footer__slogan" v-if="header?.slogan">{{ header.slogan }}</span>
          </span>
        </NuxtLink>

        <nav class="l-footer__links" v-if="maintainceMode !== 'true' && footerLink?.length">
          <a
            class="l-footer__link"
            :href="item.url"
            v-for="(item, index) in footerLink"
            :key="index"
            >{{ item.title }}</a
          >
        </nav>
      </div>

      <hr class="c-rule l-footer__rule" />

      <div class="l-footer__bottom" v-if="footerConfig">
        <p class="l-footer__desc">{{ footerConfig.description }}</p>

        <dl class="l-footer__contact">
          <div class="l-footer__contact-row">
            <dt>免付費客服電話</dt>
            <dd>{{ footerConfig.phone }}</dd>
          </div>
          <div class="l-footer__contact-row">
            <dt>服務時間</dt>
            <dd>
              {{ footerConfig.am_start }}~{{ footerConfig.am_end }}、{{
                footerConfig.pm_start
              }}~{{ footerConfig.pm_end }}
              <span class="l-footer__memo">週一至週五（例假日及國定假期休息）</span>
            </dd>
          </div>
        </dl>
      </div>

      <p class="l-footer__copyright">
        © {{ year }} {{ siteName }}. 本站為個人作品，資料皆為模擬內容。
      </p>
    </div>
  </footer>
</template>

<script setup>
import _ from "lodash";

const webStore = useWebStore();
const runtimeConfig = useRuntimeConfig();
const maintainceMode = runtimeConfig.public.maintainceMode;

const header = computed(() =>
  _.get(webStore, "configs.attribute_data.config_header", null)
);
const siteName = computed(() => header.value?.name ?? "HealthLab 健康實驗室");
const footerConfig = computed(() =>
  _.get(webStore, "configs.attribute_data.config_footer", null)
);
const footerLink = computed(() =>
  _.get(webStore, "configs.attribute_data.friendly_link.url", [])
);
const year = new Date().getFullYear();
</script>

<style lang="scss" scoped>
.l-footer {
  background-color: $primary-50;

  &__inner {
    @include container($container-wide);
    padding-top: $space-9;
    padding-bottom: $space-7;

    @include md() {
      padding-top: $space-7;
      padding-bottom: $space-6;
    }
  }

  // ------------------------------------------------------------ 上排
  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: $space-7;

    @include tb() {
      flex-direction: column;
      gap: $space-5;
    }
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: $space-3;
  }

  &__logo {
    display: block;
    width: 48px;

    img {
      width: 100%;
      height: auto;
    }
  }

  &__brand-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__name {
    color: $ink;
    font-size: $fz-body;
    font-weight: 500;
    letter-spacing: $ls-body;
  }

  &__slogan {
    color: $content;
    font-size: $fz-xs;
    letter-spacing: $ls-body;
  }

  &__links {
    display: flex;
    flex-wrap: wrap;
    gap: $space-3 $space-6;
  }

  &__link {
    color: $content;
    font-size: $fz-sm;
    letter-spacing: $ls-body;
    transition: color $duration $ease;

    &:hover {
      color: $primary;
    }
  }

  &__rule {
    margin: $space-6 0;
  }

  // ------------------------------------------------------------ 下排
  &__bottom {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 420px);
    gap: $space-7;

    @include tb() {
      grid-template-columns: 1fr;
      gap: $space-5;
    }
  }

  &__desc {
    max-width: $container-text;
    color: $content;
    font-size: $fz-sm;
    line-height: 1.9;
    letter-spacing: $ls-body;
    white-space: pre-line;
  }

  &__contact {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: $space-5;

    @include sm() {
      grid-template-columns: 1fr;
    }
  }

  &__contact-row {
    dt {
      color: $muted;
      font-size: $fz-xs;
      letter-spacing: $ls-eyebrow;
      text-transform: uppercase;
    }

    dd {
      margin-top: $space-2;
      color: $primary;
      font-size: $fz-body-lg;
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: $ls-body;
    }
  }

  &__memo {
    display: block;
    margin-top: $space-1;
    color: $muted;
    font-size: $fz-xs;
    font-weight: 400;
  }

  &__copyright {
    margin-top: $space-7;
    color: $muted;
    font-size: $fz-xs;
    letter-spacing: $ls-body;

    @include md() {
      margin-top: $space-6;
    }
  }
}
</style>
