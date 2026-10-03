// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    // 元件名稱沿用資料夾結構（例如 Cart/Drawer → <CartDrawer>），不強制多字
    "vue/multi-word-component-names": "off",
  },
});
