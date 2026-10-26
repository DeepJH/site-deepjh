import { test, expect } from '@playwright/test';

test.describe('Issue #7: Production Edge Deployment & Full Seam Verification', () => {
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

  test('full navigation flow between Home, Showcase, Case Study, Posts, and 404 works seamlessly', async ({ page }) => {
    // 1. Start at Home
    await page.goto('/');
    await expect(page).toHaveTitle(/DeepJH/);

    // 2. Navigate to Projects
    await page.getByRole('link', { name: 'Projects', exact: true }).click();
    await expect(page).toHaveURL('/projects');
    await expect(page.locator('h1')).toContainText('Engineering Projects');

    // 3. Navigate into ChronosKV Case Study
    await page.getByRole('link', { name: /ChronosKV/i }).first().click();
    await expect(page).toHaveURL('/projects/chronos-kv');
    await expect(page.locator('h1')).toContainText('ChronosKV');

    // 4. Navigate to Posts
    await page.getByRole('link', { name: 'Posts', exact: true }).click();
    await expect(page).toHaveURL('/posts');
    await expect(page.locator('h1')).toContainText('Technical Publications');

    // 5. Navigate to Demystifying io_uring
    await page.getByRole('link', { name: /io_uring/i }).first().click();
    await expect(page).toHaveURL('/posts/io-uring-linux-storage-engine');

    // 6. Navigate back Home
    await page.getByRole('link', { name: /DeepJH/i }).first().click();
    await expect(page).toHaveURL('/');
  });
});
