# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/finance-workflow.spec.ts >> DKPKP Finance Workflow: Blocker & Replenishment >> Flow 1: Staff gets blocked by SALDO_TIDAK_CUKUP
- Location: tests/finance-workflow.spec.ts:56:7

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 1
Received:   1
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - link "SIPANGAN KPKP" [ref=e5] [cursor=pointer]:
          - /url: /
          - img "SIPANGAN KPKP" [ref=e6]
        - generic [ref=e7]:
          - generic [ref=e8]:
            - generic [ref=e9]: staff@test.com
            - generic [ref=e10]: staff
          - button [ref=e11]:
            - img
    - main [ref=e12]:
      - generic [ref=e14]:
        - link "Dashboard" [ref=e16] [cursor=pointer]:
          - /url: /
          - img
          - text: Dashboard
        - generic [ref=e17]:
          - img [ref=e19]
          - generic [ref=e22]:
            - heading "Surat Pertanggungjawaban (SPJ)" [level=1] [ref=e23]
            - paragraph [ref=e24]: Manage expenditure realization recording and physical payment receipt verification.
        - generic [ref=e25]:
          - tablist [ref=e26]:
            - tab "SPJ FORM" [selected] [ref=e27]:
              - img
              - text: SPJ FORM
            - tab "RECAP TABLE" [ref=e28]:
              - img
              - text: RECAP TABLE
          - tabpanel "SPJ FORM" [ref=e29]:
            - generic [ref=e30]:
              - generic [ref=e31]:
                - heading "Laporan Penyusunan Dokumen SPJ" [level=3] [ref=e32]
                - paragraph [ref=e33]: Catat nilai transaksi riil penyerapan dana untuk memvalidasi perintah bayar terkait.
              - generic [ref=e35]:
                - generic [ref=e36]:
                  - generic [ref=e37]:
                    - generic [ref=e38]: Nomor Registrasi SPJ
                    - textbox "Nomor Registrasi SPJ" [ref=e39]:
                      - /placeholder: "Cth: 120 / SPJ / DKPKP / 2026"
                  - generic [ref=e40]:
                    - generic [ref=e41]: Referensi Hubungan Nomor SPB
                    - combobox "Referensi Hubungan Nomor SPB" [active] [ref=e42]:
                      - option "Pilih SPB yang sudah disetujui" [selected]
                - generic [ref=e43]:
                  - generic [ref=e44]:
                    - generic [ref=e45]: Tanggal Pengajuan SPJ
                    - button "Pilih tanggal pengajuan" [ref=e46]:
                      - img
                      - generic [ref=e47]: Pilih tanggal pengajuan
                  - generic [ref=e48]:
                    - generic [ref=e49]: Total Realisasi Anggaran Terpakai (Rp)
                    - textbox "Total Realisasi Anggaran Terpakai (Rp)" [ref=e50]:
                      - /placeholder: "Cth: 2.450.000"
                - generic [ref=e51]:
                  - generic [ref=e52]: Pihak Penerima Dana Anggaran Belanja
                  - textbox "Pihak Penerima Dana Anggaran Belanja" [ref=e53]:
                    - /placeholder: "Cth: Koordinator Lapangan TNI/Polri"
                - generic [ref=e54]:
                  - generic [ref=e55]: Keterangan / Rincian Realisasi Belanja
                  - textbox "Keterangan / Rincian Realisasi Belanja" [ref=e56]:
                    - /placeholder: "Cth: Pembayaran Honorarium Transaksi Satgas Lapangan Terlampir"
                - generic [ref=e57]:
                  - generic [ref=e58]: Berita Acara / Kwitansi (PDF/Gambar)
                  - button "Berita Acara / Kwitansi (PDF/Gambar)" [ref=e60]
                - generic [ref=e61]:
                  - button "Cetak Dokumen" [ref=e62]
                  - button "Simpan" [ref=e63]
    - contentinfo [ref=e64]:
      - generic [ref=e65]:
        - generic [ref=e66]: Dev by REY
        - generic [ref=e67]: •
        - link "GitHub" [ref=e68] [cursor=pointer]:
          - /url: https://github.com/UnknownVisuals
  - button "Open Next.js Dev Tools" [ref=e74] [cursor=pointer]:
    - img [ref=e75]
  - alert [ref=e78]
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
> 65  |     await expect(optCount).toBeGreaterThan(1);
      |                            ^ Error: expect(received).toBeGreaterThan(expected)
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
  101 |     await page.locator("#relatedSpb").selectOption("SPB-TEST-001");
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