// Pos_Fun_020: General sentence conversion – from IT23314474 lllPlaywright.xlsx
const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'kudumbathoda serndhu irukkum nerangal romba mukkiyam. siru sandai vandhaalum adhai sari pannitu ellaarum serndhu irukkanum';
const EXPECTED_TAMIL = 'குடும்பத்தோட  சேர்ந்து  இருக்கும்  நேரங்கள்  ரொம்ப  முக்கியம் . சிறு  சண்டை  வந்தாலும்  அதை  சரி  பண்ணிட்டு  எல்லாரும்  சேர்ந்து  இருக்கணும்';

test('Pos_Fun_020 – General sentence conversion', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  expect(normalized).toBe(EXPECTED_TAMIL.replace(/\s+/g, ' ').trim());
});
