
const STORAGE_KEY = "healthlab-cart";
const MAX_QTY = 99;

/** 同商品不同規格視為不同品項 */
const makeKey = (productId, specId) => `${productId}-${specId ?? 0}`;

export const useCartStore = defineStore("cart", () => {
  /** 購物車品項：{ key, id, spec_id, spec_label, name, brand, brand_id, image, price, qty, stock } */
  const items = ref([]);
  const drawerOpen = ref(false);

  const count = computed(() =>
    items.value.reduce((total, item) => total + item.qty, 0)
  );
  const subtotal = computed(() =>
    items.value.reduce((total, item) => total + item.price * item.qty, 0)
  );
  const isEmpty = computed(() => items.value.length === 0);

  const find = (key) => items.value.find((item) => item.key === key);

  /** 取得某商品／規格已在購物車內的數量 */
  const qtyOf = (productId, specId) => find(makeKey(productId, specId))?.qty ?? 0;

  /**
   * 加入購物車
   * @param {Object} product 商品（需要 id / name / brand / image / price）
   * @param {Object} options { spec, qty }
   */
  const add = (product, { spec = null, qty = 1 } = {}) => {
    const key = makeKey(product.id, spec?.id);
    const stock = spec?.stock ?? product.stock ?? MAX_QTY;
    const limit = Math.min(stock, MAX_QTY);
    const exist = find(key);

    if (exist) {
      exist.qty = Math.min(exist.qty + qty, limit);
      return exist;
    }

    const item = {
      key,
      id: Number(product.id),
      spec_id: spec?.id ?? null,
      spec_label: spec?.label ?? null,
      name: product.name,
      brand: product.brand,
      brand_id: product.brand_id,
      image: product.image ?? product.main_image,
      price: Number(spec?.price ?? product.price) || 0,
      qty: Math.min(qty, limit),
      stock: limit,
    };
    items.value.push(item);
    return item;
  };

  const setQty = (key, qty) => {
    const item = find(key);
    if (!item) return;

    const limit = Math.min(item.stock ?? MAX_QTY, MAX_QTY);
    item.qty = Math.min(Math.max(Number(qty) || 1, 1), limit);
  };

  const increase = (key) => {
    const item = find(key);
    if (item) setQty(key, item.qty + 1);
  };

  const decrease = (key) => {
    const item = find(key);
    if (item) setQty(key, item.qty - 1);
  };

  const remove = (key) => {
    items.value = items.value.filter((item) => item.key !== key);
  };

  const clear = () => {
    items.value = [];
  };

  /** 側邊購物車 */
  const openDrawer = () => {
    drawerOpen.value = true;
  };
  const closeDrawer = () => {
    drawerOpen.value = false;
  };



  return {
    items,
    drawerOpen,
    count,
    subtotal,
    isEmpty,
    qtyOf,
    add,
    setQty,
    increase,
    decrease,
    remove,
    clear,
    openDrawer,
    closeDrawer,
  };
},
{
  persist: persistItems(STORAGE_KEY, (items) =>
    // 舊格式（沒有 key）也能相容
    items.map((item) => ({ ...item, key: item.key ?? makeKey(item.id, item.spec_id) }))
  ),
});
