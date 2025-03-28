import { chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');

  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByLabel('Email').fill(process.env.USER_EMAIL!);
  await page.getByLabel('Password').fill(process.env.USER_PASSWORD!);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.waitForURL('**/garage');

  await page.context().storageState({ path: 'storage/user.json' });

  await browser.close();
})();