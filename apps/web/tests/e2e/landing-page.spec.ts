import { test, expect } from "@playwright/test";

test("should scroll to the demo section when the scroll down button is clicked", async ({
  page,
}) => {
  await page.goto("/");
  await page.click('a[href="#demo"]');
  await page.waitForURL("http://localhost:3000/#demo");
  const demoSection = await page.locator("#demo");
  await expect(demoSection).toBeVisible();
});

test("should snap to the second section when scrolling down", async ({
  page,
}) => {
  await page.goto("/");
  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(1000);
  const demoSection = await page.locator("#demo");
  const boundingBox = await demoSection.boundingBox();
  expect(boundingBox?.y).toBe(0);
});
