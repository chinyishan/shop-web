import { mockSeo, mockBanner } from "./mockShared";

const ARTICLE_CATEGORIES = [
  { key: 1, label: "保健新知" },
  { key: 2, label: "產品快訊" },
  { key: 3, label: "活動公告" },
];

const ARTICLE_DEFS = [
  {
    title: "維他命 B 群什麼時候吃最有感？營養師解析三個關鍵時機",
    subtitle:
      "B 群是水溶性維生素，攝取時間會影響吸收效率。營養師整理出三個常見情境，幫你把補充時機調整得更剛好。",
  },
  {
    title: "長時間看螢幕，眼睛的疲勞從哪裡來？",
    subtitle:
      "從眨眼次數到藍光曝露，眼睛疲勞的成因比想像中複雜。了解原因後，日常保養才有方向。",
  },
  {
    title: "益生菌怎麼挑？看懂菌株編號與菌數標示",
    subtitle:
      "同樣是乳酸菌，不同菌株的作用大不相同。學會看懂標示，就能挑到真正適合自己的產品。",
  },
  {
    title: "魚油的濃度迷思：EPA 與 DHA 該怎麼分配？",
    subtitle: "高濃度不等於適合你，關鍵在於 EPA 與 DHA 的比例與每日實際攝取量。",
  },
  {
    title: "熟齡族的鈣質補充指南",
    subtitle:
      "隨著年齡增加，鈣質的吸收效率會下降。搭配維生素 D3 與適度負重運動，才能事半功倍。",
  },
  {
    title: "外食族的營養缺口，通常少了哪些？",
    subtitle: "膳食纖維、鎂與 Omega-3 是外食族最常見的三大缺口，從一餐開始補起。",
  },
  {
    title: "夏季限定新品上市：洛神花代謝飲",
    subtitle: "以台東有機洛神花為基底，酸甜好入口，冰鎮後風味更佳。即日起於官網同步開賣。",
  },
  {
    title: "膠原蛋白吃了真的有用嗎？先看分子量",
    subtitle: "分子量大小決定吸收率，搭配維生素 C 一起攝取效果更完整。",
  },
  {
    title: "睡不好的夜晚，芝麻素能幫上什麼忙？",
    subtitle: "從日常作息到營養補充，建立屬於自己的睡前儀式感。",
  },
  {
    title: "全系列產品檢驗報告公開查詢上線",
    subtitle: "輸入產品批號即可查看該批次的完整檢驗資料，資訊透明是我們的基本要求。",
  },
  {
    title: "週年慶活動開跑：滿額贈限量保溫瓶",
    subtitle: "活動期間單筆消費滿額即贈限量聯名保溫瓶，數量有限送完為止。",
  },
  {
    title: "運動後的黃金補給時間，你抓對了嗎？",
    subtitle: "運動後 30 分鐘內補充蛋白質與電解質，有助於維持體力與日常運動表現。",
  },
  {
    title: "鐵質補充的常見誤區",
    subtitle: "咖啡、茶與鈣片都可能影響鐵質吸收，間隔時間是關鍵。",
  },
  {
    title: "門市據點新增：台中西屯體驗櫃位開幕",
    subtitle: "即日起可於台中西屯門市體驗全系列產品，並提供一對一營養諮詢服務。",
  },
  {
    title: "保健食品可以一起吃嗎？搭配原則一次看",
    subtitle: "脂溶性與水溶性營養素的搭配方式不同，掌握原則就不容易吃錯。",
  },
  {
    title: "從產地到瓶裝：一顆膠囊的 180 天",
    subtitle: "帶你走一趟原料產地與生產線，看看一顆膠囊如何誕生。",
  },
  {
    title: "換季過敏季，日常保養可以做什麼？",
    subtitle: "從環境清潔到營養補充，減少換季時的身體負擔。",
  },
  {
    title: "官網會員制度改版公告",
    subtitle: "新制度自下月一日起上路，累積消費金額與點數兌換方式同步調整。",
  },
];

