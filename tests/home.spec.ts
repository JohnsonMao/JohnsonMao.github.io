import { expect, test } from '@playwright/test'

test.describe('Home Page', () => {
  test.describe('zh-TW (default locale)', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/')
    })

    test('displays correct page title and welcome heading', async ({ page }) => {
      await expect(page).toHaveTitle(/JohnsonMao/)
      await expect(page.getByRole('heading', { name: '歡迎', level: 1 })).toHaveText('歡迎')
    })

    test('navigation contains all main links', async ({ page }) => {
      const nav = page.getByRole('navigation', { name: '主要導覽' })
      await expect(nav.getByRole('link', { name: '文章' })).toHaveText('文章')
      await expect(nav.getByRole('link', { name: '筆記' })).toHaveText('筆記')
      await expect(nav.getByRole('link', { name: '關於' })).toHaveText('關於')
    })

    test('blog link navigates to blog list', async ({ page }) => {
      await page.getByRole('link', { name: '前往文章列表' }).click()
      await expect(page).toHaveURL('/blog/')
    })
  })

  test.describe('en locale', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en/')
    })

    test('displays correct page title and welcome heading', async ({ page }) => {
      await expect(page).toHaveTitle(/JohnsonMao/)
      await expect(page.getByRole('heading', { name: 'Welcome', level: 1 })).toHaveText('Welcome')
    })

    test('navigation contains all main links', async ({ page }) => {
      const nav = page.getByRole('navigation', { name: 'Main' })
      await expect(nav.getByRole('link', { name: 'Blog' })).toHaveText('Blog')
      await expect(nav.getByRole('link', { name: 'Notes' })).toHaveText('Notes')
      await expect(nav.getByRole('link', { name: 'About' })).toHaveText('About')
    })
  })
})
