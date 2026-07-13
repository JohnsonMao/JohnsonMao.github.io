import { expect, test } from '@playwright/test'

test.describe('i18n - Language Routing', () => {
  test('zh-TW default locale serves at /', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: '歡迎', level: 1 })).toHaveText('歡迎')
  })

  test('en locale serves at /en/', async ({ page }) => {
    await page.goto('/en/')
    await expect(page.getByRole('heading', { name: 'Welcome', level: 1 })).toHaveText('Welcome')
  })
})

test.describe('i18n - Language Switcher', () => {
  test('switches from zh-TW to en on home page', async ({ page }) => {
    await page.goto('/')

    await test.step('click language switcher', async () => {
      await page.getByRole('link', { name: '切換語言' }).click()
    })

    await test.step('verify en home page is shown', async () => {
      await expect(page).toHaveURL('/en/')
      await expect(page.getByRole('heading', { name: 'Welcome', level: 1 })).toHaveText('Welcome')
    })
  })

  test('switches from en to zh-TW on home page', async ({ page }) => {
    await page.goto('/en/')

    await test.step('click language switcher', async () => {
      await page.getByRole('link', { name: 'Switch language' }).click()
    })

    await test.step('verify zh-TW home page is shown', async () => {
      await expect(page).toHaveURL('/')
      await expect(page.getByRole('heading', { name: '歡迎', level: 1 })).toHaveText('歡迎')
    })
  })

  test('preserves route when switching language on blog list', async ({ page }) => {
    await page.goto('/blog/')

    await test.step('switch to en', async () => {
      await page.getByRole('link', { name: '切換語言' }).click()
    })

    await test.step('verify en blog list URL', async () => {
      await expect(page).toHaveURL('/en/blog/')
    })
  })
})
