const { test, expect } = require("@playwright/test");

test.describe("homepage smoke test", () => {
  test("hero promise and both calls to action show", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("design & build");
    await expect(page.locator(".hero-ctas .btn")).toBeVisible();
    await expect(page.locator(".hero-ctas .ghost")).toBeVisible();
  });

  test("case study opens from its own link and closes with Escape", async ({ page }) => {
    await page.goto("/#case-fnb");
    await expect(page.locator("#drawer")).toHaveClass(/on/);
    await page.keyboard.press("Escape");
    await expect(page.locator("#drawer")).not.toHaveClass(/on/);
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
    expect(await page.content()).toContain("formspree.io/f/mqewzllv");
  });
});
