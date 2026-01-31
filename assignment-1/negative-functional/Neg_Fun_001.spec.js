// Neg_Fun_001: General sentence conversion – from IT23314474 lllPlaywright.xlsx
const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'konjam help pannu';
const EXPECTED_TAMIL = 'கொஞ்சம்  help பண்ணு';

test('Neg_Fun_001 – General sentence conversion', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  expect(normalized).toBe(EXPECTED_TAMIL.replace(/\s+/g, ' ').trim());
});
