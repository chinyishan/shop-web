import type { ProductInput, SavedProduct } from "#shared/types/shop";

const STORAGE_KEY = "healthlab-wishlist";

export const useWishlistStore = defineStore(
  "wishlist",
  () => {
    /** 收藏商品：保留卡片需要的欄位 */
    const items = ref<SavedProduct[]>([]);

    const count = computed(() => items.value.length);
    const isEmpty = computed(() => items.value.length === 0);

    const has = (id: number | string) => items.value.some((item) => item.id === Number(id));

    const add = (product: ProductInput) => {
      if (has(product.id)) return;
      items.value.unshift(toSavedProduct(product));
    };

    const remove = (id: number | string) => {
      items.value = items.value.filter((item) => item.id !== Number(id));
    };

    /** 回傳切換後是否為已收藏 */
    const toggle = (product: ProductInput) => {
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

    return { items, count, isEmpty, has, add, remove, toggle, clear };
  },
  {
    persist: persistItems<SavedProduct>(STORAGE_KEY),
  },
);
