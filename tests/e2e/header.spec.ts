import { expect, test } from "@playwright/test";

test("手機版漢堡選單展開後可以看到分類", async ({ page, isMobile }) => {
  test.skip(!isMobile, "只有手機版有漢堡選單");

  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.locator(".l-header__burger").click();
  await page.getByRole("button", { name: "系列品牌" }).click();

  await expect(page.getByRole("link", { name: "森林綠萃 GreenLab" }).first()).toBeVisible();
  await expect(page).toHaveScreenshot("mobile-menu.png", { mask: [page.locator(".swiper")] });

  // 換頁後選單自動收合
  await page.getByRole("link", { name: "森林綠萃 GreenLab" }).first().click();
  await page.waitForURL("**/brands/1");
  await expect(page.locator(".l-header--is-open")).toHaveCount(0);
});

test("桌機版下拉選單與搜尋", async ({ page, isMobile }) => {
  test.skip(isMobile, "桌機版才有下拉選單");

  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "商品專區" }).click();
  await expect(page).toHaveScreenshot("desktop-dropdown.png", {
    clip: { x: 0, y: 0, width: 1440, height: 420 },
    mask: [page.locator(".swiper")],
  });

  await page.locator(".l-header__search-btn").click();
  await page.locator(".l-header__search-input").fill("魚油");
  await page.locator(".l-header__search-input").press("Enter");
  await page.waitForURL(/\/search\?search=/);
  await expect(page.locator(".c-breadcrumb")).toContainText("搜尋內容：魚油");
});
