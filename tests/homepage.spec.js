const { test, expect } = require("@playwright/test");

test.describe("homepage smoke test", () => {
  test("intro headline and work button show", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await expect(page.locator(".intro__headline")).toContainText("Great products");
    await expect(page.locator("#introWork")).toBeVisible();
  });

  test("no horizontal scroll on phones", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test("contact form posts to Formspree", async ({ page }) => {
    await page.goto("/");
    const src = await page.content();
    expect(src).toContain("formspree.io/f/mqewzllv");
  });
});
