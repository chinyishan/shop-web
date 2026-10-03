import { defineStore } from "pinia";

const STORAGE_KEY = "healthlab-wishlist";

export const useWishlistStore = defineStore("wishlist", () => {
  /** 收藏商品：保留卡片需要的欄位 */
  const items = ref([]);
  const ready = ref(false);

  const count = computed(() => items.value.length);
  const isEmpty = computed(() => items.value.length === 0);

  const has = (id) => items.value.some((item) => item.id === Number(id));

  const add = (product) => {
    if (has(product.id)) return;

    items.value.unshift({
      id: Number(product.id),
      name: product.name,
      brand: product.brand,
      brand_id: product.brand_id,
      main_image: product.main_image ?? product.image,
      price: product.price,
      origin_price: product.origin_price,
      stock: product.stock,
      specs: product.specs,
      rating: product.rating,
      review_count: product.review_count,
      is_new: product.is_new,
    });
  };

  const remove = (id) => {
    items.value = items.value.filter((item) => item.id !== Number(id));
  };

  /** 回傳切換後是否為已收藏 */
  const toggle = (product) => {
    if (has(product.id)) {
      remove(product.id);
      return false;
    }
    add(product);
    return true;
  };

  const clear = () => {
    items.value = [];
  };

  const hydrate = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(saved)) items.value = saved;
    } catch (error) {
      items.value = [];
    }
    ready.value = true;
  };

  const persist = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value));
    } catch (error) {
      // 無痕模式等情境忽略即可
    }
  };

  return {
    items,
    ready,
    count,
    isEmpty,
    has,
    add,
    remove,
    toggle,
    clear,
    hydrate,
    persist,
  };
});
