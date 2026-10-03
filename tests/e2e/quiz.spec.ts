import { expect, test } from "@playwright/test";

test.skip(({ isMobile }) => isMobile, "測驗流程只在桌機版驗證");

test("回答四題後顯示推薦，並可全部加入購物車", async ({ page }) => {
  await page.goto("/quiz");
  await page.waitForLoadState("networkidle");

  for (let step = 1; step <= 4; step++) {
    await expect(page.locator(".p-quiz__step")).toContainText(`${step} / 4`);
    await page.locator(".p-quiz__option").first().click();
  }

  await expect(page.locator(".p-quiz__summary")).toBeVisible();
  await page.waitForLoadState("networkidle");
  await expect(page).toHaveScreenshot("quiz-result.png", { fullPage: true });

  const count = await page.locator(".p-quiz__grid > li").count();
  if (count) {
    await page.getByRole("button", { name: "推薦商品全部加入購物車" }).click();
    await expect(page.locator(".l-header__cart-badge").last()).toHaveText(String(count));
    // 加入後會打開側邊購物車，點遮罩關閉
    await page.locator(".c-drawer__overlay").click({ position: { x: 20, y: 300 } });
  }

  await page.getByRole("button", { name: "重新測驗" }).click();
  await expect(page.locator(".p-quiz__step")).toContainText("1 / 4");
});
