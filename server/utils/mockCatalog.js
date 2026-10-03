import { mockSeo } from "./mockShared";

const BRAND_DEFS = [
  {
    id: 1,
    name: "森林綠萃 GreenLab",
    logo: "/mock/brand-1.svg",
    description:
      "取材自有機農場的植萃配方，以低溫萃取保留完整活性，打造日常無負擔的純淨保健。",
    story: {
      image: "/mock/editor-material.svg",
      title: "從一片葉子開始的堅持",
      description:
        "我們走訪台灣中南部的有機農場，挑選採收後 24 小時內完成低溫萃取的原葉，\n讓每一份植萃都保留最完整的營養密度。\n從契作、萃取到充填，全程可追溯。",
    },
  },
  {
    id: 2,
    name: "海洋元素 MarineLab",
    logo: "/mock/brand-2.svg",
    description:
      "來自深層海域的珍貴營養，以分子級純化技術去除腥味與重金屬，補給更安心。",
    story: {
      image: "/mock/editor-lab.svg",
      title: "來自深海的純淨補給",
      description:
        "深層海水與野生小型魚種是我們最重要的原料來源。\n通過分子蒸餾與五重純化，去除重金屬與腥味，\n保留 Omega-3 與微量礦物質的完整結構。",
    },
  },
  {
    id: 3,
    name: "日光酵素 SunZyme",
    logo: "/mock/brand-3.svg",
    description:
      "以蔬果自然發酵 180 天，結合專利益生菌株，幫助維持消化道機能與日常代謝。",
    story: {
      image: "/mock/editor-factory.svg",
      title: "180 天的慢發酵",
      description:
        "我們相信好的酵素不能急。\n30 種蔬果在恆溫陶甕中靜置發酵 180 天，\n再與專利益生菌株結合，讓每日的代謝更順暢。",
    },
  },
  {
    id: 4,
    name: "銀采養護 SilverCare",
    logo: "/mock/brand-4.svg",
    description:
      "專為熟齡族群設計的機能配方，關注行動力、視力與循環，好吞好吸收。",
    story: {
      image: "/mock/editor-report.svg",
      title: "為家人多想一步",
      description:
        "熟齡族群的需求不只是營養，更是好入口與好吸收。\n我們調整劑型、降低錠劑尺寸，\n讓每天的保養成為輕鬆的習慣。",
    },
  },
];

const PRODUCT_NAMES = [
  "綜合維他命 B 群緩釋錠",
  "金盞花葉黃素複方膠囊",
  "高濃度魚油 Omega-3 軟膠囊",
  "五株益生菌沖泡粉包",
  "膠原蛋白胜肽粉",
  "薑黃倍效複方膠囊",
  "納豆紅麴膠囊",
  "鈣鎂 D3 咀嚼錠",
  "鐵 + 葉酸滴劑",
  "蔓越莓益生菌粉包",
  "鋅 + B 群發泡錠",
  "精胺酸能量飲",
  "芝麻素晚安膠囊",
  "專利乳酸菌粉包",
  "洛神花代謝飲",
  "人蔘養氣飲",
  "南瓜籽油軟膠囊",
  "蜂王乳軟膠囊",
];

/** 功效分類（對應商品名稱順序） */
const EFFECT_TAGS = [
  { key: "energy", label: "活力補給" },
  { key: "eye", label: "晶亮有神" },
  { key: "circulation", label: "循環代謝" },
  { key: "digestion", label: "消化順暢" },
  { key: "beauty", label: "青春美顏" },
  { key: "joint", label: "關鍵靈活" },
  { key: "sleep", label: "舒眠修復" },
];

/** 適用族群 */
const AUDIENCE_TAGS = [
  { key: "women", label: "女性保健" },
  { key: "men", label: "男性保健" },
  { key: "senior", label: "熟齡銀髮" },
  { key: "worker", label: "上班族" },
  { key: "family", label: "全家適用" },
];

/** 每個商品名稱對應的功效與族群 */
const PRODUCT_TAGS = [
  { effects: ["energy"], audiences: ["worker", "family"] },
  { effects: ["eye"], audiences: ["worker"] },
  { effects: ["circulation"], audiences: ["senior", "men"] },
  { effects: ["digestion"], audiences: ["family"] },
  { effects: ["beauty"], audiences: ["women"] },
  { effects: ["joint", "circulation"], audiences: ["senior"] },
  { effects: ["circulation"], audiences: ["men", "senior"] },
  { effects: ["joint"], audiences: ["senior", "family"] },
  { effects: ["energy"], audiences: ["women"] },
  { effects: ["digestion"], audiences: ["women"] },
  { effects: ["energy"], audiences: ["worker"] },
  { effects: ["energy"], audiences: ["men"] },
  { effects: ["sleep"], audiences: ["worker", "senior"] },
  { effects: ["digestion"], audiences: ["family"] },
  { effects: ["circulation"], audiences: ["women"] },
  { effects: ["energy"], audiences: ["senior"] },
  { effects: ["circulation"], audiences: ["men"] },
  { effects: ["beauty"], audiences: ["women"] },
];

