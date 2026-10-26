import { test, expect } from '@playwright/test';

test.describe('Flagship Publication & Digital Garden Syndication', () => {
  test('/posts lists published flagship article and displays digital garden callout', async ({
    page,
  }) => {
    const response = await page.goto('/posts');
    expect(response?.status()).toBe(200);

    const postArticles = page.locator('article[data-post-item="true"]');
    const count = await postArticles.count();
    expect(count).toBeGreaterThanOrEqual(1);

    // Assert flagship post title is present
    const firstArticle = postArticles.first();
    await expect(firstArticle.locator('h2')).toBeVisible();
    await expect(firstArticle.locator('h2')).toContainText('思维的回响');
    await expect(firstArticle.locator('time')).toBeVisible();
    await expect(firstArticle.locator('[data-reading-time="true"]')).toBeVisible();

    // Verify Digital Garden banner exists
    const gardenLink = page.getByRole('link', { name: /Explore on GitHub/i });
    await expect(gardenLink).toBeVisible();
    await expect(gardenLink).toHaveAttribute('href', 'https://github.com/DeepJH/text-note');

    // Tag filtering navigation
    const tagLink = page.locator('a[data-filter="text-note"]');
    await expect(tagLink).toBeVisible();
    await tagLink.click();
    await expect(page).toHaveURL(/\/posts\/tag\/text-note/);

    // Verify article on tag page
    const tagPageArticles = page.locator('article[data-post-item="true"]');
    expect(await tagPageArticles.count()).toBeGreaterThanOrEqual(1);

    // Click 'All' filter restores full list
    const allFilterLink = page.locator('a[data-filter="all"]');
    await allFilterLink.click();
    await expect(page).toHaveURL('/posts');
  });

  test('/posts/[slug] renders deep technical article with Shiki syntax highlighting and syndication card', async ({
    page,
  }) => {
    await page.goto('/posts');

    const firstLink = page
      .locator('article[data-post-item="true"]')
      .first()
      .locator('a[data-post-link="true"]')
      .first();
    await firstLink.click();

    await expect(page).toHaveURL(/\/posts\/.+/);

    const article = page.locator('article');
    await expect(article).toBeVisible();
    await expect(article.locator('h1')).toBeVisible();

    // Verify bottom syndication card exists
    const syndicationCard = page.getByRole('link', { name: /Star text-note/i });
    await expect(syndicationCard).toBeVisible();
    await expect(syndicationCard).toHaveAttribute('href', 'https://github.com/DeepJH/text-note');
  });

  test('homepage displays recent flagship publication with text-note link', async ({ page }) => {
    await page.goto('/');

    const postsSection = page.locator('#posts');
    await expect(postsSection).toBeVisible();

    const postItems = postsSection.locator('#posts-list > article');
    expect(await postItems.count()).toBeGreaterThanOrEqual(1);
    await expect(postItems.first()).toContainText('思维的回响');
  });
});
