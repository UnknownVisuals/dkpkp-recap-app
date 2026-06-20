import { test, expect } from "@playwright/test";
import { loginAs, pickToday, selectRadixOption, switchToTab, ADMIN_EMAIL, STAFF_EMAIL, TS } from "./helpers";

test.describe("Edge Cases", () => {
  test("Submit SPB with zero nominal", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, ADMIN_EMAIL);
    await page.goto("/spb");

    await page.locator("#noSpb").fill(`SPB-ZERO-${TS}`);
    await pickToday(page);
    await page.locator("#nominal").fill("0");
    await page.locator("#terbilang").fill("Nol Rupiah");
    await page.locator("#kepada").fill("Vendor Nol");
    await page.locator("#untukPembayaran").fill("Pembayaran Nol");
    await page.locator("#kegiatan").fill("Kegiatan Nol");
    await page.locator("#subKegiatan").fill("1.01.01.0005");
    await selectRadixOption(page, "kodeRekening", " - ");

    await page.getByRole("button", { name: /Simpan/ }).click();
    await page.waitForTimeout(1000);

    await switchToTab(page, "recap");
    const zeroRow = page.locator("table tbody tr").filter({ hasText: `SPB-ZERO-${TS}` });
    await expect(zeroRow).toBeVisible({ timeout: 5000 });
    await expect(zeroRow.locator("td").nth(4)).toContainText("Rp 0");
  });

  test("Submit SPB with very large nominal", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, ADMIN_EMAIL);
    await page.goto("/spb");

    await page.locator("#noSpb").fill(`SPB-LARGE-${TS}`);
    await pickToday(page);
    await page.locator("#nominal").fill("999999999999999");
    await page.locator("#terbilang").fill("Sangat Besar");
    await page.locator("#kepada").fill("Vendor Besar");
    await page.locator("#untukPembayaran").fill("Pembayaran Besar");
    await page.locator("#kegiatan").fill("Kegiatan Besar");
    await page.locator("#subKegiatan").fill("1.01.01.0006");
    await selectRadixOption(page, "kodeRekening", " - ");

    await page.getByRole("button", { name: /Simpan/ }).click();
    await page.waitForTimeout(1000);

    await switchToTab(page, "recap");
    const largeRow = page.locator("table tbody tr").filter({ hasText: `SPB-LARGE-${TS}` });
    await expect(largeRow).toBeVisible({ timeout: 5000 });
    await expect(largeRow.locator("td").nth(4)).toContainText("Rp");
  });

  test("Submit SPJ with special characters in text fields", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, STAFF_EMAIL);
    await page.goto("/spj");

    await selectRadixOption(page, "relatedSpb", "SPB-POS-");
    await page.locator("#noSpj").fill(`SPJ-SPECIAL-${TS}`);
    await pickToday(page);
    await page.locator("#realisasi").fill("1000000");
    await page.locator("#namaPenerima").fill("O'Brien & Co. <test@email.com>");
    await page.locator("#keterangan").fill("Special chars: !@#$%^&*()_+{}|:\"<>?");

    await page.getByRole("button", { name: /Simpan/ }).click();
    await page.waitForTimeout(1000);

    await expect(page.locator('[role="dialog"]')).not.toBeVisible({ timeout: 3000 });

    await switchToTab(page, "recap");
    const specialRow = page.locator("table tbody tr").filter({ hasText: `SPJ-SPECIAL-${TS}` });
    await expect(specialRow).toBeVisible({ timeout: 5000 });
  });

  test("Save button disables while loading to prevent double-submit", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, ADMIN_EMAIL);
    await page.goto("/spb");

    await page.locator("#noSpb").fill(`SPB-DBL-${TS}`);
    await pickToday(page);
    await page.locator("#nominal").fill("1000000");
    await page.locator("#terbilang").fill("Satu Juta");
    await page.locator("#kepada").fill("Vendor DBL");
    await page.locator("#untukPembayaran").fill("Test DBL");
    await page.locator("#kegiatan").fill("Kegiatan DBL");
    await page.locator("#subKegiatan").fill("1.01.01.0007");
    await selectRadixOption(page, "kodeRekening", " - ");

    const saveBtn = page.getByRole("button", { name: /Simpan/ });
    await saveBtn.click();

    await expect(saveBtn).toBeDisabled({ timeout: 3000 });
    await page.waitForTimeout(500);
    await expect(saveBtn).toBeEnabled({ timeout: 10000 });
  });

  test("Approve button shows spinner and disables during processing", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, ADMIN_EMAIL);
    await page.goto("/spb");

    await switchToTab(page, "recap");

    const spbRow = page.locator("table tbody tr").filter({ hasText: "SPB-POS-" });
    await expect(spbRow.first()).toBeVisible({ timeout: 5000 });

    const approveBtn = spbRow.first().locator('[title="Setujui"]');
    await expect(approveBtn).toBeVisible();
    await approveBtn.click();

    const anyActionBtn = spbRow.first().locator('button[disabled]');
    await expect(anyActionBtn.first()).toBeVisible({ timeout: 5000 });
  });
});
