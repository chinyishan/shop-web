import { expect, test } from "@playwright/test";

test.skip(({ isMobile }) => isMobile, "購物車流程只在桌機版驗證");

test("加入購物車後重新整理，品項仍然存在", async ({ page }) => {
  await page.goto("/products/1/product/101");
  await page.waitForLoadState("networkidle");

  await page.locator(".c-commodity__submit").click();
  await expect(page.locator(".l-header__cart-badge").last()).toHaveText("1");

  await page.reload();
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".l-header__cart-badge").last()).toHaveText("1");

  await page.goto("/cart");
  await expect(page.getByText("綜合維他命 B 群緩釋錠").first()).toBeVisible();

  // 沿用原本的 localStorage key，升級前加入的購物車不會消失
  const saved = await page.evaluate(() => localStorage.getItem("healthlab-cart"));
  expect(JSON.parse(saved ?? "[]")).toHaveLength(1);
});

test("升級前格式的購物車資料可以正常讀取", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    localStorage.setItem(
      "healthlab-cart",
      JSON.stringify([
        { id: 102, spec_id: null, name: "金盞花葉黃素複方膠囊", brand: "森林綠萃 GreenLab", brand_id: 1, image: "/mock/product-2.svg", price: 1280, qty: 2, stock: 10 },
      ]),
    );
  });

  await page.goto("/cart");
  await page.waitForLoadState("networkidle");
  await expect(page.getByText("金盞花葉黃素複方膠囊").first()).toBeVisible();
  await expect(page.locator(".l-header__cart-badge").last()).toHaveText("2");
});
