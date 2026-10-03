/** 金額格式：1280 → NT$ 1,280 */
export const formatPrice = (value: number | string | null | undefined) => {
  if (value === null || value === undefined || value === "") return "";
  return `NT$ ${Number(value).toLocaleString("zh-TW")}`;
};

/** 定期購 9 折，四捨五入到十位數 */
export const subscribePrice = (price: number) => Math.round((price * 0.9) / 10) * 10;
