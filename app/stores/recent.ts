import type { ProductInput, SavedProduct } from "#shared/types/shop";

const STORAGE_KEY = "vitaday-recent";
const MAX_ITEMS = 8;

export const useRecentStore = defineStore(
  "recent",
  () => {
    /** 最近瀏覽過的商品（卡片欄位） */
    const items = ref<SavedProduct[]>([]);

    const add = (product: ProductInput | null | undefined) => {
      if (!product?.id) return;

      const saved = toSavedProduct(product);
      items.value = [saved, ...items.value.filter((item) => item.id !== saved.id)].slice(0, MAX_ITEMS);
    };

    /** 排除目前瀏覽中的商品 */
    const exclude = (id: number | string | undefined) => items.value.filter((item) => item.id !== Number(id));

    const clear = () => {
      items.value = [];
    };

    return { items, add, exclude, clear };
  },
  {
    persist: persistItems<SavedProduct>(STORAGE_KEY),
  },
);
