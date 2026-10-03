import { mockBanner, mockSeo } from "./mockShared";
import {
  mockBrandList,
  mockBrandById,
  mockProductList,
  mockProductCard,
  mockReviewList,
} from "./mockCatalog";
import {
  mockArticleList,
  mockArticleCategories,
  mockQualityCategories,
} from "./mockContent";

export const SITE_NAME = "HealthLab 健康實驗室";
export const SITE_SLOGAN = "用科學守護每日健康";

/** 全站設定（頁首、頁尾、友站連結、SEO） */
export const mockWebConfig = () => ({
  attribute_data: {
    config_header: {
      name: SITE_NAME,
      slogan: SITE_SLOGAN,
      logo: null,
    },
    config_footer: {
      description: `${SITE_NAME}\n以科學實證為基礎，提供每日所需的營養補給。\n所有產品皆通過第三方實驗室檢驗。`,
      phone: "0800-000-168",
      am_start: "09:00",
      am_end: "12:00",
      pm_start: "13:30",
      pm_end: "18:00",
    },
    friendly_link: {
      url: [
        { title: "品牌故事", url: "/brands/1" },
        { title: "商品專區", url: "/products/1/detail" },
        { title: "品質檢驗", url: "/qualities/1" },
        { title: "資訊專欄", url: "/articles/all" },
        { title: "Q&A 專區", url: "/contact-us/questions" },
        { title: "聯絡我們", url: "/contact-us/information" },
        { title: "訂單查詢", url: "/orders" },
        { title: "收藏清單", url: "/wishlist" },
        { title: "保健需求測驗", url: "/quiz" },
      ],
    },
    seo: mockSeo(SITE_NAME, `${SITE_NAME}｜${SITE_SLOGAN}。嚴選原料、透明檢驗的日常保健品牌。`),
  },
});

/** 導覽列資料來源 */
export const mockNavbar = () => ({
  brands: mockBrandList().map((brand) => ({ key: brand.id, label: brand.name })),
  qualities: mockQualityCategories(),
  article_categories: mockArticleCategories(),
});

const pageBanner = (image, alt) => ({
  items: [mockBanner(image, image, alt)],
});

