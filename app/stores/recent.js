
const STORAGE_KEY = "healthlab-recent";
const MAX_ITEMS = 8;

export const useRecentStore = defineStore("recent", () => {
  /** 最近瀏覽過的商品（卡片欄位） */
  const items = ref([]);

  const add = (product) => {
    if (!product?.id) return;

    const id = Number(product.id);
    items.value = [
      {
        id,
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
      },
      ...items.value.filter((item) => item.id !== id),
    ].slice(0, MAX_ITEMS);
  };

  /** 排除目前瀏覽中的商品 */
  const exclude = (id) => items.value.filter((item) => item.id !== Number(id));

  const clear = () => {
    items.value = [];
  };



  return { items, add, exclude, clear };
},
{
  persist: persistItems(STORAGE_KEY),
});
