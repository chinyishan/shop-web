<template>
  <div class="error">
    <div class="wrap-back">
      <div class="logo">
        <img src="/logo.svg" alt="logo" />
      </div>
      <h2>404 Not Found</h2>
      <div class="back-link">
        <nuxt-link to="/">回到首頁 Back Home</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "error",
});

const route = useRoute();
const event = useRequestEvent();
setResponseStatus(event, 404);
</script>

<style lang="scss" scoped>
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