export const mockEffectTags = () => EFFECT_TAGS.map((tag) => ({ ...tag }));
export const mockAudienceTags = () => AUDIENCE_TAGS.map((tag) => ({ ...tag }));

/** 排序選項 */
export const mockSortOptions = () => [
  { key: "recommend", label: "推薦排序" },
  { key: "popular", label: "熱銷優先" },
  { key: "newest", label: "最新上架" },
  { key: "price-asc", label: "價格由低到高" },
  { key: "price-desc", label: "價格由高到低" },
  { key: "rating", label: "評價最高" },
];

const REVIEWERS = [
  { user: "王小美", company: "晨曦設計", career: "視覺設計師" },
  { user: "陳建宏", company: "宏遠科技", career: "軟體工程師" },
  { user: "林雅婷", company: "常青診所", career: "營養師" },
  { user: "張詩涵", company: "自由工作者", career: "瑜伽教練" },
  { user: "李冠霖", company: "藍海物流", career: "業務經理" },
  { user: "吳佩玲", company: "森林幼兒園", career: "幼教老師" },
  { user: "黃柏宇", company: "巨石健身", career: "健身教練" },
  { user: "劉宜芳", company: "日日咖啡", career: "咖啡店主理人" },
  { user: "鄭家豪", company: "長虹建設", career: "專案經理" },
  { user: "許雅琪", company: "新光國小", career: "國小教師" },
  { user: "蔡明翰", company: "群策會計", career: "會計師" },
  { user: "周若萱", company: "自營工作室", career: "插畫家" },
];

const REVIEW_CONTENTS = [
  "吃了大概三個月，最明顯的是早上起床比較有精神，不像以前總要賴床十幾分鐘。包裝是單包裝的很方便，出差時直接丟幾包在行李箱就好。",
  "原本擔心會有腥味或難以入口，實際吃了才發現完全沒有不舒服的味道，家裡長輩也願意每天固定吃，這點對我來說最重要。",
  "客服人員很仔細地說明每天建議的食用時間，還提醒我跟正在吃的藥物間隔開來，感覺得出來是真的在乎消費者，不是只想把商品賣掉。",
  "工作常常需要盯著螢幕超過十小時，下班後眼睛總是很乾澀。持續補充後覺得晚上看東西舒服不少，會繼續回購。",
  "產品有附上完整的檢驗報告，重金屬跟塑化劑都能查到批號對應的數據，這種透明度讓人很放心推薦給朋友。",
  "劑型做得很好吞，不會卡喉嚨，對長輩來說是很大的加分。我媽現在每天早餐後都會自己記得吃，完全不用我提醒。",
];

export const mockBrandList = () => BRAND_DEFS.map((brand) => ({ ...brand }));

export const mockBrandById = (id) =>
  BRAND_DEFS.find((brand) => brand.id === Number(id)) ?? null;

const productDescription = (brand, name) =>
  `${name} 採用 ${brand.name} 嚴選原料，經第三方實驗室逐批檢驗。\n每日建議份量即可補足日常所需，無添加人工香料與防腐劑。\n適合長期忙碌、外食頻率高、想要維持日常保養習慣的你。`;

const productDetailHtml = (brand, name) => `
<h3>${name}</h3>
<p>${brand.description}</p>
<img src="/mock/editor-lab.svg" alt="${name}" />
<h4>產品特色</h4>
<ul>
  <li>嚴選原料，逐批附上第三方檢驗報告</li>
  <li>無添加人工色素、香料與防腐劑</li>
  <li>獨立包裝設計，外出攜帶更方便</li>
</ul>
<h4>食用方式</h4>
<p>每日 1 份，建議於餐後搭配常溫開水食用。孕婦、哺乳中及慢性疾病患者，請先諮詢醫師或營養師。</p>
`;

const productExamineHtml = (name) => `
<h4>${name}・品質檢驗</h4>
<p>本產品每一批次皆送交 TAF 認證實驗室檢驗，項目涵蓋重金屬、塑化劑、微生物與農藥殘留。</p>
<img src="/mock/editor-report.svg" alt="檢驗報告" />
<table>
  <thead><tr><th>檢驗項目</th><th>標準值</th><th>檢驗結果</th></tr></thead>
  <tbody>
    <tr><td>鉛 (Pb)</td><td>≦ 3.0 ppm</td><td>未檢出</td></tr>
    <tr><td>鎘 (Cd)</td><td>≦ 1.0 ppm</td><td>未檢出</td></tr>
    <tr><td>塑化劑 (DEHP)</td><td>≦ 1.5 ppm</td><td>未檢出</td></tr>
    <tr><td>大腸桿菌群</td><td>陰性</td><td>陰性</td></tr>
  </tbody>
</table>
`;

