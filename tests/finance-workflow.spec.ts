import { test, expect, type Page } from "@playwright/test";

const STAFF_EMAIL = "staff@test.com";
const ADMIN_EMAIL = "admin@test.com";
const PASSWORD = "password123";

async function loginAs(page: Page, email: string) {
  await page.goto("/login");
  await page.locator("#email").fill(email);
  await page.locator("#password").fill(PASSWORD);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await page.waitForURL("/", { timeout: 15000 });
}

async function pickToday(page: Page) {
  await page.getByRole("button", { name: /Pilih tanggal/i }).click();
  await page.locator('[data-slot="calendar"] button:not([disabled])').first().click();
}

test.describe("DKPKP Finance Workflow: Blocker & Replenishment", () => {
  test("Flow 0: Seed test data (create & approve SPB)", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, ADMIN_EMAIL);
    await page.goto("/spb");

    // Check if budget_accounts exist in the dropdown
    await page.locator("#kodeRekening").click();
    const optionCount = await page.locator("#kodeRekening option").count();
    console.log(`[Seed] kodeRekening has ${optionCount} options`);
    await expect(optionCount).toBeGreaterThan(1);

    // Fill SPB form
    await page.locator("#noSpb").fill("SPB-TEST-001");
    await pickToday(page);
    await page.locator("#nominal").fill("50000000");
    await page.locator("#terbilang").fill("Lima Puluh Juta Rupiah");
    await page.locator("#kepada").fill("Test Vendor");
    await page.locator("#untukPembayaran").fill("Test Pembayaran");
    await page.locator("#kegiatan").fill("Test Kegiatan");
    await page.locator("#subKegiatan").fill("1.01.01.001");
    await page.locator("#kodeRekening").selectOption({ index: 1 });

    // Wait for save button to be enabled and click
    await page.getByRole("button", { name: /Simpan/ }).click();

    // Switch to recap tab and approve
    await page.getByRole("tab", { name: /recap/i }).click();
    await page.waitForTimeout(1000);

    const approveBtn = page.locator('[title="Setujui"]').first();
    await expect(approveBtn).toBeVisible({ timeout: 5000 });
    await approveBtn.click();
    await page.waitForTimeout(1000);
  });

  test("Flow 1: Staff gets blocked by SALDO_TIDAK_CUKUP", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, STAFF_EMAIL);
    await page.goto("/spj");

    // Verify the SPB option exists
    await page.locator("#relatedSpb").click();
    const optCount = await page.locator("#relatedSpb option").count();
    console.log(`[Flow1] relatedSpb has ${optCount} options`);
    await expect(optCount).toBeGreaterThan(1);

    await page.locator("#relatedSpb").selectOption("SPB-TEST-001");
    await page.locator("#noSpj").fill("SPJ-TEST-BLOCK-01");
    await pickToday(page);
    await page.locator("#realisasi").fill("999999999999");
    await page.locator("#namaPenerima").fill("Playwright Tester");
    await page.locator("#keterangan").fill("Testing the blocker logic");

    await page.getByRole("button", { name: /Simpan/ }).click();

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/Saldo Tidak Cukup/i)).toBeVisible();
  });

  test("Flow 2: Admin successfully injects new SPD funds", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, ADMIN_EMAIL);
    await page.goto("/spd");

    await page.locator("#noSpd").fill(`SPD-TEST-${Date.now()}`);
    await pickToday(page);
    await page.locator("#kodeRekening").selectOption({ index: 1 });
    await page.locator("#nominal").fill("1000000000000");

    await page.getByRole("button", { name: /Simpan SPD/ }).click();

    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });

  test("Flow 3: Staff succeeds after Admin replenishment", async ({ page }) => {
    test.setTimeout(30000);
    await loginAs(page, STAFF_EMAIL);
    await page.goto("/spj");

    await page.locator("#relatedSpb").selectOption("SPB-TEST-001");
    await page.locator("#noSpj").fill(`SPJ-TEST-SUCCESS-${Date.now()}`);
    await pickToday(page);
    await page.locator("#realisasi").fill("5000000");
    await page.locator("#namaPenerima").fill("Playwright Tester");
    await page.locator("#keterangan").fill("Testing the success logic");

    await page.getByRole("button", { name: /Simpan/ }).click();

    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });

  test("Security Check: Staff is redirected away from Admin SPD route", async ({
    page,
  }) => {
    test.setTimeout(30000);
    await loginAs(page, STAFF_EMAIL);
    await page.goto("/spd");
    await page.waitForURL("**/");
    expect(page.url()).not.toContain("/spd");
  });
});
