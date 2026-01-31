// Pos_Fun_017: Greeting phrase conversion (M) – from IT23314474 lllPlaywright.xlsx
const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'naan netru kaalaila veetla irundhu veliya ponaen. vazhila pala peroda sandhippu nadandhadhu. konjam neram pesinom, apram ovvorutharum avanga avanga velaiya seiya ponaanga';
const EXPECTED_TAMIL = 'நான்   நேற்று  காலைல  வீட்ல  இருந்து  வெளிய  போனேன் . வழில  பல  பேரோட  சந்திப்பு  நடந்தது . கொஞ்சம்  நேரம்  பேசினோம் , அப்புறம்  ஒவ்வொருத்தரும்  அவங்க  அவங்க  வேலைய   செய்ய  போனாங்க';

test('Pos_Fun_017 – Greeting phrase conversion', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  expect(normalized).toBe(EXPECTED_TAMIL.replace(/\s+/g, ' ').trim());
});
