// Neg_Fun_002: Greeting phrase conversion – from IT23314474 lllPlaywright.xlsx
const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'family oda serndhu irukkum nerangal vaazhkaila romba mukkiyam, sila neram chinna chinna sandai vandhaalum adhai pesi theerthu ellaarum onnaa irukkanum. indha bonding dhaan namakku kashtamana nerangal la balam kudukkum';
const EXPECTED_TAMIL = 'family  ஓட சேர்ந்து  இருக்கும்  நேரங்கள்  வாழ்க்கைல  ரொம்ப முக்கியம் , சில   நேரம்  சின்ன  சின்ன  சண்டை  வந்தாலும்  அதை  பேசி தீர்த்து  எல்லாரும்  ஒண்ணா  இருக்கணும் . இந்த  bonding  தான்  நமக்கு  கஷ்டமான  நேரங்கள்ல  பலம்  குடுக்கும்';

test('Neg_Fun_002 – Greeting phrase conversion', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  expect(normalized).toBe(EXPECTED_TAMIL.replace(/\s+/g, ' ').trim());
});
