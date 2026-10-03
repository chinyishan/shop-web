/** 金額格式：1280 → NT$ 1,280 */
export const formatPrice = (value: number | string | null | undefined) => {
  if (value === null || value === undefined || value === "") return "";
  return `NT$ ${Number(value).toLocaleString("zh-TW")}`;
};
