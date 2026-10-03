export interface NavItem {
  key: string;
  name: string;
  href: string;
  children: { key: string; name: string; href: string }[];
}

/** 頁首導覽：固定項目 + 由全站設定帶入的品牌、品質檢驗、文章分類 */
export function useNavMenu() {
  const { navbar } = useSiteConfig();

  return computed<NavItem[]>(() => [
    {
      key: "brands",
      name: "系列品牌",
      href: "/brands",
      children: navbar.value.brands.map(({ key, label }) => ({ key: `brands-${key}`, name: label, href: `/brands/${key}` })),
    },
    {
      key: "products",
      name: "商品專區",
      href: "/products",
      children: navbar.value.brands.map(({ key, label }) => ({ key: `products-${key}`, name: label, href: `/products/${key}/detail` })),
    },
    {
      key: "qualities",
      name: "品質檢驗",
      href: "/qualities",
      children: navbar.value.qualities.map(({ key, label }) => ({ key: `qualities-${key}`, name: label, href: `/qualities/${key}` })),
    },
    {
      key: "articles",
      name: "資訊專欄",
      href: "/articles",
      children: [
        { key: "articles-all", name: "全部文章", href: "/articles/all" },
        ...navbar.value.article_categories.map(({ key, label }) => ({ key: `articles-${key}`, name: label, href: `/articles/${key}` })),
      ],
    },
    {
      key: "contact-us",
      name: "聯絡我們",
      href: "/contact-us",
      children: [
        { key: "questions", name: "Q&A專區", href: "/contact-us/questions" },
        { key: "information", name: "聯絡資訊", href: "/contact-us/information" },
      ],
    },
  ]);
}
