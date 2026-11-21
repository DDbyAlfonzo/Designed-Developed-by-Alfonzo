const { test, expect, devices } = require("@playwright/test");

test.use({ ...devices["iPhone 13"], defaultBrowserType: undefined });

test("contact form is free text and the page holds still while filling it in", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('#form [type="radio"]')).toHaveCount(0);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await expect(page.locator(".dock")).toHaveClass(/away/);
  const y = await page.evaluate(() => window.scrollY);
  for (const sel of ["#fn", "#em", "#msg", "#fn"]) {
    await page.tap(sel);
    await page.waitForTimeout(300);
    expect(await page.evaluate(() => window.scrollY)).toBe(y);
  }
  await page.fill("#msg", "I need a website for my bakery");
  await expect(page.locator("#msg")).toHaveValue("I need a website for my bakery");
});

test("package buttons start the message for the visitor", async ({ page }) => {
  await page.goto("/");
  await page.click('[data-pkg="Website"]');
  await expect(page.locator("#msg")).toHaveValue(/website project/);
});
