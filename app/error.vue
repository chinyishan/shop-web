<template>
  <div v-if="isNotFound" class="error">
    <div class="wrap-back">
      <div class="logo">
        <img src="/logo.svg" alt="logo" >
      </div>
      <h2>404 Not Found</h2>
      <div class="back-link">
        <NuxtLink to="/" @click.prevent="backHome">回到首頁 Back Home</NuxtLink>
      </div>
    </div>
  </div>

  <div v-else class="error-container">
    <div class="wrap-error">
      <div class="status">
        <div class="logo">
          <img src="/logo.svg" alt="logo" >
        </div>
        <h2>{{ error.statusCode }}</h2>
      </div>
      <div class="message">
        <strong>喔喔! 內部伺服器發生錯誤，暫時無法使用，造成不便請見諒。</strong>
        <strong>
          Ooops! Internal server error, temporarily unavailable. Sorry for the
          inconvenience caused.
        </strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const isNotFound = computed(() => props.error.statusCode === 404);

useHead({
  title: () => (isNotFound.value ? "找不到頁面" : "系統錯誤"),
  titleTemplate: "%s - HealthLab 健康實驗室",
});

const backHome = () => clearError({ redirect: "/" });
</script>

<style lang="scss" scoped>
.error-container {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  background: $surface;
  display: flex;
  .wrap-error {
    width: min(800px, 93%);
    height: 400px;
    margin: auto;

    .status {
      .logo {
        width: 140px;
        margin: 0 auto;
      }
      h2 {
        font-size: 76px;
        line-height: 80px;
        color: $primary;
        padding: 0 0 20px;
      }
    }
    .message {
      strong {
        display: block;
        text-align: center;
        padding: 10px;
        font-size: 20px;
        font-weight: 400;
        letter-spacing: 2px;
        line-height: 28px;
        color: $text;
      }
    }
  }
}

.error {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  background: $background;
  display: flex;
  .wrap-back {
    width: min(400px, 93%);
    height: 400px;
    margin: auto;

    .logo {
      width: 30%;
      margin: 0 auto;
    }
    h2 {
      font-size: 32px;
      color: $blue-default;
      padding: 0 0 20px;
    }
    .back-link {
      a {
        display: block;
        text-align: center;
        padding: 10px;
        font-size: 22px;
        font-weight: 500;
        letter-spacing: 1px;
        color: $text;

        &:hover {
          color: $text;
        }
      }
    }
  }
}
</style>
