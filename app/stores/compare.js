
const STORAGE_KEY = "healthlab-compare";
const MAX_ITEMS = 4;

export const useCompareStore = defineStore("compare", () => {
  /** 比較清單（最多 4 件） */
  const items = ref([]);

  const count = computed(() => items.value.length);
  const isEmpty = computed(() => items.value.length === 0);
  const isFull = computed(() => items.value.length >= MAX_ITEMS);

  const has = (id) => items.value.some((item) => item.id === Number(id));

  const add = (product) => {
    if (has(product.id) || isFull.value) return false;

    items.value.push({
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
      effect_labels: product.effect_labels,
      audience_labels: product.audience_labels,
      is_new: product.is_new,
      vegan: product.vegan,
    });
    return true;
  };

  const remove = (id) => {
    items.value = items.value.filter((item) => item.id !== Number(id));
  };

  /** 回傳切換後的狀態：added / removed / full */
  const toggle = (product) => {
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



  return {
    items,
    count,
    isEmpty,
    isFull,
    maxItems: MAX_ITEMS,
    has,
    add,
    remove,
    toggle,
    clear,
  };
},
{
  persist: persistItems(STORAGE_KEY),
});
