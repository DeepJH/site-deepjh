import { test, expect } from '@playwright/test';

test.describe('Issue #3: Walking Skeleton & Chromatic Liquid Glass Shell', () => {
  test('homepage returns HTTP 200 with layout landmarks and zero-FOUC theme toggle', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    // Document title
    await expect(page).toHaveTitle(/DeepJH/);

    // Structural Landmarks
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header.getByRole('link', { name: /DeepJH/i })).toBeVisible();
    await expect(header.getByRole('link', { name: /Projects/i })).toBeVisible();
    await expect(header.getByRole('link', { name: /Posts/i })).toBeVisible();

    const main = page.locator('main');
    await expect(main).toBeVisible();

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByRole('link', { name: /GitHub/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /LinkedIn/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /Email/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /RSS/i })).toBeVisible();

    // Ambient Chromatic Substrate
    const substrate = page.locator('[data-chromatic-substrate="true"]');
    await expect(substrate).toHaveCount(1);

    // Theme Switcher interaction & persistence
    const themeBtn = page.getByRole('button', { name: /toggle theme/i });
    await expect(themeBtn).toBeVisible();

    const html = page.locator('html');
    const initialIsDark = await html.evaluate((el) => el.classList.contains('dark'));

    // Toggle theme
    await themeBtn.click();
    const afterClickIsDark = await html.evaluate((el) => el.classList.contains('dark'));
    expect(afterClickIsDark).toBe(!initialIsDark);

    // Verify localStorage persistence
    const storedTheme = await page.evaluate(() => localStorage.getItem('theme'));
    expect(storedTheme).toBe(afterClickIsDark ? 'dark' : 'light');

    // Reload page and assert persistence
    await page.reload();
    const persistedIsDark = await html.evaluate((el) => el.classList.contains('dark'));
    expect(persistedIsDark).toBe(afterClickIsDark);
  });
});
