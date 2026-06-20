import { test, expect } from "@playwright/test";
import { loginAs, pickToday, selectRadixOption, ADMIN_EMAIL, STAFF_EMAIL, TS } from "./helpers";

test.describe("Negative Cases", () => {
  test("Empty SPB form shows validation errors", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, ADMIN_EMAIL);
    await page.goto("/spb");

    await page.getByRole("button", { name: /Simpan/ }).click();
    await page.waitForTimeout(500);

    const errorMessages = page.locator("text=tidak boleh kosong");
    const count = await errorMessages.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test("Empty SPJ form shows validation errors", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, STAFF_EMAIL);
    await page.goto("/spj");

    await page.getByRole("button", { name: /Simpan/ }).click();
    await page.waitForTimeout(500);

    const errorMessages = page.locator("text=tidak boleh kosong");
    const count = await errorMessages.count();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test("Staff blocked by SALDO_TIDAK_CUKUP", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, STAFF_EMAIL);
    await page.goto("/spj");

    await selectRadixOption(page, "relatedSpb", "SPB-POS-");
    await page.locator("#noSpj").fill(`SPJ-BLOCK-${TS}`);
    await pickToday(page);
    await page.locator("#realisasi").fill("999999999999");
    await page.locator("#namaPenerima").fill("Blocker Tester");
    await page.locator("#keterangan").fill("Testing the blocker logic");

    await page.getByRole("button", { name: /Simpan/ }).click();
    await page.waitForTimeout(1000);

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible({ timeout: 5000 });
    await expect(dialog.getByText(/tidak mencukupi/i)).toBeVisible();
  });

  test("Staff is redirected away from /spd", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, STAFF_EMAIL);
    await page.goto("/spd");
    await page.waitForURL("**/", { timeout: 10000 });
    expect(page.url()).not.toContain("/spd");
  });

  test("Duplicate SPB number shows error", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, ADMIN_EMAIL);
    await page.goto("/spb");

    const dupNo = `SPB-DUP-${TS}`;

    await page.locator("#noSpb").fill(dupNo);
    await pickToday(page);
    await page.locator("#nominal").fill("1000000");
    await page.locator("#terbilang").fill("Satu Juta Rupiah");
    await page.locator("#kepada").fill("Vendor Duplikat");
    await page.locator("#untukPembayaran").fill("Test duplikat");
    await page.locator("#kegiatan").fill("Kegiatan Duplikat");
    await page.locator("#subKegiatan").fill("1.01.01.0003");
    await selectRadixOption(page, "kodeRekening", " - ");
    await page.getByRole("button", { name: /Simpan/ }).click();
    await page.waitForTimeout(1000);

    await page.locator("#noSpb").fill(dupNo);
    await pickToday(page);
    await page.locator("#nominal").fill("2000000");
    await page.locator("#terbilang").fill("Dua Juta Rupiah");
    await page.locator("#kepada").fill("Vendor Duplikat Lagi");
    await page.locator("#untukPembayaran").fill("Test duplikat lagi");
    await page.locator("#kegiatan").fill("Kegiatan Duplikat Lagi");
    await page.locator("#subKegiatan").fill("1.01.01.0004");
    await selectRadixOption(page, "kodeRekening", " - ");

    const alertPromise = page.waitForEvent("dialog");
    await page.getByRole("button", { name: /Simpan/ }).click();
    const alertDialog = await alertPromise;
    expect(alertDialog.message()).toContain("Gagal menyimpan SPB");
    await alertDialog.dismiss();
  });
});
