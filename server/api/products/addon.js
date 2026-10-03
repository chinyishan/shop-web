export default defineEventHandler((event) => {
  const query = getQuery(event);
  const excludeIds = String(query.ids ?? "")
    .split(",")
    .filter(Boolean)
    .map(Number);

  const all = mockProductList();
  const inCart = all.filter((product) => excludeIds.includes(product.id));

  // 以購物車商品的功效與品牌找相似品項
  const effects = new Set(inCart.flatMap((product) => product.effects));
  const brands = new Set(inCart.map((product) => product.brand_id));

  const score = (product) => {
    let value = 0;
    if (product.effects.some((key) => effects.has(key))) value += 2;
    if (brands.has(product.brand_id)) value += 1;
    return value;
  };

  const candidates = all
    .filter((product) => !excludeIds.includes(product.id) && product.stock > 0)
    .map((product) => ({ product, score: score(product) }))
    .sort((a, b) => b.score - a.score || b.product.sold_count - a.product.sold_count)
    .slice(0, Number(query.limit ?? 3))
    .map(({ product }) => ({
      ...mockProductCard(product),
      // 加購價：原價 85 折
      addon_price: Math.round((product.price * 0.85) / 10) * 10,
    }));

  return mockOk({ data: candidates });
});
