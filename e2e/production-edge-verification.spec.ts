import { test, expect } from '@playwright/test';

test.describe('Production Edge Deployment, Zero-Runtime JS & Bilingual Seam Verification', () => {
  test('static preview delivers zero external JS scripts and proper response status', async ({ page }) => {
    // Visit home page and verify zero external script bundles
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    const scriptElements = await page.locator('script[src]').count();
    expect(scriptElements).toBe(0);

    // Verify only inline theme script exists
    const inlineScripts = await page.locator('script:not([src])').count();
    expect(inlineScripts).toBeGreaterThanOrEqual(1);
  });

  test('full bilingual navigation flow between English and Chinese routes', async ({ page }) => {
    // 1. Start at Home (EN)
    await page.goto('/');
    await expect(page).toHaveTitle('Hello, Im DeepJH.');

    // 2. Switch to Chinese via Language Switcher Pill
    const zhSwitch = page.locator('[data-lang-switcher="true"]').getByRole('link', { name: '中文' });
    await zhSwitch.click();
    await expect(page).toHaveURL(/\/zh\/?$/);
    await expect(page.locator('h1')).toContainText('工程化构建自主智能体工作流');

    // 3. Navigate to Chinese Projects
    await page.getByRole('link', { name: '项目', exact: true }).click();
    await expect(page).toHaveURL(/\/zh\/projects\/?$/);
    await expect(page.locator('h1')).toContainText('工程项目');

    // 4. Click a case study
    await page.getByRole('link', { name: /good-bye-othello/i }).first().click();
    await expect(page).toHaveURL(/\/zh\/projects\/good-bye-othello\/?$/);
    await expect(page.locator('h1')).toContainText('good-bye-othello');

    // 5. Switch back to English, preserving project slug route
    const enSwitch = page.locator('[data-lang-switcher="true"]').getByRole('link', { name: 'EN' });
    await enSwitch.click();
    await expect(page).toHaveURL(/\/projects\/good-bye-othello\/?$/);
    await expect(page.locator('h1')).toContainText('good-bye-othello');

    // 6. Navigate to Posts
    await page.getByRole('link', { name: 'Posts', exact: true }).click();
    await expect(page).toHaveURL(/\/posts\/?$/);
    await expect(page.locator('h1')).toContainText('Technical Publications');

    // 7. Click flagship article
    await page.getByRole('link', { name: /思维的回响/i }).first().click();
    await expect(page).toHaveURL(/\/posts\/reflections-on-text-note\/?$/);

    // 8. Navigate back Home
    await page.getByRole('link', { name: /DeepJH/i }).first().click();
    await expect(page).toHaveURL(/\/$/);
  });
});