const articleHtml = (title, subtitle) => `
<p><strong>${subtitle}</strong></p>
<img src="/mock/editor-lab.svg" alt="${title}" />
<p>現代人的生活節奏快速，三餐時間不固定、外食比例偏高，讓日常營養的攝取變得比想像中更容易失衡。當我們談論保健食品時，最重要的其實不是「吃了什麼」，而是「為什麼要吃」以及「怎麼吃才對」。</p>
<h3>先了解自己的需求</h3>
<p>在挑選任何營養補充品之前，建議先回頭檢視自己的飲食型態：一週外食幾次？蔬果攝取是否足夠？睡眠品質如何？這些問題的答案，往往比產品標示上的成分表更能決定你真正需要什麼。</p>
<img src="/mock/editor-report.svg" alt="日常保養" />
<h3>建立可以持續的習慣</h3>
<p>再好的配方，若無法持續攝取也難以看見變化。把補充的時間固定在每天的同一個情境，例如早餐後或睡前刷牙前，讓它自然成為生活的一部分。</p>
<blockquote>本文內容僅供參考，不代表醫療建議。若您有特殊疾病或正在服用藥物，請先諮詢醫師或營養師。</blockquote>
`;

const ARTICLES = ARTICLE_DEFS.map((article, index) => {
  const category = ARTICLE_CATEGORIES[index % ARTICLE_CATEGORIES.length];
  const day = String((index % 28) + 1).padStart(2, "0");
  const month = String((index % 12) + 1).padStart(2, "0");

  return {
    id: index + 1,
    title: article.title,
    subtitle: article.subtitle,
    image: `/mock/article-${(index % 6) + 1}.svg`,
    published_at: `2026-${month}-${day}`,
    category,
    content: articleHtml(article.title, article.subtitle),
  };
});

export const mockArticleCategories = () =>
  ARTICLE_CATEGORIES.map((category) => ({ ...category }));

export const mockArticleList = (categoryId = null) =>
  categoryId === null || categoryId === "" || categoryId === "all"
    ? ARTICLES
    : ARTICLES.filter((article) => article.category.key === Number(categoryId));

export const mockArticleById = (id) =>
  ARTICLES.find((article) => article.id === Number(id)) ?? null;

/** 文章列表卡片 */
export const mockArticleCard = (article) => ({
  id: article.id,
  title: article.title,
  subtitle: article.subtitle,
  image: article.image,
  published_at: article.published_at,
  categories: [{ id: article.category.key, name: article.category.label }],
});

/** 文章單頁 */
export const mockArticleDetail = (article) => ({
  id: article.id,
  published_at: article.published_at,
  categories: [{ id: article.category.key, name: article.category.label }],
  attribute_data: {
    article_header: { title: article.title, sub_title: article.subtitle },
    editor: { content: article.content },
    carousel: { items: [mockBanner("/mock/banner-news.svg", "/mock/banner-news.svg", article.title)] },
    seo: mockSeo(article.title, article.subtitle),
  },
});

/** 上一篇／下一篇 */
export const mockArticleNavigation = (article, categoryId = null) => {
  const list = mockArticleList(categoryId);
  const index = list.findIndex((item) => item.id === article.id);
  const brief = (item) =>
    item
      ? {
          id: item.id,
          attribute_data: { article_header: { title: item.title } },
        }
      : null;

  return {
    prev: brief(list[index - 1]),
    next: brief(list[index + 1]),
  };
};

const QUESTION_CATEGORIES = [
  { key: 1, label: "商品相關" },
  { key: 2, label: "訂購與配送" },
  { key: 3, label: "會員服務" },
];

