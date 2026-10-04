/**
 * 品牌由 HealthLab 更名為好日補給 VITADAY，localStorage key 也一併更名。
 * 在 store 讀取資料前，把舊 key 的資料搬到新 key（新 key 已有資料時不覆蓋）。
 */
const RENAMED_KEYS = ["cart", "compare", "orders", "recent", "wishlist", "color-mode"];

export default defineNuxtPlugin({
  name: "migrate-storage",
  enforce: "pre",
  setup() {
    try {
      for (const name of RENAMED_KEYS) {
        const oldKey = `healthlab-${name}`;
        const newKey = `vitaday-${name}`;
        const saved = localStorage.getItem(oldKey);
        if (saved === null) continue;

        if (localStorage.getItem(newKey) === null) localStorage.setItem(newKey, saved);
        localStorage.removeItem(oldKey);
      }
    } catch {
      // 無痕模式等無法使用 localStorage 的情境，略過即可
    }
  },
});
