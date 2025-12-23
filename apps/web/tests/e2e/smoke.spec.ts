import { test, expect } from "@playwright/test";

test("landing page has hero title", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "réseau social d’entreprise",
  );
});
