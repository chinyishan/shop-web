import { expect, test } from "@playwright/test";

const html = (page: import("@playwright/test").Page) => page.locator("html");

test.describe("深色模式", () => {
  test("預設跟隨系統設定", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(html(page)).toHaveClass(/\bdark\b/);
    await context.close();
  });

  test("點擊切換後立即生效，重新整理後仍記得選擇", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(html(page)).not.toHaveClass(/\bdark\b/);

    const toggle = page.locator(".l-header__theme");
    await expect(toggle).toHaveAttribute("aria-label", "切換為深色模式");
    await toggle.click();
    await expect(html(page)).toHaveClass(/\bdark\b/);
    await expect(toggle).toHaveAttribute("aria-label", "切換為淺色模式");

    // 頁面底色真的變了（不只是 class）
    const background = await page.evaluate(() => getComputedStyle(document.querySelector(".l-app")!).backgroundColor);
    expect(background).toBe("rgb(18, 23, 19)");

    await page.reload();
    await expect(html(page)).toHaveClass(/\bdark\b/);

    await page.locator(".l-header__theme").click();
    await expect(html(page)).not.toHaveClass(/\bdark\b/);
  });
});

/** 深色模式下各頁截圖，並確認沒有瀏覽器錯誤 */
const PAGES = [
  ["home", "/"],
  ["brand", "/brands/1"],
  ["products", "/products/1/detail"],
  ["products-popular", "/products/1/detail?category=popular"],
  ["product", "/products/1/product/101"],
  ["article", "/articles/all/1"],
  ["questions", "/contact-us/questions"],
  ["information", "/contact-us/information"],
  ["quiz", "/quiz"],
  ["not-found", "/not-a-real-page"],
] as const;

test.describe("深色模式截圖", () => {
  test.use({ colorScheme: "dark" });

  for (const [name, path] of PAGES) {
    test(`${name}`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));

      await page.goto(path);
      await page.waitForLoadState("networkidle");
      await expect(page).toHaveScreenshot(`dark-${name}.png`, {
        fullPage: true,
        mask: [page.locator(".swiper")],
      });
      expect(errors).toEqual([]);
    });
  }
});
