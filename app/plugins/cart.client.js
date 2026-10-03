export default defineNuxtPlugin(() => {
  // SSR 時沒有 localStorage，進到瀏覽器才還原並開始保存
  const cart = useCartStore();
  const wishlist = useWishlistStore();
  const orders = useOrderStore();
  const recent = useRecentStore();
  const compare = useCompareStore();

  cart.hydrate();
  wishlist.hydrate();
  orders.hydrate();
  recent.hydrate();
  compare.hydrate();

  watch(() => cart.items, () => cart.persist(), { deep: true });
  watch(() => wishlist.items, () => wishlist.persist(), { deep: true });
  watch(() => orders.items, () => orders.persist(), { deep: true });
  watch(() => recent.items, () => recent.persist(), { deep: true });
  watch(() => compare.items, () => compare.persist(), { deep: true });
});
