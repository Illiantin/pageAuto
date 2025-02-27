import { test, expect, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space')
  await page.getByRole('button', { name: 'Sign In' }).click()
  await page.getByRole('button', { name: 'Registration' }).click()
})

test.describe('positive login test', () => {
    test('should successfully register a new user', async ({ page }) => {
      await page.fill('input[name="name"]', 'John')
      await page.fill('input[name="lastName"]', 'Doe')
      await page.fill('input[name="email"]', `aqa-${Date.now()}@test.com`)
      await page.fill('input[name="password"]', 'Password123')
      await page.fill('input[name="repeatPassword"]', 'Password123')
      await page.getByRole('button', { name: 'Register' }).click()
    })
})

test.describe('negative registration form tests', () => {
  test('should keep the Register button disabled when all fields are empty', async ({ page }) => {
        const registerButton = page.getByRole('button', { name: 'Register' })
        await expect(registerButton).toBeDisabled()
    })

  test('should show error for invalid email', async ({ page }) => {
    await page.fill('input[name="email"]', 'invalid-email')
    await page.click('body')
    await expect(page.locator('text=Email is incorrect')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled()
    })

  test('should show error for too short password', async ({ page }) => {
      await page.fill('input[name="password"]', 'Pass1')
      await page.click('body')
      await expect(page.locator('text=Password has to be from 8 to 15 characters long')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled()
    })

    test('should show error that passwords do no match', async ({ page }) => {
      await page.fill('input[name="password"]', 'Password123')
      await page.fill('input[name="repeatPassword"]', 'Password321')
      await page.click('body')
      await expect(page.locator('text=Passwords do not match')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled()
    })

    test('should keep register button disabled if only one field is filled', async ({ page }) => {
      await page.fill('input[name="name"]', 'John')
      await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled()
    })
})