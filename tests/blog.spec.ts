import { expect, test } from '@playwright/test'

test.describe('Blog List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/')
  })

  test('renders page heading and at least one article', async ({ page }) => {
    await test.step('verify page heading', async () => {
      await expect(page.getByRole('heading', { name: '文章', level: 1 })).toHaveText('文章')
    })

    await test.step('verify at least one article exists', async () => {
      await expect(page.getByRole('article').first()).toBeVisible()
    })
  })

  test('article card contains title link and date', async ({ page }) => {
    const firstCard = page.getByRole('article').first()

    // The main post link wraps the h2; tag links are separate — assert heading as proxy for main link
    await expect(firstCard.getByRole('heading', { level: 2 })).toBeVisible()
    await expect(firstCard.locator('time')).toBeVisible()
  })

  test('clicking article card navigates to post page', async ({ page }) => {
    await test.step('click first article heading link', async () => {
      // Click the h2 heading which is inside the main post <a> wrapper
      await page.getByRole('article').first().getByRole('heading', { level: 2 }).click()
    })

    await test.step('verify post page URL and heading', async () => {
      await expect(page).toHaveURL(/\/blog\/.+/)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    })
  })
})

test.describe('Blog Post Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/')
    await page.getByRole('article').first().getByRole('heading', { level: 2 }).click()
    await expect(page).toHaveURL(/\/blog\/.+/)
  })

  test('renders post heading and main content area', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('main')).toBeVisible()
  })
})
