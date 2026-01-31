// Pos_Fun_001: General sentence conversion – from IT23314474 lllPlaywright.xlsx
// Expected: உங்கள் சமையல் நல்ல இருந்தது

const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'ungal samayal nalla irunthathu';
const EXPECTED_TAMIL = 'உங்கள் சமையல் நல்ல இருந்தது';

test('Pos_Fun_001 – General sentence conversion (S, 30 chars)', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  const expectedNormalized = EXPECTED_TAMIL.replace(/\s+/g, ' ').trim();
  expect(normalized).toBe(expectedNormalized);
});
