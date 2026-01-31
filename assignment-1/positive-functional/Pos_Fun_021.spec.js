// Pos_Fun_021: Greeting phrase conversion – from IT23314474 lllPlaywright.xlsx
const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'mazhai kaalam varum bodhu vazhigal sila neram kashtamaa irukkum. aana munnaadiye plan panninaa pala prachanaigalai thavirkka mudiyum';
const EXPECTED_TAMIL = 'மழை  காலம்  வரும்  போது  வழிகள்  சில  நேரம்  கஷ்டமா  இருக்கும் . ஆனா  முன்னாடியே  திட்டம்  பண்ணினா  பல  பிரச்சனைகளை  தவிர்க்க  முடியும்';

test('Pos_Fun_021 – Greeting phrase conversion', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  expect(normalized).toBe(EXPECTED_TAMIL.replace(/\s+/g, ' ').trim());
});
