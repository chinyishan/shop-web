import type { ProductInput, SavedProduct } from "#shared/types/shop";

const STORAGE_KEY = "healthlab-compare";
const MAX_ITEMS = 4;

export const useCompareStore = defineStore(
  "compare",
  () => {
    /** 比較清單（最多 4 件） */
    const items = ref<SavedProduct[]>([]);

    const count = computed(() => items.value.length);
    const isEmpty = computed(() => items.value.length === 0);
    const isFull = computed(() => items.value.length >= MAX_ITEMS);

    const has = (id: number | string) => items.value.some((item) => item.id === Number(id));

    const add = (product: ProductInput) => {
      if (has(product.id) || isFull.value) return false;

      items.value.push({
        ...toSavedProduct(product),
        effect_labels: product.effect_labels,
        audience_labels: product.audience_labels,
        vegan: product.vegan,
      });
      return true;
    };

    const remove = (id: number | string) => {
      items.value = items.value.filter((item) => item.id !== Number(id));
    };

    /** 回傳切換後的狀態：added / removed / full */
    const toggle = (product: ProductInput) => {
      if (has(product.id)) {
        remove(product.id);
        return "removed";
      }
      if (isFull.value) return "full";
      add(product);
      return "added";
    };

    const clear = () => {
      items.value = [];
    };

    return { items, count, isEmpty, isFull, maxItems: MAX_ITEMS, has, add, remove, toggle, clear };
  },
  {
    persist: persistItems<SavedProduct>(STORAGE_KEY),
  },
);
