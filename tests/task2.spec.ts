import { test, expect } from '../fixtures/userGaragePage';

test('User is logged in and sees the garage page', async ({ userGaragePage }) => {
  await expect(userGaragePage).toHaveURL(/.*garage/);
  await expect(userGaragePage.getByRole('button', { name: 'Add car' })).toBeVisible();
});
