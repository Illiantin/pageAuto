import { test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

test('Login and save storage state', async ({ page }) => {
  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');

  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByLabel('Email').fill(process.env.USER_EMAIL!);
  await page.getByLabel('Password').fill(process.env.USER_PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.waitForURL('**/garage');

  await page.context().storageState({ path: 'storage/user.json' });
});
