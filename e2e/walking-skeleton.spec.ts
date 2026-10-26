import { test, expect } from '@playwright/test';

test.describe('Walking Skeleton, Liquid Glass Pill Shell & Identity', () => {
  test('homepage returns HTTP 200 with layout landmarks, avatar, and zero-FOUC theme toggle', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);

    // Canonical Document title
    await expect(page).toHaveTitle('Hello, Im DeepJH.');

    // Structural Landmarks
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await expect(header.getByRole('link', { name: /DeepJH/i })).toBeVisible();
    await expect(header.locator('img[alt="DeepJH Avatar"]')).toBeVisible();
    await expect(header.getByRole('link', { name: /Projects/i })).toBeVisible();
    await expect(header.getByRole('link', { name: /Posts/i })).toBeVisible();
    await expect(header.getByRole('link', { name: /GitHub/i })).toBeVisible();
    await expect(header.getByRole('link', { name: /Email/i })).toBeVisible();
    await expect(header.getByRole('link', { name: /RSS/i })).toBeVisible();
    await expect(header.locator('[data-lang-switcher="true"]')).toBeVisible();

    // Verify LinkedIn is removed
    const headerLinkedIn = await header.getByRole('link', { name: /LinkedIn/i }).count();
    expect(headerLinkedIn).toBe(0);

    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Hero avatar
    const heroAvatar = page.locator('main img[alt="DeepJH Profile Avatar"]');
    await expect(heroAvatar).toBeVisible();

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByRole('link', { name: /GitHub/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /Email/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /RSS/i })).toBeVisible();

    const footerLinkedIn = await footer.getByRole('link', { name: /LinkedIn/i }).count();
    expect(footerLinkedIn).toBe(0);

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
