import { test, expect } from "@playwright/test";
import { loginAs, pickToday, selectRadixOption, switchToTab, ADMIN_EMAIL, STAFF_EMAIL, TS } from "./helpers";

test.describe("Positive Cases", () => {
  test("Admin creates SPB successfully", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, ADMIN_EMAIL);
    await page.goto("/spb");

    await page.locator("#noSpb").fill(`SPB-POS-${TS}`);
    await pickToday(page);
    await page.locator("#nominal").fill("50000000");
    await page.locator("#terbilang").fill("Lima Puluh Juta Rupiah");
    await page.locator("#kepada").fill("PT Vendor Positif");
    await page.locator("#untukPembayaran").fill("Pembayaran pengadaan ATK");
    await page.locator("#kegiatan").fill("Kegiatan Pengadaan Barang");
    await page.locator("#subKegiatan").fill("1.01.01.0001");
    await selectRadixOption(page, "kodeRekening", " - ");

    await page.getByRole("button", { name: /Simpan/ }).click();
    await page.waitForTimeout(1000);

    await switchToTab(page, "recap");

    const spbRow = page.locator("table tbody tr").filter({ hasText: `SPB-POS-${TS}` });
    await expect(spbRow).toBeVisible({ timeout: 5000 });
    await expect(spbRow.locator("td").nth(0)).toHaveText(`SPB-POS-${TS}`);
  });

  test("Admin approves SPB", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, ADMIN_EMAIL);
    await page.goto("/spb");

    await switchToTab(page, "recap");

    const spbRow = page.locator("table tbody tr").filter({ hasText: "SPB-POS-" });
    await expect(spbRow.first()).toBeVisible({ timeout: 5000 });

    const approveBtn = spbRow.first().locator('[title="Setujui"]');
    await expect(approveBtn).toBeVisible();
    await approveBtn.click();
    await page.waitForTimeout(1000);

    await expect(spbRow.first().locator('[data-slot="badge"]')).toContainText(/Approved/i);
  });

  test("Staff creates SPJ after budget available", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, STAFF_EMAIL);
    await page.goto("/spj");

    await selectRadixOption(page, "relatedSpb", "SPB-POS-");
    await page.locator("#noSpj").fill(`SPJ-POS-${TS}`);
    await pickToday(page);
    await page.locator("#realisasi").fill("5000000");
    await page.locator("#namaPenerima").fill("Penerima Dana");
    await page.locator("#keterangan").fill("SPJ positif test");

    await page.getByRole("button", { name: /Simpan/ }).click();
    await page.waitForTimeout(1000);

    await expect(page.locator('[role="dialog"]')).not.toBeVisible({ timeout: 3000 });

    await switchToTab(page, "recap");
    const spjRow = page.locator("table tbody tr").filter({ hasText: `SPJ-POS-${TS}` });
    await expect(spjRow).toBeVisible({ timeout: 5000 });
  });

  test("Admin approves SPJ", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, ADMIN_EMAIL);
    await page.goto("/spj");

    await switchToTab(page, "recap");

    const spjRow = page.locator("table tbody tr").filter({ hasText: "SPJ-POS-" });
    await expect(spjRow.first()).toBeVisible({ timeout: 5000 });

    const approveBtn = spjRow.first().locator('[title="Setujui"]');
    await expect(approveBtn).toBeVisible();
    await approveBtn.click();
    await page.waitForTimeout(1000);

    await expect(spjRow.first().locator('[data-slot="badge"]')).toContainText(/Approved/i);
  });

  test("Admin creates SPD replenishment", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, ADMIN_EMAIL);
    await page.goto("/spd");

    await page.locator("#noSpd").fill(`SPD-POS-${TS}`);
    await pickToday(page);
    await selectRadixOption(page, "kodeRekening", " - ");
    await page.locator("#nominal").fill("1000000000000");

    await page.getByRole("button", { name: /Simpan SPD/ }).click();
    await page.waitForTimeout(1000);

    await expect(page.locator('[role="dialog"]')).not.toBeVisible({ timeout: 3000 });

    await switchToTab(page, "recap");
    const spdRow = page.locator("table tbody tr").filter({ hasText: `SPD-POS-${TS}` });
    await expect(spdRow).toBeVisible({ timeout: 5000 });
  });

  test("Staff edits REJECTED SPB after admin rejection", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, ADMIN_EMAIL);
    await page.goto("/spb");

    await page.locator("#noSpb").fill(`SPB-REJ-${TS}`);
    await pickToday(page);
    await page.locator("#nominal").fill("1000000");
    await page.locator("#terbilang").fill("Satu Juta Rupiah");
    await page.locator("#kepada").fill("Vendor Ditolak");
    await page.locator("#untukPembayaran").fill("Test rejection");
    await page.locator("#kegiatan").fill("Kegiatan Ditolak");
    await page.locator("#subKegiatan").fill("1.01.01.0002");
    await selectRadixOption(page, "kodeRekening", " - ");
    await page.getByRole("button", { name: /Simpan/ }).click();
    await page.waitForTimeout(1000);

    await switchToTab(page, "recap");
    const rejRow = page.locator("table tbody tr").filter({ hasText: `SPB-REJ-${TS}` });
    await expect(rejRow).toBeVisible({ timeout: 5000 });

    const rejectBtn = rejRow.locator('[title="Tolak"]');
    await expect(rejectBtn).toBeVisible();
    await rejectBtn.click();

    await page.locator("#rejectReason").fill("Dokumen tidak lengkap");
    await page.getByRole("button", { name: /Konfirmasi Tolak/i }).click();
    await page.waitForTimeout(1000);

    await expect(rejRow.locator('[data-slot="badge"]')).toContainText(/Rejected/i);

    await loginAs(page, STAFF_EMAIL);
    await page.goto("/spb");
    await switchToTab(page, "recap");

    const staffRow = page.locator("table tbody tr").filter({ hasText: `SPB-REJ-${TS}` });
    await expect(staffRow).toBeVisible({ timeout: 5000 });

    const editBtn = staffRow.locator('[title="Perbaiki Dokumen"]');
    await expect(editBtn).toBeVisible();
    await editBtn.click();

    await page.waitForURL(/edit=/);
    await page.locator("#kepada").fill("Vendor Ditolak - Revisi");
    await page.getByRole("button", { name: /Simpan/ }).click();
    await page.waitForTimeout(1000);

    const updatedRow = page.locator("table tbody tr").filter({ hasText: `SPB-REJ-${TS}` });
    await expect(updatedRow.locator('[data-slot="badge"]')).toContainText(/Pending/i);
  });
});
