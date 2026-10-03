import { expect, test } from "@playwright/test";

/** 每頁截圖與基準比對，並確認瀏覽器端沒有錯誤 */
const PAGES = [
  ["home", "/"],
  ["brand", "/brands/1"],
  ["products", "/products/1/detail"],
  ["product", "/products/1/product/101"],
  ["articles", "/articles/all"],
  ["article", "/articles/all/1"],
  ["quality", "/qualities/1"],
  ["questions", "/contact-us/questions"],
  ["information", "/contact-us/information"],
  ["cart", "/cart"],
  ["compare", "/compare"],
  ["wishlist", "/wishlist"],
  ["search", "/search?keyword=%E9%AD%9A%E6%B2%B9"],
  ["quiz", "/quiz"],
  ["not-found", "/not-a-real-page"],
] as const;

for (const [name, path] of PAGES) {
  test(`${name} 畫面與基準一致且沒有錯誤`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.goto(path);
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      // 輪播會自動切換，內容每次截圖都不同
      mask: [page.locator(".swiper")],
    });

    // 404 頁本身會在 console 留下資源 404 的訊息，不算錯誤
    const relevant = errors.filter((text) => !text.includes("404"));
    expect(relevant, relevant.join("\n")).toEqual([]);
  });
}
