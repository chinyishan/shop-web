import type { ApiResponse, Option } from "./api";

export interface SeoMeta {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
}

export interface SiteHeader {
  name: string;
  slogan: string;
  logo: string | null;
}

export interface SiteFooter {
  description: string;
  phone: string;
  am_start: string;
  am_end: string;
  pm_start: string;
  pm_end: string;
  [key: string]: unknown;
}

export interface FriendlyLink {
  title: string;
  url: string;
}

export interface SiteAttributes {
  config_header: SiteHeader;
  config_footer: SiteFooter;
  friendly_link: { url: FriendlyLink[] };
  seo: SeoMeta;
}

export interface Navbar {
  brands: Option<number>[];
  qualities: Option<number>[];
  article_categories: Option<number>[];
}

/** 各頁面的後台設定（banner、SEO 與頁面模組） */
export type PageKey =
  | "page-index"
  | "page-brands"
  | "page-products"
  | "page-quality"
  | "page-information"
  | "page-question"
  | "page-contact_us";

export interface PageConfig {
  attribute_data: {
    seo?: SeoMeta;
    // 各頁模組結構不同（輪播、精選商品…），由頁面自行取用
    [module: string]: any;
  };
}

export type SystemConfigResponse = [
  ApiResponse<{ attribute_data: SiteAttributes }>,
  ApiResponse<Navbar>,
  ApiResponse<Record<PageKey, PageConfig>>,
];

export interface SiteConfig extends SiteAttributes {
  navbar: Navbar;
  pages: Record<PageKey, PageConfig>;
}
