// Neg_Fun_007: Greeting phrase conversion – from IT23314474 lllPlaywright.xlsx
const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'mazhai kaalam varum bodhu road la traffic jam adhigamaa irukkum adhanaala office ku reach aagura time late aagum, adhu pala peroda daily schedule affect pannum. aana naan weather report check panni early aa start panna try pannren. idhu enakku work life manage panna romba useful aa irukku';
const EXPECTED_TAMIL = 'மழை  காலம்  வரும்  போது  road ல traffic jam அதிகமா  இருக்கும்  அதனால  office கு  reach ஆகுற  time late ஆகும் , அது  பல  பேரோட  daily schedule affect பண்ணும் . ஆனா  நான்  weather report check பண்ணி  early ஆ  start பண்ண  try பண்ணறேன் . இது  எனக்கு  work life manage பண்ண ரொம்ப  useful ஆ  இருக்கு';

test('Neg_Fun_007 – Greeting phrase conversion', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  expect(normalized).toBe(EXPECTED_TAMIL.replace(/\s+/g, ' ').trim());
});
