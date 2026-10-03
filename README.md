# HealthLab 健康實驗室

保健食品品牌形象網站，使用 Nuxt 3 開發的**純前端**專案。
網站上所有資料都來自專案內建的 mock data，不需要、也不會連線任何外部後端 API。

node version: v18.17.0 以上

## 開發

```bash
npm install
npm run dev     # http://localhost:1212
```

## 佈署

```bash
npm run build
node .output/server/index.mjs
```

## Mock data 架構

前端頁面維持原本「打 API」的寫法（`useFetch` / `$fetch` 呼叫 `/api/xxx`），
差別在於這些 `/api/xxx` 由 Nuxt 自己的 Nitro server route 直接回傳假資料，
不再轉發給外部後端。因此頁面程式碼不需要為了 mock 而改寫。

```
server/
├── api/          # Nitro server routes，模擬 API 端點（回傳 mock data）
└── utils/        # mock data 資料來源（Nitro 會自動 import）
    ├── mockShared.js    # 共用工具：回應格式、分頁、SEO、Banner
    ├── mockCatalog.js   # 品牌、商品、好評回饋
    ├── mockContent.js   # 文章、Q&A、品質檢驗、聯絡表單分類
    └── mockSite.js      # 全站設定、導覽列、各頁面模組
```

API 回應統一為 `{ success: true, result: ... }`，列表類端點支援 `page` / `per_page` 查詢參數並回傳 `meta` 分頁資訊。

### 要改網站內容時

| 想改什麼 | 改哪個檔案 |
| --- | --- |
| 網站名稱、標語、頁尾、友站連結、SEO | `server/utils/mockSite.js` |
| 首頁輪播、各頁 banner | `server/utils/mockSite.js` 的 `mockPages()` |
| 品牌、商品、好評回饋 | `server/utils/mockCatalog.js` |
| 文章、Q&A、品質檢驗 | `server/utils/mockContent.js` |
| 圖片 | `public/mock/`（用 `/mock/檔名.svg` 引用） |
| 網站 LOGO | `public/logo.svg`（頁首／頁尾／錯誤頁共用） |

### 圖片說明

站上所有圖片都是為這個專案自製的 SVG 向量圖（品牌 LOGO、商品罐、banner、文章封面、使用者頭像等），
放在 `public/mock/`，全部加起來約 200KB。SVG 依各版位的實際尺寸繪製，換圖時請沿用相同長寬比：

| 用途 | 檔名 | 尺寸 |
| --- | --- | --- |
| 首頁主 banner | `banner-home-*.svg` / `-m.svg` | 1440×580 / 375×421 |
| 內頁 banner | `banner-<頁面>.svg` | 1440×320 |
| 品牌頁置頂橫幅 | `streamer.svg` | 1920×98 |
| 首頁底部長條 | `long-banner-*.svg` / `-m.svg` | 1440×160 / 375×64 |
| 品牌 LOGO 卡 | `brand-*.svg` | 532×372 |
| 商品圖 | `product-*.svg` | 600×600 |
| 文章封面 | `article-*.svg` | 800×450 |
| 好評頭像 | `avatar-*.svg` | 320×320 |
| 內文插圖 | `editor-*.svg` | 800×450 |

## 環境變數

| 變數 | 說明 |
| --- | --- |
| `NUXT_ENVIRONMENT` | 環境識別字串 |
| `NUXT_MAINTENANCE_MODE` | 設為 `true` 時全站導向維護頁 |
