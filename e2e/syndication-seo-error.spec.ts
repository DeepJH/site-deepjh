import { test, expect } from '@playwright/test';

test.describe('Issue #6: Syndication, SEO & Resilient Error Handling', () => {
  test('/rss.xml serves valid RSS feed of published posts', async ({ request }) => {
    const response = await request.get('/rss.xml');
    expect(response.status()).toBe(200);

    const xml = await response.text();
    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain('<title>DeepJH — Technical Publications</title>');
    expect(xml).toContain('Demystifying io_uring');
    expect(xml).toContain('Designing Zero-Copy Network Systems');
    expect(xml).toContain('<link>https://deepjh.com/posts/io-uring-linux-storage-engine/</link>');
    expect(xml).not.toContain('DRAFT: Internal Work in Progress');
  });

  test('pages contain rich OpenGraph and SEO metadata', async ({ page }) => {
    await page.goto('/');

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('DeepJH');

    const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDesc?.length).toBeGreaterThan(10);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toBeTruthy();

    const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
    expect(twitterCard).toBe('summary_large_image');
  });

  test('404 error page renders with Liquid Glass aesthetic and link back to home', async ({ page }) => {
    const response = await page.goto('/404');
    expect(response?.status()).toBe(200);

    await expect(page.locator('h1')).toContainText('404');
    await expect(page.getByRole('link', { name: /Back to Homepage/i })).toBeVisible();

    const homeLink = page.getByRole('link', { name: /Back to Homepage/i });
    await homeLink.click();
    await expect(page).toHaveURL('/');
  });
});
