import { expect, test } from '@playwright/test'

test.describe('Search - Dialog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('opens dialog on button click', async ({ page }) => {
    await test.step('click search button', async () => {
      // aria-label uses i18n search.buttonLabel — zh-TW locale at /
      await page.getByRole('button', { name: '搜尋' }).click()
    })

    await test.step('verify dialog and input are visible', async () => {
      await expect(page.getByRole('dialog')).toBeVisible()
      await expect(page.getByRole('textbox', { name: /搜尋|Search/i })).toBeVisible()
    })
  })

  test('closes dialog with close button', async ({ page }) => {
    await page.getByRole('button', { name: '搜尋' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await test.step('click close button inside dialog', async () => {
      // aria-label="關閉搜尋" set via i18n key search.closeSearch (zh-TW locale at /)
      await page.getByRole('dialog').getByRole('button', { name: '關閉搜尋' }).click()
    })

    await test.step('verify dialog is closed', async () => {
      await expect(page.getByRole('dialog')).not.toBeVisible()
    })
  })

  test('closes dialog with Escape key', async ({ page }) => {
    await page.getByRole('button', { name: '搜尋' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()

    await test.step('press Escape key', async () => {
      await page.keyboard.press('Escape')
    })

    await test.step('verify dialog is closed', async () => {
      await expect(page.getByRole('dialog')).not.toBeVisible()
    })
  })

  test('accepts keyboard input in search field', async ({ page }) => {
    await page.getByRole('button', { name: '搜尋' }).click()

    await test.step('type search query', async () => {
      const input = page.getByRole('textbox', { name: /搜尋|Search/i })
      await input.fill('JavaScript')
      await expect(input).toHaveValue('JavaScript')
    })
  })
})