/** 各頁面的模組設定（首頁輪播、各頁 banner、SEO） */
export const mockPages = () => ({
  "page-index": {
    attribute_data: {
      carousel: {
        items: [
          mockBanner("/mock/banner-home-1.svg", "/mock/banner-home-1-m.svg", `${SITE_NAME}｜${SITE_SLOGAN}`),
          mockBanner("/mock/banner-home-2.svg", "/mock/banner-home-2-m.svg", "全系列產品檢驗報告公開查詢"),
          mockBanner("/mock/banner-home-3.svg", "/mock/banner-home-3-m.svg", "四大系列品牌"),
        ],
      },
      intro: {
        eyebrow: "Our promise",
        title: "把實驗室的嚴謹，放進每天的日常",
        description:
          "從原料產地、配方設計到成品檢驗，每一個環節都有營養師與第三方實驗室把關。\n我們相信保健不需要複雜的承諾，只需要可以被驗證的每一步。",
        features: [
          { title: "專利原料", description: "與國際原料廠合作，取得專利授權與完整規格書。" },
          { title: "逐批檢驗", description: "每批成品送交 TAF 認證實驗室，報告依批號公開查詢。" },
          { title: "營養師配方", description: "由具執照的營養師團隊設計劑量與搭配方式。" },
          { title: "無多餘添加", description: "不添加人工色素、香料與防腐劑，成分表看得懂。" },
        ],
      },
      featured_products: {
        more: true,
        // 每個品牌各挑兩款，位置錯開讓品項不重複
        items: mockBrandList()
          .flatMap((brand, brandIndex) => {
            const products = mockProductList(brand.id);
            return [products[brandIndex], products[brandIndex + 8]];
          })
          .filter(Boolean)
          .map(mockProductCard),
      },
      carousel_article: {
        more: true,
        items: mockArticleList()
          .slice(0, 6)
          .map((article) => ({
            id: article.id,
            title: article.title,
            sub_title: article.subtitle,
            main_image: article.image,
            category: article.category.label,
          })),
      },
      carousel_reviews: {
        more: true,
        items: mockReviewList().slice(0, 8),
      },
      cooperation: {
        image: "/mock/cooperation.svg",
        title: "與專業團隊一起，把每一份營養做到位",
        description:
          "我們與營養師、食品科學研究團隊以及通過雙認證的代工廠密切合作，\n從配方設計、原料選擇到成品檢驗，每一個環節都有專業把關。\n如果你也想一起打造好的保健產品，歡迎與我們聯繫。",
      },
      carousel_small: {
        items: [
          { image: "/mock/long-banner-1.svg", image_m: "/mock/long-banner-1-m.svg" },
          { image: "/mock/long-banner-2.svg", image_m: "/mock/long-banner-2-m.svg" },
        ],
      },
      seo: mockSeo(SITE_NAME, `${SITE_NAME}｜${SITE_SLOGAN}`),
    },
  },
  "page-brands": {
    attribute_data: {
      carousel: pageBanner("/mock/banner-brands.svg", "系列品牌"),
      seo: mockSeo("系列品牌", "四大系列品牌，對應不同生活情境的營養需求。"),
    },
  },
  "page-products": {
    attribute_data: {
      carousel: pageBanner("/mock/banner-products.svg", "商品專區"),
      seo: mockSeo("商品專區", "全系列保健產品，逐批檢驗、資訊透明。"),
    },
  },
  "page-quality": {
    attribute_data: {
      carousel: pageBanner("/mock/banner-quality.svg", "品質檢驗"),
      seo: mockSeo("品質檢驗", "從原料把關到成品檢驗，公開每一份報告。"),
    },
  },
  "page-information": {
    attribute_data: {
      carousel: pageBanner("/mock/banner-news.svg", "資訊專欄"),
      seo: mockSeo("資訊專欄", "保健新知、產品快訊與活動公告。"),
    },
  },
  "page-question": {
    attribute_data: {
      carousel: pageBanner("/mock/banner-faq.svg", "Q&A 專區"),
      seo: mockSeo("Q&A 專區", "商品、訂購與會員服務的常見問題整理。"),
    },
  },
  "page-contact_us": {
    attribute_data: {
      carousel: pageBanner("/mock/banner-contact.svg", "聯絡資訊"),
      seo: mockSeo("聯絡資訊", "有任何問題，歡迎留言與我們聯繫。"),
    },
  },
});

/** 首頁的系列品牌區塊 */
export const mockBrandCards = () =>
  mockBrandList().map((brand) => ({
    id: brand.id,
    name: brand.name,
    logo: brand.logo,
    description: brand.description,
    products: mockProductList(brand.id)
      .slice(0, 4)
      .map((product) => ({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        origin_price: product.origin_price,
      })),
  }));

/** 單一品牌頁（/brands/:id） */
export const mockBrandPage = (id) => {
  const brand = mockBrandById(id);
  if (!brand) return null;

  return {
    id: brand.id,
    modules: {
      streamer: { image: "/mock/streamer.svg", alt: brand.name },
      carousel: pageBanner("/mock/banner-brands.svg", brand.name),
      products_list: {
        more: true,
        items: mockProductList(brand.id).slice(0, 8).map(mockProductCard),
      },
      carousel_reviews: {
        more: true,
        items: mockReviewList(brand.id).slice(0, 6),
      },
      seo: mockSeo(brand.name, brand.description),
    },
    brand_story: brand.story,
  };
};

/** 商品專區頁（/products/:brandId/detail） */
export const mockProductPage = (brandId) => {
  const brand = mockBrandById(brandId);
  if (!brand) return null;

  return {
    id: brand.id,
    modules: {
      carousel: pageBanner("/mock/banner-products.svg", `${brand.name} 商品專區`),
      seo: mockSeo(`${brand.name} 商品專區`, brand.description),
    },
  };
};
