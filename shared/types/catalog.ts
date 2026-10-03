import type { Option } from "./api";

export type Tag = Option<string>;

export interface BrandDef {
  id: number;
  name: string;
  logo: string;
  description: string;
  story: { image: string; title: string; description: string };
}

export interface ProductSpec {
  id: number;
  label: string;
  price: number;
  origin_price: number | null;
  stock: number;
}

/** mock 資料庫裡的完整商品 */
export interface Product {
  id: number;
  name: string;
  image: string;
  images: string[];
  price: number;
  origin_price: number | null;
  specs: ProductSpec[];
  stock: number;
  effects: string[];
  audiences: string[];
  sold_count: number;
  rating: number;
  review_count: number;
  is_new: boolean;
  vegan: boolean;
  published_at: number;
  brand: string;
  brand_id: number;
  description: string;
  detail: string;
  examine: string;
  format: string;
}

/** 商品列表卡片 */
export interface ProductCard
  extends Pick<
    Product,
    | "id"
    | "name"
    | "brand"
    | "brand_id"
    | "price"
    | "origin_price"
    | "stock"
    | "specs"
    | "effects"
    | "audiences"
    | "rating"
    | "review_count"
    | "sold_count"
    | "is_new"
    | "vegan"
  > {
  main_image: string;
  effect_labels: string[];
  audience_labels: string[];
}

export interface Review {
  id: number;
  image: string;
  user: string;
  user_name: string;
  company: string;
  career: string;
  content: string;
  product_id: number;
  product_name: string;
  brand_id: number;
}

/** 商品篩選、排序與分頁的 query */
export interface ProductQuery {
  effect?: string;
  audience?: string;
  min_price?: string | number;
  max_price?: string | number;
  on_sale?: string | boolean;
  in_stock?: string | boolean;
  sort?: string;
  keyword?: string;
  page?: string | number;
  per_page?: string | number;
}
