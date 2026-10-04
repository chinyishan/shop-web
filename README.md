# HealthLab 健康實驗室

保健食品品牌形象網站，使用 Nuxt 4 開發的**純前端**專案。
網站上所有資料都來自專案內建的 mock data，不需要、也不會連線任何外部後端 API。

Node.js：24 LTS（`^24.11.0`，建議版本記在 `.nvmrc`）。`.npmrc` 開啟了 `engine-strict`，版本不符時 `npm install` 會直接失敗。

## 開發

```bash
npm install
npm run dev     # http://localhost:1212
```

## 檢查與測試

| 指令 | 內容 |
| --- | --- |
| `npm run lint` | ESLint（`@nuxt/eslint`），`lint:fix` 自動修正 |
| `npm run typecheck` | TypeScript 型別檢查（vue-tsc） |
| `npm test` | Vitest 單元測試：`tests/unit` 為純函式，`tests/nuxt` 為需要 Nuxt 環境的 store |
| `npm run test:smoke` | 啟動 build 結果，檢查主要路由的狀態碼與 SSR 內容（需先 `npm run build`） |
| `npm run test:e2e` | Playwright：各頁截圖比對、購物車／結帳／測驗流程（需先 `npm run build`） |

截圖基準放在 `tests/e2e/__screenshots__/`，畫面有刻意調整時用 `npx playwright test --update-snapshots` 更新。
基準是在 Windows 產生的，CI（Linux）以 `--ignore-snapshots` 只驗證流程與瀏覽器錯誤。

## 專案結構

```
app/                 # 前端（Nuxt 4 srcDir）
├── app.vue          # 全站設定在這裡取得一次（useSiteConfig）
├── error.vue        # 404 與其他錯誤共用
├── router.options.ts
├── components/      # 依功能分資料夾，例如 Cart/Drawer.vue → <CartDrawer>
├── composables/     # useSiteConfig、useSeo、useBreadcrumbTitle、useNavMenu…
├── layouts/         # default、fixed（維護頁），共用 AppShell
├── middleware/      # maintenance.global.ts
├── pages/
├── plugins/         # vconsole（只在開發模式載入）
├── stores/          # 購物車、收藏、比較、最近瀏覽、訂單（localStorage 持久化）
└── utils/           # 純函式：金額、運費、分頁、query、驗證
server/              # Nitro：mock API 與 QR Code 轉址
shared/types/        # 前後端共用型別
tests/               # unit、nuxt、smoke、e2e
```

### 資料流原則

- 伺服器資料一律用 `useFetch`／`useAsyncData` 取得，找不到資料時 `throw createError({ statusCode: 404 })`。
- Pinia store 只放使用者在瀏覽器端產生的狀態（購物車、收藏等），不拿來快取 API 資料。
- 麵包屑由路由推導；商品名、文章標題這類最後一層用 `useBreadcrumbTitle()` 提供。
- localStorage 的 key 與格式沿用改版前（`healthlab-cart` 等），使用者資料不會因升級消失。

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
├── routes/       # 非 API 的伺服器路由（QR Code 短網址 302 轉址）
└── utils/        # mock data 資料來源（Nitro 會自動 import）
    ├── mockShared.ts    # 共用工具：回應格式、分頁、SEO、Banner
    ├── mockCatalog.ts   # 品牌、商品、好評回饋
    ├── mockContent.ts   # 文章、Q&A、品質檢驗、聯絡表單分類
    └── mockSite.ts      # 全站設定、導覽列、各頁面模組
```

API 回應統一為 `{ success: true, result: ... }`，列表類端點支援 `page` / `per_page` 查詢參數並回傳 `meta` 分頁資訊。

### 要改網站內容時

| 想改什麼 | 改哪個檔案 |
| --- | --- |
| 網站名稱、標語、頁尾、友站連結、SEO | `server/utils/mockSite.ts` |
| 首頁輪播、各頁 banner | `server/utils/mockSite.ts` 的 `mockPages()` |
| 品牌、商品、好評回饋 | `server/utils/mockCatalog.ts` |
| 文章、Q&A、品質檢驗 | `server/utils/mockContent.ts` |
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
| `NUXT_PUBLIC_MAINTENANCE_MODE` | 設為 `true` 時全站導向維護頁（執行期即可切換，不需重新 build） |