const QUESTION_DEFS = {
  1: [
    ["保健食品可以和藥物一起吃嗎？", "建議與藥物間隔至少一小時以上。若您正在服用慢性處方藥，請先諮詢醫師或藥師後再開始補充。"],
    ["產品開封後要怎麼保存？", "請於開封後將瓶蓋確實旋緊，置於陰涼乾燥處避免陽光直射，並於三個月內食用完畢。"],
    ["孕婦或哺乳中可以吃嗎？", "多數產品為一般食品，但孕期與哺乳期的營養需求較為特殊，建議先與您的婦產科醫師確認。"],
    ["兒童可以食用嗎？", "12 歲以下兒童建議依照包裝標示的兒童份量，或先諮詢小兒科醫師與營養師。"],
    ["吃多久才會有感覺？", "營養補充屬於日常保養，多數使用者反映約在持續食用 1～3 個月後較能感受到差異。"],
    ["產品含有過敏原嗎？", "各項產品的過敏原資訊皆完整標示於外包裝與商品頁面，購買前請務必確認。"],
    ["素食者可以食用嗎？", "膠囊類產品部分使用植物膠囊，商品頁面均標示素食適用類型，請依標示選購。"],
    ["可以同時吃多種產品嗎？", "可以，但建議分開時段食用，並注意脂溶性維生素不要過量攝取。"],
    ["產品有做重金屬檢驗嗎？", "每一批次皆送交 TAF 認證實驗室檢驗，檢驗報告可於官網依批號查詢。"],
    ["保存期限怎麼看？", "外盒下方印有西元年月日的有效日期，未開封狀態下保存期限為 24 個月。"],
    ["吃了之後覺得不舒服怎麼辦？", "請立即停止食用並保留剩餘產品，同時聯繫客服人員協助處理。"],
    ["產品有投保產品責任險嗎？", "全系列產品皆投保新台幣 2,000 萬元產品責任險。"],
  ],
  2: [
    ["訂單成立後多久會出貨？", "平日下午三點前完成付款的訂單，將於當日安排出貨，例假日順延至下一個工作日。"],
    ["運費怎麼計算？", "單筆訂單滿新台幣 1,000 元即享免運，未達門檻酌收 80 元物流處理費。"],
    ["可以指定配送時間嗎？", "可於結帳頁面選擇上午、下午或不指定，實際配送時間仍以物流業者安排為準。"],
    ["支援哪些付款方式？", "目前提供信用卡一次付清、ATM 轉帳、超商代碼繳費與貨到付款。"],
    ["可以開立統一發票嗎？", "可以，結帳時填寫統一編號與抬頭即可開立三聯式電子發票。"],
    ["訂單成立後可以修改嗎？", "尚未出貨的訂單可聯繫客服協助修改，已出貨的訂單則需走退換貨流程。"],
    ["商品什麼時候會補貨？", "補貨時間依原料到貨狀況而定，可於商品頁面訂閱到貨通知。"],
    ["可以寄送到超商嗎？", "支援全台四大超商取貨，單筆訂單重量上限為 5 公斤。"],
    ["可以寄送到海外嗎？", "目前僅提供台灣本島與離島配送服務，海外訂單請來信洽詢。"],
    ["收到商品發現破損怎麼辦？", "請於收件後七日內拍照並聯繫客服，我們將安排換貨或退款。"],
    ["鑑賞期有幾天？", "依消費者保護法規定提供七天鑑賞期，鑑賞期非試用期，退貨商品須為未拆封狀態。"],
    ["退款需要多久？", "退貨商品驗收無誤後，信用卡約 7～14 個工作天退回，轉帳約 3～5 個工作天。"],
  ],
  3: [
    ["如何成為會員？", "於官網右上角點選註冊，填寫基本資料並完成信箱驗證即可成為會員。"],
    ["忘記密碼怎麼辦？", "請於登入頁面點選忘記密碼，系統將發送重設連結至您註冊的電子信箱。"],
    ["點數怎麼累積？", "消費金額每 100 元累積 1 點，點數可於下次結帳時折抵。"],
    ["點數有期限嗎？", "點數自取得日起算，有效期間為兩年，逾期將自動失效。"],
    ["會員等級如何計算？", "依照近一年累積消費金額區分為一般、銀卡與金卡會員，享有不同的折扣與生日禮。"],
    ["可以修改註冊的信箱嗎？", "可於會員中心的個人資料頁面自行修改，修改後需重新完成信箱驗證。"],
    ["如何查詢歷史訂單？", "登入後於會員中心的訂單查詢頁面，可查看近三年的訂單與物流狀態。"],
    ["電子報要怎麼取消訂閱？", "每封電子報下方皆有取消訂閱連結，或於會員中心關閉訂閱設定。"],
    ["如何刪除帳號？", "請來信客服信箱提出申請，我們會在確認身分後於七個工作天內完成刪除。"],
    ["生日禮怎麼領取？", "生日當月登入會員中心即可領取專屬優惠券，使用期限為當月月底。"],
    ["個人資料會被如何使用？", "我們僅在提供服務所需的範圍內使用您的個人資料，並依隱私權政策妥善保管。"],
    ["可以綁定第三方帳號登入嗎？", "目前支援 Google 與 Line 快速登入，綁定後仍可使用原密碼登入。"],
  ],
};

const QUESTIONS = QUESTION_CATEGORIES.flatMap((category) =>
  QUESTION_DEFS[category.key].map(([title, answer], index) => ({
    id: category.key * 100 + index + 1,
    category_id: category.key,
    question_header: { title },
    editor: {
      content: `<p>${answer}</p><p>若仍有疑問，歡迎透過聯絡資訊頁面留言，客服人員將於三個工作天內回覆。</p>`,
    },
  }))
);

