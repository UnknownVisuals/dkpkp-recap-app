# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/finance-workflow.spec.ts >> DKPKP Finance Workflow: Blocker & Replenishment >> Flow 3: Staff succeeds after Admin replenishment
- Location: tests/finance-workflow.spec.ts:96:7

# Error details

```
Error: locator.selectOption: Target page, context or browser has been closed
Call log:
  - waiting for locator('#relatedSpb')
    - locator resolved to <select id="relatedSpb" class="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    16 × waiting for element to be visible and enabled
       - did not find some options
     - retrying select option action
       - waiting 500ms
    - waiting for element to be visible and enabled
  - element was detached from the DOM, retrying

```

# Test source

```ts
  1   | import { test, expect, type Page } from "@playwright/test";
  2   | 
  3   | const STAFF_EMAIL = "staff@test.com";
  4   | const ADMIN_EMAIL = "admin@test.com";
  5   | const PASSWORD = "password123";
  6   | 
  7   | async function loginAs(page: Page, email: string) {
  8   |   await page.goto("/login");
  9   |   await page.locator("#email").fill(email);
  10  |   await page.locator("#password").fill(PASSWORD);
  11  |   await page.getByRole("button", { name: "Sign in", exact: true }).click();
  12  |   await page.waitForURL("/", { timeout: 15000 });
  13  | }
  14  | 
  15  | async function pickToday(page: Page) {
  16  |   await page.getByRole("button", { name: /Pilih tanggal/i }).click();
  17  |   await page.locator('[data-slot="calendar"] button:not([disabled])').first().click();
  18  | }
  19  | 
  20  | test.describe("DKPKP Finance Workflow: Blocker & Replenishment", () => {
  21  |   test("Flow 0: Seed test data (create & approve SPB)", async ({ page }) => {
  22  |     test.setTimeout(30000);
  23  |     await loginAs(page, ADMIN_EMAIL);
  24  |     await page.goto("/spb");
  25  | 
  26  |     // Check if budget_accounts exist in the dropdown
  27  |     await page.locator("#kodeRekening").click();
  28  |     const optionCount = await page.locator("#kodeRekening option").count();
  29  |     console.log(`[Seed] kodeRekening has ${optionCount} options`);
  30  |     await expect(optionCount).toBeGreaterThan(1);
  31  | 
  32  |     // Fill SPB form
  33  |     await page.locator("#noSpb").fill("SPB-TEST-001");
  34  |     await pickToday(page);
  35  |     await page.locator("#nominal").fill("50000000");
  36  |     await page.locator("#terbilang").fill("Lima Puluh Juta Rupiah");
  37  |     await page.locator("#kepada").fill("Test Vendor");
  38  |     await page.locator("#untukPembayaran").fill("Test Pembayaran");
  39  |     await page.locator("#kegiatan").fill("Test Kegiatan");
  40  |     await page.locator("#subKegiatan").fill("1.01.01.001");
  41  |     await page.locator("#kodeRekening").selectOption({ index: 1 });
  42  | 
  43  |     // Wait for save button to be enabled and click
  44  |     await page.getByRole("button", { name: /Simpan/ }).click();
  45  | 
  46  |     // Switch to recap tab and approve
  47  |     await page.getByRole("tab", { name: /recap/i }).click();
  48  |     await page.waitForTimeout(1000);
  49  | 
  50  |     const approveBtn = page.locator('[title="Setujui"]').first();
  51  |     await expect(approveBtn).toBeVisible({ timeout: 5000 });
  52  |     await approveBtn.click();
  53  |     await page.waitForTimeout(1000);
  54  |   });
  55  | 
  56  |   test("Flow 1: Staff gets blocked by SALDO_TIDAK_CUKUP", async ({ page }) => {
  57  |     test.setTimeout(30000);
  58  |     await loginAs(page, STAFF_EMAIL);
  59  |     await page.goto("/spj");
  60  | 
  61  |     // Verify the SPB option exists
  62  |     await page.locator("#relatedSpb").click();
  63  |     const optCount = await page.locator("#relatedSpb option").count();
  64  |     console.log(`[Flow1] relatedSpb has ${optCount} options`);
  65  |     await expect(optCount).toBeGreaterThan(1);
  66  | 
  67  |     await page.locator("#relatedSpb").selectOption("SPB-TEST-001");
  68  |     await page.locator("#noSpj").fill("SPJ-TEST-BLOCK-01");
  69  |     await pickToday(page);
  70  |     await page.locator("#realisasi").fill("999999999999");
  71  |     await page.locator("#namaPenerima").fill("Playwright Tester");
  72  |     await page.locator("#keterangan").fill("Testing the blocker logic");
  73  | 
  74  |     await page.getByRole("button", { name: /Simpan/ }).click();
  75  | 
  76  |     const dialog = page.locator('[role="dialog"]');
  77  |     await expect(dialog).toBeVisible();
  78  |     await expect(dialog.getByText(/Saldo Tidak Cukup/i)).toBeVisible();
  79  |   });
  80  | 
  81  |   test("Flow 2: Admin successfully injects new SPD funds", async ({ page }) => {
  82  |     test.setTimeout(30000);
  83  |     await loginAs(page, ADMIN_EMAIL);
  84  |     await page.goto("/spd");
  85  | 
  86  |     await page.locator("#noSpd").fill(`SPD-TEST-${Date.now()}`);
  87  |     await pickToday(page);
  88  |     await page.locator("#kodeRekening").selectOption({ index: 1 });
  89  |     await page.locator("#nominal").fill("1000000000000");
  90  | 
  91  |     await page.getByRole("button", { name: /Simpan SPD/ }).click();
  92  | 
  93  |     await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  94  |   });
  95  | 
  96  |   test("Flow 3: Staff succeeds after Admin replenishment", async ({ page }) => {
  97  |     test.setTimeout(30000);
  98  |     await loginAs(page, STAFF_EMAIL);
  99  |     await page.goto("/spj");
  100 | 
> 101 |     await page.locator("#relatedSpb").selectOption("SPB-TEST-001");
      |                                       ^ Error: locator.selectOption: Target page, context or browser has been closed
  102 |     await page.locator("#noSpj").fill(`SPJ-TEST-SUCCESS-${Date.now()}`);
  103 |     await pickToday(page);
  104 |     await page.locator("#realisasi").fill("5000000");
  105 |     await page.locator("#namaPenerima").fill("Playwright Tester");
  106 |     await page.locator("#keterangan").fill("Testing the success logic");
  107 | 
  108 |     await page.getByRole("button", { name: /Simpan/ }).click();
  109 | 
  110 |     await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  111 |   });
  112 | 
  113 |   test("Security Check: Staff is redirected away from Admin SPD route", async ({
  114 |     page,
  115 |   }) => {
  116 |     test.setTimeout(30000);
  117 |     await loginAs(page, STAFF_EMAIL);
  118 |     await page.goto("/spd");
  119 |     await page.waitForURL("**/");
  120 |     expect(page.url()).not.toContain("/spd");
  121 |   });
  122 | });
  123 | 
```