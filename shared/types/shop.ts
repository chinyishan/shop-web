import type { ProductSpec } from "./catalog";

/** 收藏、比較、最近瀏覽存在本機的商品快照 */
export interface SavedProduct {
  id: number;
  name: string;
  brand: string;
  brand_id: number;
  main_image: string;
  price: number;
  origin_price: number | null;
  stock: number;
  specs?: ProductSpec[];
  rating?: number;
  review_count?: number;
  is_new?: boolean;
  vegan?: boolean;
  effect_labels?: string[];
  audience_labels?: string[];
}

/** 加入清單時可接受的商品資料（商品卡、商品頁、推薦結果的欄位略有不同） */
export type ProductInput = Partial<Omit<SavedProduct, "id">> & {
  id: number | string;
  image?: string;
};

export interface CartItem {
  /** 商品 + 規格的唯一值 */
  key: string;
  id: number;
  spec_id: number | string | null;
  spec_label: string | null;
  name: string;
  brand: string;
  brand_id: number;
  image: string;
  price: number;
  qty: number;
  stock: number;
}

export interface CartProductInput {
  id: number | string;
  name: string;
  brand: string;
  brand_id: number;
  image?: string;
  main_image?: string;
  price: number;
  stock?: number;
}

export interface CartSpecInput {
  id: number | string;
  label?: string | null;
  price?: number;
  stock?: number;
}

export interface Order {
  order_no: string;
  [key: string]: unknown;
}
