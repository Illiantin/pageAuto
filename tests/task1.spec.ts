import { test, expect } from '@playwright/test';
import { Registration } from '../pages/Registration';
import { HomePage } from '../pages/HomePage';

const BASE_URL = 'https://guest:welcome2qauto@qauto.forstudy.space';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto(BASE_URL);
    await homePage.clickSignIn();
    await homePage.clickRegister();
})

test.describe('positive registration test', () => {
  test('should successfully register a new user', async ({ page }) => {
    const registration = new Registration(page);
    await registration.registerUser('John', 'Doe', `aqa-${Date.now()}@test.com`, 'Password123', 'Password123');
    })
})

test.describe('negative registration form tests', () => {
  test('should keep the Register button disabled when all fields are empty', async ({ page }) => {
    const registration = new Registration(page);
    await expect(registration.registerButton).toBeDisabled();
    })

  test('should show error for invalid email', async ({ page }) => {
    const registration = new Registration(page);
    await registration.emailInput.fill('invalid-email');
    await page.click('body');
    await expect(registration.emailError).toBeVisible();
    await expect(registration.registerButton).toBeDisabled();
    })

  test('should show error for too short password', async ({ page }) => {
    const registration = new Registration(page);
    await registration.passwordInput.fill('Pass1');
    await page.click('body');
    await expect(registration.passwordError).toBeVisible();
    await expect(registration.registerButton).toBeDisabled();
    })

    test('should show error that passwords do no match', async ({ page }) => {
    const registration = new Registration(page);
    await registration.passwordInput.fill('Password123');
    await registration.repeatPasswordInput.fill('Password321');
    await page.click('body');
    await expect(registration.passwordMismatchError).toBeVisible();
    await expect(registration.registerButton).toBeDisabled();
    })

    test('should keep register button disabled if only one field is filled', async ({ page }) => {
    const registration = new Registration(page);
    await registration.firstNameInput.fill('John');
    await expect(registration.registerButton).toBeDisabled();
    })
})