import { type Page } from "@playwright/test";

export const STAFF_EMAIL = "staff@test.com";
export const ADMIN_EMAIL = "admin@test.com";
export const PASSWORD = "password123";
export const TS = String(Date.now());

export async function loginAs(page: Page, email: string) {
  await page.goto("/login");
  await page.locator("#email").fill(email);
  await page.locator("#password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await page.waitForURL("/", { timeout: 15000 });
}

export async function pickToday(page: Page) {
  await page.getByRole("button", { name: /Pilih tanggal/i }).click();
  await page.locator('[data-slot="calendar"] button:not([disabled])').first().click();
  await page.waitForTimeout(300);
}

export async function selectRadixOption(page: Page, triggerId: string, optionText: string) {
  await page.locator(`#${triggerId}`).click();
  await page.locator('[data-slot="select-item"]').filter({ hasText: optionText }).first().click();
  await page.waitForTimeout(200);
}

export async function switchToTab(page: Page, tabName: string) {
  await page.getByRole("tab", { name: new RegExp(tabName, "i") }).click();
  await page.waitForTimeout(500);
}
