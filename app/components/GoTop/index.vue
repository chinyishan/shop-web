<template>
  <div class="go-container">
    <div class="go-row">
      <a class="go-col" id="top" href="#" @click.prevent="scrollToTop">
        <svgo-arrow-up></svgo-arrow-up>
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  footer: {
    type: Object,
  },
});

const changeWhatsapp = computed(() => {
  if (props.footer !== null) {
    return props.footer?.whatsapp.match(/[0-9]/g).join("");
  } else {
    return null;
  }
});

const scrollToTop = () => {
  let top = document.documentElement.scrollTop;
  const timeTop = setInterval(() => {
    document.documentElement.scrollTop = top -= 50;
    if (top <= 0) {
      clearInterval(timeTop);
    }
  }, 5);
};
</script>

<style lang="scss" scoped>
.go-container {
  position: fixed;
  bottom: 96px;
  right: 40px;
  z-index: 20;
  .go-row {
    width: 100%;
    .go-col {
      width: 64px;
      height: 64px;
      padding: 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $white;
      border-radius: 15px;
      border: 1px solid $gray-100;
      svg {
        color: $muted;
        width: 32px;
        height: 32px;
      }
      &:hover {
        background-color: $primary-100;
      }
      &:active {
        background-color: $primary;
        svg {
          color: $white;
        }
      }
    }
  }
}
@include md() {
  .go-container {
    right: 12px;
    .go-row {
      .go-col {
        background-color: $white;
        width: 36px;
        height: 36px;
        padding: 8px;
        border-radius: 4px;
        &:hover {
          background-color: $white;
        }
        &:active {
          background-color: $primary;
          svg {
            color: $white;
          }
        }
      }
    }
  }
}
</style>
