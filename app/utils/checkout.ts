export const FREE_SHIPPING_THRESHOLD = 1000;
export const HOME_SHIPPING_FEE = 80;
export const STORE_SHIPPING_FEE = 60;

export type Delivery = "home" | "store";

/** 運費：超商固定運費；宅配滿額免運；優惠碼可以免運 */
export const calcShipping = (options: {
  subtotal: number;
  isEmpty: boolean;
  delivery: Delivery;
  freeShipping?: boolean;
}) => {
  if (options.isEmpty || options.freeShipping) return 0;
  if (options.delivery === "store") return STORE_SHIPPING_FEE;
  return options.subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : HOME_SHIPPING_FEE;
};

/** 應付金額，最低為 0 */
export const calcTotal = (subtotal: number, discount: number, shipping: number) =>
  Math.max(subtotal - discount + shipping, 0);
