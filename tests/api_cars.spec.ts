import { test, expect, request } from '@playwright/test';

const BASE_URL = 'https://qauto.forstudy.space/api';
const VALID_USER = { email: 'Test@gmail.cox', password: 'Password123', remember: false };

async function getAuthToken(context) {
  const response = await context.post(`${BASE_URL}/auth/signin`, {
    data: VALID_USER,
  });
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log('Auth response:', responseBody);
  return responseBody.data.access_token;
}

test.describe('API tests for /api/cars', () => {
  let context;
  let authToken;

  test.beforeAll(async () => {
    context = await request.newContext();
    authToken = await getAuthToken(context);
  });

  test('Positive: Create a new car', async () => {
    const response = await context.post(`${BASE_URL}/cars`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { carBrandId: 1, carModelId: 1, mileage: 1000 },
    });
    console.log('Status:', response.status());
    console.log('Response:', await response.text());
    expect(response.status()).toBe(201);
  });

  test('Negative: Create a car without mileage', async () => {
    const response = await context.post(`${BASE_URL}/cars`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { carBrandId: 1, carModelId: 1, }
    });
    console.log('Status:', response.status());
    console.log('Response:', await response.text());
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toContain('Mileage cost required');
  });

  test('Negative: Create a car with negative mileage', async () => {
    const response = await context.post(`${BASE_URL}/cars`, {
      headers: { Authorization: `Bearer ${authToken}` },
      data: { carBrandId: 2, carModelId: 1, mileage: -1 },
    });
    console.log('Status:', response.status());
    console.log('Response:', await response.text());
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.message).toContain('Mileage has to be from 0 to 999999');
  });
});