const productFormatHtml = (brand, name) => `
<h4>${name}・商品規格</h4>
<ul>
  <li>品牌：${brand.name}</li>
  <li>內容量：30 份 / 盒</li>
  <li>保存期限：未開封 24 個月</li>
  <li>保存方式：請置於陰涼乾燥處，避免陽光直射</li>
  <li>原產地：台灣</li>
  <li>投保產品責任險：新台幣 2,000 萬元</li>
</ul>
<img src="/mock/editor-material.svg" alt="${name} 規格" />
`;

/** 以品項位置推出固定價格：580 ~ 2180，每 4 項有一項是特價 */
const productPricing = (brandIndex, index) => {
  const base = 580 + (((index * 7 + brandIndex * 3) % 17) * 100);
  const onSale = (index + brandIndex) % 4 === 0;

  return {
    price: onSale ? Math.round((base * 0.85) / 10) * 10 : base,
    origin_price: onSale ? base : null,
  };
};

/** 規格：單盒／三盒／六盒，份量越多單價越低；庫存依位置決定，固定每 9 項有一項缺貨 */
const SPEC_DEFS = [
  { suffix: "單盒 30 份", multiple: 1, discount: 1 },
  { suffix: "三盒組 90 份", multiple: 3, discount: 0.92 },
  { suffix: "六盒組 180 份", multiple: 6, discount: 0.85 },
];

const buildSpecs = (productId, price, originPrice, index) =>
  SPEC_DEFS.map((spec, specIndex) => {
    const unit = Math.round((price * spec.multiple * spec.discount) / 10) * 10;
    const originUnit = originPrice
      ? Math.round((originPrice * spec.multiple) / 10) * 10
      : null;
    // 讓部分規格缺貨、部分低庫存，方便展示狀態
    const seed = (index * 5 + specIndex * 3) % 9;
    const stock = seed === 0 ? 0 : seed <= 2 ? seed + 1 : seed * 6;

    return {
      id: Number(`${productId}${specIndex + 1}`),
      label: spec.suffix,
      price: unit,
      origin_price: originUnit,
      stock,
    };
  });

const buildProducts = () => {
  const products = [];

  BRAND_DEFS.forEach((brand, brandIndex) => {
    PRODUCT_NAMES.forEach((_, index) => {
      const name = PRODUCT_NAMES[(index + brandIndex * 5) % PRODUCT_NAMES.length];
      const id = brand.id * 100 + index + 1;
      const image = `/mock/product-${(index % 10) + 1}.svg`;
      const { price, origin_price } = productPricing(brandIndex, index);
      const specs = buildSpecs(id, price, origin_price, index);
      const nameIndex = (index + brandIndex * 5) % PRODUCT_NAMES.length;
      const tags = PRODUCT_TAGS[nameIndex];

      products.push({
        id,
        name,
        image,
        price,
        origin_price,
        specs,
        stock: specs.reduce((total, spec) => total + spec.stock, 0),
        effects: tags.effects,
        audiences: tags.audiences,
        // 固定數值，讓排序與評價每次重整都一致
        sold_count: ((index * 37 + brandIndex * 11) % 90) * 10 + 40,
        rating: Math.round((4.1 + ((index + brandIndex) % 9) / 10) * 10) / 10,
        review_count: ((index * 13 + brandIndex * 7) % 180) + 12,
        is_new: (index + brandIndex) % 7 === 0,
        vegan: (index + brandIndex) % 3 === 0,
        published_at: 1800 - index * 7 - brandIndex,
        brand: brand.name,
        brand_id: brand.id,
        description: productDescription(brand, name),
        detail: productDetailHtml(brand, name),
        examine: productExamineHtml(name),
        format: productFormatHtml(brand, name),
        images: [image, `/mock/product-${((index + 3) % 10) + 1}.svg`, `/mock/product-${((index + 6) % 10) + 1}.svg`],
      });
    });
  });

  return products;
};

const PRODUCTS = buildProducts();

export const mockProductList = (brandId = null) =>
  brandId === null
    ? PRODUCTS
    : PRODUCTS.filter((product) => product.brand_id === Number(brandId));

export const mockProductById = (id) =>
  PRODUCTS.find((product) => product.id === Number(id)) ?? null;

