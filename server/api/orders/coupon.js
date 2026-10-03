/** 示範用優惠碼 */
const COUPONS = [
  {
    code: "HEALTH100",
    label: "新朋友折 100",
    type: "fixed",
    value: 100,
    min_amount: 1000,
    note: "單筆滿 NT$ 1,000 可用",
  },
  {
    code: "VIP10",
    label: "會員 9 折",
    type: "percent",
    value: 10,
    max_discount: 500,
    min_amount: 0,
    note: "最高折抵 NT$ 500",
  },
  {
    code: "FREESHIP",
    label: "免運費",
    type: "shipping",
    value: 0,
    min_amount: 0,
    note: "免除本筆訂單運費",
  },
];

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const code = String(query.code ?? "").trim().toUpperCase();
  const subtotal = Number(query.subtotal ?? 0);

  const coupon = COUPONS.find((item) => item.code === code);

  if (!coupon) {
    return { success: false, message: "優惠碼不存在，請確認後再試一次", result: null };
  }

  if (subtotal < coupon.min_amount) {
    return {
      success: false,
      message: `此優惠碼需消費滿 NT$ ${coupon.min_amount.toLocaleString("zh-TW")}`,
      result: null,
    };
  }

  let discount = 0;
  if (coupon.type === "fixed") discount = coupon.value;
  if (coupon.type === "percent") {
    discount = Math.min(
      Math.round((subtotal * coupon.value) / 100),
      coupon.max_discount ?? Infinity
    );
  }

  return mockOk({
    code: coupon.code,
    label: coupon.label,
    type: coupon.type,
    discount: Math.min(discount, subtotal),
    free_shipping: coupon.type === "shipping",
    note: coupon.note,
  });
});