export const mockQuestionCategories = () =>
  QUESTION_CATEGORIES.map((category) => ({ ...category }));

export const mockQuestionList = (categoryId = null) =>
  categoryId === null || categoryId === ""
    ? QUESTIONS
    : QUESTIONS.filter((question) => question.category_id === Number(categoryId));

export const mockQuestionById = (id) =>
  QUESTIONS.find((question) => question.id === Number(id)) ?? null;

const QUALITY_DEFS = [
  {
    key: 1,
    label: "原料把關",
    banner: "/mock/banner-quality.svg",
    content: `
<p>每一項原料在進廠前，都必須通過供應商資格審查與到貨檢驗兩道關卡。我們要求所有供應商提供原產地證明、規格書與最新一期的檢驗報告，缺一不可。</p>
<img src="/mock/editor-material.svg" alt="原料把關" />
<h3>供應商稽核</h3>
<p>每年至少一次實地稽核，確認其品質管理系統、倉儲環境與追溯機制符合我們的要求。合作超過三年的供應商佔比達八成以上。</p>
<h3>到貨檢驗</h3>
<p>原料到貨後逐批抽樣，檢驗項目包含外觀、水分、重金屬與微生物，確認合格後才會入庫。</p>`,
  },
  {
    key: 2,
    label: "製程管理",
    banner: "/mock/banner-quality.svg",
    content: `
<p>所有產品皆於通過 ISO 22000 與 HACCP 雙認證的工廠生產，從投料、混合、充填到包裝，全程於十萬級無塵作業區完成。</p>
<img src="/mock/editor-factory.svg" alt="製程管理" />
<h3>批號追溯</h3>
<p>每一批產品都有獨立批號，可回溯至原料供應商、生產日期與作業人員，發生任何異常都能在最短時間內釐清原因。</p>
<h3>環境監控</h3>
<p>作業區的溫濕度與落菌數每日紀錄，定期由第三方單位進行環境檢測。</p>`,
  },
  {
    key: 3,
    label: "檢驗報告",
    banner: "/mock/banner-quality.svg",
    content: `
<p>成品出貨前，每批皆送交 TAF 認證實驗室進行檢驗，項目涵蓋重金屬、塑化劑、農藥殘留與微生物，全數合格才會放行。</p>
<img src="/mock/editor-report.svg" alt="檢驗報告" />
<table>
  <thead><tr><th>檢驗項目</th><th>檢驗方法</th><th>結果</th></tr></thead>
  <tbody>
    <tr><td>重金屬（鉛、鎘、汞、砷）</td><td>ICP-MS</td><td>符合規定</td></tr>
    <tr><td>塑化劑（8 項）</td><td>LC-MS/MS</td><td>未檢出</td></tr>
    <tr><td>農藥殘留（380 項）</td><td>GC-MS/MS</td><td>未檢出</td></tr>
    <tr><td>微生物（生菌數、大腸桿菌群）</td><td>食品微生物檢驗法</td><td>符合規定</td></tr>
  </tbody>
</table>
<p>如需查詢特定批號的檢驗報告，歡迎透過聯絡資訊頁面與我們聯繫。</p>`,
  },
];

export const mockQualityCategories = () =>
  QUALITY_DEFS.map(({ key, label }) => ({ key, label }));

export const mockQualityById = (id) => {
  const quality = QUALITY_DEFS.find((item) => item.key === Number(id));
  if (!quality) return null;

  return {
    id: quality.key,
    modules: {
      quality_header: { name: quality.label },
      editor: { content: quality.content },
    },
    page_modules: {
      carousel: { items: [mockBanner(quality.banner, quality.banner, quality.label)] },
    },
    seo: mockSeo(quality.label, `${quality.label}｜HealthLab 健康實驗室的品質承諾`),
  };
};

const CONTACT_CATEGORIES = [
  { key: 1, label: "商品諮詢" },
  { key: 2, label: "訂單與物流" },
  { key: 3, label: "合作提案" },
  { key: 4, label: "客訴與建議" },
  { key: 5, label: "其他" },
];

export const mockContactCategories = () =>
  CONTACT_CATEGORIES.map((category) => ({ ...category }));
