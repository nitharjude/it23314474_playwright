// Pos_Fun_022: Greeting phrase conversion – from IT23314474 lllPlaywright.xlsx
const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'pudhu velai aarambikkum bodhu konjam bayamum thappu nadandhaa enna aagum nu yosanaigalum irundhadhu, aana naaluku naal kathukittu pogum bodhu andha bayam ellam kuraindhadhu. ippo naan endha velaiyum nambikkaiyoda seiya aarambichirukken';
const EXPECTED_TAMIL = 'புது  வேலை  ஆரம்பிக்கும்  போது  கொஞ்சம்  பயமும்  தப்பு  நடந்தா  என்ன   ஆகும்னு  யோசனைகளும்   இருந்தது , ஆனா  நாளுக்கு  நாள்  கத்துக்கிட்டு  போகும்   போது  அந்த  பயம்  எல்லாம்  குறைந்தது . இப்போ   நான்  எந்த  வேலையும்  நம்பிக்கையோட  செய்ய  ஆரம்பிச்சிருக்கேன்';

test('Pos_Fun_022 – Greeting phrase conversion', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  expect(normalized).toBe(EXPECTED_TAMIL.replace(/\s+/g, ' ').trim());
});
