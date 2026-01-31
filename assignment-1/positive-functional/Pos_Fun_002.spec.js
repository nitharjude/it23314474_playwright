// Pos_Fun_002: General sentence conversion – from IT23314474 lllPlaywright.xlsx
// Expected: இன்று மிகவும் அழகான நாள்

const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'indru migavum azhagana naal';
const EXPECTED_TAMIL = 'இன்று மிகவும் அழகான நாள்';

test('Pos_Fun_002 – General sentence conversion (S, 27 chars)', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  const expectedNormalized = EXPECTED_TAMIL.replace(/\s+/g, ' ').trim();
  expect(normalized).toBe(expectedNormalized);
});
