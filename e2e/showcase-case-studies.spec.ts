import { test, expect } from '@playwright/test';

test.describe('Curated 2x2 Showcase & Project Case Studies', () => {
  test('homepage displays curated showcase of 4 projects and navigates to case study', async ({
    page,
  }) => {
    await page.goto('/');

    const showcaseSection = page.locator('#showcase');
    await expect(showcaseSection).toBeVisible();

    // Exactly 4 featured project cards in 2x2 grid
    const projectCards = showcaseSection.locator('[data-project-card="true"]');
    const cardCount = await projectCards.count();
    expect(cardCount).toBe(4);

    // Assert the 4 repositories are present
    const showcaseText = await showcaseSection.textContent();
    expect(showcaseText).toContain('aitopschool-downloader');
    expect(showcaseText).toContain('good-bye-othello');
    expect(showcaseText).toContain('brief-clock');
    expect(showcaseText).toContain('State Tuning Tutorial For RWKV');

    // Click through to case study
    await projectCards.first().locator('a[data-case-study-link="true"]').first().click();

    // Assert URL is under /projects/
    await expect(page).toHaveURL(/\/projects\/.+/);

    // Case study page elements
    const mainHeading = page.locator('h1').first();
    await expect(mainHeading).toBeVisible();

    // Structured metadata section with role and timeline
    const metadataSection = page.locator('[data-case-study-meta="true"]');
    await expect(metadataSection).toBeVisible();
    await expect(metadataSection).toContainText('Role & Timeline');
    await expect(metadataSection).toContainText('Architecture Stack');

    // Quantified metrics
    const metricsSection = page.locator('[data-case-study-metrics="true"]');
    await expect(metricsSection).toBeVisible();
  });

  test('/projects catalog lists all 4 engineering projects', async ({ page }) => {
    const response = await page.goto('/projects');
    expect(response?.status()).toBe(200);

    const projectCards = page.locator('[data-project-card="true"]');
    expect(await projectCards.count()).toBe(4);
  });
});
