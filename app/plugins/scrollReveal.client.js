import scrollReveal from "scrollreveal";

export default defineNuxtPlugin((nuxtApp) => {
  let scroll = scrollReveal({
    mobile: true, // 支援行動裝置
    reset: false, // 每次都啟動動畫
    useDelay: "always", // 延遲動畫次數
    easing: "cubic-bezier(0,.31,.32,1.1)", //轉場速率 CSS transition
  });

  return {
    provide: {
      scrollReveal: scroll,
    },
  };
});
