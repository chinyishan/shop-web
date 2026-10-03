import { expect, test } from "@playwright/test";

test.skip(({ isMobile }) => isMobile, "結帳流程只在桌機版驗證");

test("加入購物車 → 套用優惠碼 → 送出訂單 → 訂單查詢看得到", async ({ page }) => {
  // 第一個有庫存的規格是「三盒組 90 份」NT$ 1,350，滿千免運
  await page.goto("/products/1/product/101");
  await page.waitForLoadState("networkidle");
  await page.locator(".c-commodity__submit").click();

  await page.goto("/checkout");
  await page.waitForLoadState("networkidle");

  // 沒填資料直接送出會被擋下
  await page.locator(".p-checkout__submit").click();
  await expect(page.getByText("請輸入收件人姓名")).toBeVisible();

  await page.getByPlaceholder("請輸入姓名").fill("王小明");
  await page.getByPlaceholder("09xxxxxxxx").fill("0912345678");
  await page.getByPlaceholder("請輸入 Email").fill("test@example.com");
  await page.getByPlaceholder("例：台北市中正區健康路 1 號 5 樓").fill("台北市中正區健康路 1 號");

  // VIP10：9 折 → 折抵 135
  await page.getByPlaceholder("輸入優惠碼").fill("VIP10");
  await page.locator(".p-checkout__coupon-btn").click();
  await expect(page.locator(".p-checkout__coupon-applied")).toContainText("VIP10");
  await expect(page.locator(".p-checkout__total")).toContainText("NT$ 1,215");

  // 改成超商取貨要加 60 元運費
  await page.getByText("超商取貨").click();
  await expect(page.locator(".p-checkout__total")).toContainText("NT$ 1,275");

  await page.locator(".p-checkout__submit").click();
  await page.waitForURL(/\/checkout\/complete/);

  await page.goto("/orders");
  await page.waitForLoadState("networkidle");
  await expect(page.getByText("綜合維他命 B 群緩釋錠").first()).toBeVisible();
});
