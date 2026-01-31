// Pos_Fun_018: Greeting phrase conversion – from IT23314474 lllPlaywright.xlsx
const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'vaazhkaila sila neram thadaigal varum. aana manasai thidamaa vachikittu munnaadi ponaa, ellaa kashtangalaiyum thaandi pogalaam';
const EXPECTED_TAMIL = 'வாழ்க்கைல  சில  நேரம்  தடைகள்  வரும் . ஆனா  மனசை  திட்டமா  வச்சிக்கிட்டு  முன்னாடி  போனா , எல்லா  கஷ்டங்களையும்  தாண்டி  போகலாம்';

test('Pos_Fun_018 – Greeting phrase conversion', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  expect(normalized).toBe(EXPECTED_TAMIL.replace(/\s+/g, ' ').trim());
});
