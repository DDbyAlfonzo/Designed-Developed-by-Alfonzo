const { test, expect } = require("@playwright/test");

const animationsOff = `
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
`;

const boxesOverlap = (a, b) =>
  a.x < b.x + b.width &&
  a.x + a.width > b.x &&
  a.y < b.y + b.height &&
  a.y + a.height > b.y;

test.describe("homepage hero smoke test", () => {
  test("desktop hero keeps both phone mockups visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 1024 });
    await page.goto("/");
    await page.addStyleTag({ content: animationsOff });

    await expect(page.locator(".hero")).toBeVisible();
    await expect(page.locator(".hero-phone-shell")).toHaveCount(2);
    await expect(page.locator(".hero-phone-shell").first()).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("DDbyAlfonzo");
  });

  test("mobile hero note and scroll cue do not overlap", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.addStyleTag({ content: animationsOff });

    const note = page.locator(".hero-note");
    const scrollIndicator = page.locator(".scroll-indicator");

    await expect(note).toBeVisible();
    await expect(scrollIndicator).toBeVisible();

    const noteBox = await note.boundingBox();
    const scrollBox = await scrollIndicator.boundingBox();

    expect(noteBox).not.toBeNull();
    expect(scrollBox).not.toBeNull();
    expect(boxesOverlap(noteBox, scrollBox)).toBe(false);
    expect(scrollBox.y).toBeGreaterThanOrEqual(noteBox.y + noteBox.height - 1);
  });
});
