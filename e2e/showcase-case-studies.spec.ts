import { test, expect } from '@playwright/test';

test.describe('Issue #4: Curated Showcase & Project Case Studies', () => {
  test('homepage displays curated showcase of 3-6 projects and navigates to case study', async ({
    page,
  }) => {
    await page.goto('/');

    const showcaseSection = page.locator('#showcase');
    await expect(showcaseSection).toBeVisible();

    // 3 to 6 featured project cards exist
    const projectCards = showcaseSection.locator('[data-project-card="true"]');
    const cardCount = await projectCards.count();
    expect(cardCount).toBeGreaterThanOrEqual(3);
    expect(cardCount).toBeLessThanOrEqual(6);

    // The card has title, description, and tags
    const firstCardTitle = await projectCards.first().locator('h3').textContent();
    expect(firstCardTitle?.trim().length).toBeGreaterThan(0);

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

    // Complete non-truncated architecture stack
    await expect(metadataSection).toContainText('Architecture Stack');
    await expect(metadataSection).toContainText('SIMD');
    await expect(metadataSection).toContainText('HNSW');

    // Quantified metrics
    const metricsSection = page.locator('[data-case-study-metrics="true"]');
    await expect(metricsSection).toBeVisible();
  });

  test('/projects catalog lists all engineering projects', async ({ page }) => {
    const response = await page.goto('/projects');
    expect(response?.status()).toBe(200);

    const projectCards = page.locator('[data-project-card="true"]');
    expect(await projectCards.count()).toBeGreaterThanOrEqual(3);
  });
});
