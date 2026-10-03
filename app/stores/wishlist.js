
const STORAGE_KEY = "healthlab-wishlist";

export const useWishlistStore = defineStore("wishlist", () => {
  /** 收藏商品：保留卡片需要的欄位 */
  const items = ref([]);

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



  return {
    items,
    count,
    isEmpty,
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
