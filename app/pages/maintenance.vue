<template>
  <div class="fixed-view" style="background-color: white">
    <div class="left-triangle"></div>
    <transition name="fade">
      <div class="center" v-if="titleStyle['--title-2-padding-right']">
        <div class="image">
          <img src="@/assets/images/picture/fixed.png" />
        </div>

        <div class="content" :style="titleStyle">
          <div class="title">網站維護中</div>
          <div class="second-title">
            暫不開放
            <div class="logo">
              <img src="/logo.svg" alt="HealthLab 健康實驗室" />
            </div>
            <div class="leaf">
              <img src="@/assets/images/picture/leafLeft.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="right-triangle" style="">
      <div class="item"></div>
    </div>
  </div>
</template>
<script setup>
const { configs } = useAppStore();
const { width } = toRefs(configs);
const titleStyle = reactive({
  "--title-2-padding-right": "",
  "--icon-right": "",
  "--icon-lg-right": "",
});

onMounted(() => {
  // titleStyle["--title-2-padding-right"] = (width.value - 1200) / 3.78 + "px";
  // titleStyle["--icon-right"] = (width.value - 1200) / 3.78 - 110 + "px";

  watch(
    width,
    (newVal) => {
      if (newVal <= 1920) {
        // titleStyle["--title-2-padding-right"] = "180px";
        // titleStyle["--icon-right"] = "90px";
        titleStyle["--title-2-padding-right"] =
          -(1920 - newVal) / 4 + 190 + "px";
        titleStyle["--icon-right"] = -(1920 - newVal) / 4 + 110 + "px";

        if (newVal > 900) {
          titleStyle["--icon-lg-right"] = "-110px";
        } else {
          titleStyle["--icon-lg-right"] = (900 - newVal) / 2 - 120 + "px";
        }
      } else {
        titleStyle["--title-2-padding-right"] = "180px";
        titleStyle["--icon-right"] = "90px";
      }
    },
    { immediate: true }
  );
});
definePageMeta({
  layout: "fixed",
});
</script>
<style lang="scss" scoped>
.fixed-view {
  height: calc(100vh - 93px - 224px);
  overflow: hidden;
  display: flex;
  margin-top: 93px;

  .left-triangle {
    height: 100%;
    width: 196px;
    background: linear-gradient(
      3.02deg,
      $primary -16.22%,
      $primary-200 43.58%,
      $primary-50 86.61%
    );
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      background-color: white;
      clip-path: polygon(80% 0, 100% 0, 100% 100%, 0% 100%);
    }
  }
  .center {
    z-index: 10;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    // width: ;
    width: calc(100% - 420px);
    height: 100%;
    // background-color: red;

    .image {
      max-width: 884px;
      display: flex;
      align-items: center;
      padding-bottom: 40px;
      box-sizing: border-box;
      height: 100%;
      width: 59%;
      max-width: 100%;
      // max-height: 644px;

      img {
        height: auto;
        width: 100%;
        max-width: 550px;
        transform: scale(1.3);
      }

      // height: 100%;
      // width: 100%;
      // max-height: 100%;
      // overflow: hidden;
      // // max-width: 884px;
      // // padding: 90px;

      // // position: relative;
      // img {
      //   // position: absolute;
      //   // top: -162px;
      //   // left: 0;
      //   // max-width: 884px;
      //   // width: 100%;

      //   // height: 644px;
      //   // width: 644px;
      // }
    }
    .content {
      position: relative;
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      width: 41%;
      max-width: 616px;
      height: 100%;
      flex-direction: column;
      font-size: 42px;
      line-height: 42px;
      letter-spacing: 0.12em;
      font-weight: 600;
      // background-color: red;
      color: $primary;

      .title {
        width: 100%;
        box-sizing: border-box;
        padding-left: 60px;
        text-align: left;
        position: relative;
      }
      .second-title {
        position: relative;
        width: 100%;
        padding-right: var(--title-2-padding-right);
        box-sizing: border-box;

        text-align: right;
        margin-top: 50px;
        .leaf {
          position: absolute;
          top: 25px;
          left: 30px;
        }
        .logo {
          top: -182px;
          right: var(--icon-right);
          // top: 155px;
          // right: 72px;

          position: absolute;
          img {
            width: 120px;
          }
        }
      }
    }
    // max-height: 100%;
    // img {
    //   width: 844px;
    //   height: 844px;
    //   object-position: center;
    // }
  }
  .right-triangle {
    display: flex;
    align-items: flex-end;
    margin-left: auto;
    .item {
      background: linear-gradient(
        3.02deg,
        $primary -16.22%,
        $primary-200 43.58%,
        $primary-50 86.61%
      );

      height: 480px;
      opacity: 0.5;
      rotate: -180deg;
      width: 196px;
      &::after {
        content: "asdasdasd";
        display: block;
        width: 100%;
        height: 480px;
        background-color: white;
        clip-path: polygon(100% 0, 100% 100%, 0 100%);
        // clip-path: polygon(100% 100%, 0 100%, 100% 100%);
      }
    }
  }
}
@include lm() {
  .fixed-view {
    .left-triangle {
      display: none;
      // background-color: red;
    }
    .right-triangle {
      display: none;
    }
    .center {
      width: 100%;
      .image {
        width: 400px;
        img {
          width: 100%;
          height: auto;
        }
        // display: none;
      }
      .content {
        width: 310px;
        .second-title {
          .logo {
            right: var(--icon-lg-right);
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .fixed-view {
    padding-top: 90px;
    box-sizing: border-box;
    .center {
      .image {
        display: none;
      }
      .content {
        width: 310px;
        .title {
          text-align: center;
          padding: 0;
        }
        .second-title {
          text-align: center;
          .logo {
            right: 90px;
            top: -210px;
          }
          .leaf {
            left: -20px;
            // right: 70px;
          }
        }
      }
    }
  }
}
</style>