/** 商品列表卡片用的欄位 */
export const mockProductCard = (product) => ({
  id: product.id,
  name: product.name,
  brand: product.brand,
  brand_id: product.brand_id,
  main_image: product.image,
  price: product.price,
  origin_price: product.origin_price,
  stock: product.stock,
  specs: product.specs,
  effects: product.effects,
  audiences: product.audiences,
  effect_labels: labelsOf(EFFECT_TAGS, product.effects),
  audience_labels: labelsOf(AUDIENCE_TAGS, product.audiences),
  rating: product.rating,
  review_count: product.review_count,
  sold_count: product.sold_count,
  is_new: product.is_new,
  vegan: product.vegan,
});

const labelsOf = (tags, keys = []) =>
  keys.map((key) => tags.find((tag) => tag.key === key)?.label).filter(Boolean);

/** 依條件篩選與排序 */
export const mockFilterProducts = (products, query = {}) => {
  const { effect, audience, min_price, max_price, on_sale, in_stock, sort, keyword } =
    query;

  let result = [...products];

  if (keyword) {
    const word = String(keyword).toLowerCase();
    result = result.filter((item) =>
      `${item.name}${item.brand}`.toLowerCase().includes(word)
    );
  }
  if (effect) {
    const keys = String(effect).split(",").filter(Boolean);
    result = result.filter((item) => item.effects.some((key) => keys.includes(key)));
  }
  if (audience) {
    const keys = String(audience).split(",").filter(Boolean);
    result = result.filter((item) => item.audiences.some((key) => keys.includes(key)));
  }
  if (min_price) result = result.filter((item) => item.price >= Number(min_price));
  if (max_price) result = result.filter((item) => item.price <= Number(max_price));
  if (on_sale === "true" || on_sale === true) {
    result = result.filter((item) => Boolean(item.origin_price));
  }
  if (in_stock === "true" || in_stock === true) {
    result = result.filter((item) => item.stock > 0);
  }

  switch (sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "popular":
      result.sort((a, b) => b.sold_count - a.sold_count);
      break;
    case "newest":
      result.sort((a, b) => b.published_at - a.published_at);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return result;
};

/** 商品單頁完整結構 */
export const mockProductDetail = (product) => ({
  id: product.id,
  brand: product.brand,
  brand_id: product.brand_id,
  attribute_data: {
    product_header: {
      name: product.name,
      brand_id: product.brand_id,
      price: product.price,
      origin_price: product.origin_price,
      specs: product.specs,
      stock: product.stock,
      description: product.description,
      detail: product.detail,
      examine: product.examine,
      format: product.format,
      product_images: product.images,
    },
    carousel_reviews: {
      items: mockReviewList(product.brand_id).slice(0, 6),
    },
    carousel_product: {
      items: mockProductList(product.brand_id)
        .filter((item) => item.id !== product.id)
        .slice(0, 8)
        .map(mockProductCard),
    },
    seo: mockSeo(product.name, product.description.split("\n")[0]),
  },
});

const buildReviews = () => {
  const reviews = [];

  BRAND_DEFS.forEach((brand) => {
    const brandProducts = mockProductList(brand.id);

    REVIEWERS.forEach((reviewer, index) => {
      const product = brandProducts[index % brandProducts.length];

      reviews.push({
        id: brand.id * 1000 + index + 1,
        image: `/mock/avatar-${(index % 6) + 1}.svg`,
        user: reviewer.user,
        user_name: reviewer.user,
        company: reviewer.company,
        career: reviewer.career,
        content: REVIEW_CONTENTS[index % REVIEW_CONTENTS.length],
        product_id: product.id,
        product_name: product.name,
        brand_id: brand.id,
      });
    });
  });

  return reviews;
};

const REVIEWS = buildReviews();

export const mockReviewList = (brandId = null) =>
  brandId === null
    ? REVIEWS
    : REVIEWS.filter((review) => review.brand_id === Number(brandId));

/** 熱銷排行（後台為編輯器內容） */
export const mockPopularHtml = (brandId) => {
  const rows = mockProductList(brandId)
    .slice(0, 10)
    .map(
      (product, index) => `
  <div style="display:flex;align-items:center;gap:24px;padding:16px 0;border-bottom:1px solid #f2f2f2;">
    <span style="font-size:32px;font-weight:700;color:#00469b;width:64px;">${index + 1}</span>
    <img src="${product.image}" alt="${product.name}" style="width:96px;height:96px;object-fit:cover;" />
    <div>
      <p style="font-size:20px;color:#0d0c0c;">${product.name}</p>
      <p style="color:#6f6f6f;margin-top:8px;">${product.brand}</p>
    </div>
  </div>`
    )
    .join("");

  return `<div><h3>本月熱銷排行</h3><p>統計區間：近 30 日官網與門市通路銷售數量。</p>${rows}</div>`;
};
