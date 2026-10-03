import type { ProductInput, SavedProduct } from "#shared/types/shop";

/**
 * Pinia 持久化設定：把 store 的 items 以「陣列」存進 localStorage。
 * 沿用改版前的 key 與格式，使用者原本的購物車、收藏不會消失。
 */
export const persistItems = <T>(key: string, normalize: (items: T[]) => T[] = (items) => items) => ({
  key,
  serializer: {
    serialize: (state: { items?: unknown }) => JSON.stringify(state.items),
    deserialize: (raw: string) => {
      const saved = JSON.parse(raw);
      return { items: Array.isArray(saved) ? normalize(saved) : [] };
    },
  },
});

/** 從商品卡、商品頁等不同來源取出要存在本機的欄位 */
export const toSavedProduct = (product: ProductInput) =>
  ({
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
  }) as SavedProduct;
