export default defineEventHandler((event) => {
  const query = getQuery(event);
  const effect = String(query.effect ?? "");
  const audience = String(query.audience ?? "");
  const budget = String(query.budget ?? "");
  const vegan = query.vegan === "true" || query.vegan === true;

  const budgetRange = {
    low: [0, 1000],
    mid: [1000, 2500],
    high: [2500, Infinity],
  }[budget] ?? [0, Infinity];

  const scored = mockProductList()
    .filter((product) => product.stock > 0)
    .map((product) => {
      const reasons = [];
      let score = 0;

      if (effect && product.effects.includes(effect)) {
        score += 4;
        reasons.push("符合你想改善的方向");
      }
      if (audience && product.audiences.includes(audience)) {
        score += 3;
        reasons.push("適合你的族群");
      }
      if (product.price >= budgetRange[0] && product.price <= budgetRange[1]) {
        score += 2;
        reasons.push("落在你的預算範圍");
      }
      if (vegan && product.vegan) {
        score += 2;
        reasons.push("素食可食");
      }
      if (product.rating >= 4.6) {
        score += 1;
        reasons.push(`使用者評分 ${product.rating}`);
      }

      return { product, score, reasons };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.product.rating - a.product.rating)
    .slice(0, 4);

  return mockOk({
    data: scored.map(({ product, reasons }) => ({
      ...mockProductCard(product),
      reasons: reasons.slice(0, 3),
    })),
  });
});
