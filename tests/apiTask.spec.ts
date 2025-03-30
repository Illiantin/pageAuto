import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test('Mock profile API after login', async ({ page }) => {
    await page.route('**/api/users/profile', async (route) => {
      console.log("Intercepting API request:", route.request().url());
  
      const mockResponse = {
        data: {
          id: 12345,
          name: "Test User",
          email: "mockuser@example.com",
        }
      };
  
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponse)
      });
    });
  
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
  
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByLabel('Email').fill(process.env.USER_EMAIL || "test@example.com");
    await page.getByLabel('Password').fill(process.env.USER_PASSWORD || "TestPassword123");
    await page.getByRole('button', { name: 'Login' }).click();
  
    await page.waitForURL('https://guest:welcome2qauto@qauto.forstudy.space/panel/garage');
  
    await page.goto('https://qauto.forstudy.space/panel/profile');
  
    console.log("Checking if profile page displays mocked user data...");
  
    await expect(page.locator('text=Test User')).toBeVisible();
  });