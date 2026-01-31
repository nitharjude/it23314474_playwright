// Neg_Fun_006: Greeting phrase conversion – from IT23314474 lllPlaywright.xlsx
const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'pudhu company la join pannum bodhu system login email access software tools ellam konjam confuse aa irundhuchu, aana seniors help panninaala ellam clear aa purinjadhu. daily standup meeting la naan enna work panninen nu update solla aarambichirukken. ippo naan indha work environment ku nalla adapt aagitten';
const EXPECTED_TAMIL = 'புது  company la join பண்ணும்  போது  system login email access software tools எல்லாம்  கொஞ்சம்  confuse aa இருந்துச்சு ,';

test('Neg_Fun_006 – Greeting phrase conversion', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  expect(normalized).toContain(EXPECTED_TAMIL.replace(/\s+/g, ' ').trim().slice(0, 60));
});
