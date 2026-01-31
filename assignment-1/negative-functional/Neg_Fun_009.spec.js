// Neg_Fun_009: General sentence conversion – from IT23314474 lllPlaywright.xlsx
const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'naan college padikkum kaalathula assignments submissions exams preparation ellam romba challenging aa irundhuchu, friends oda group study panninadhu enakku romba help panniduchu. teachers guidance um online resources um use panni concepts clear panninen. indha experiences ellam ippo job interview face panna enakku confidence kudukku';
const EXPECTED_TAMIL = 'நான்  college படிக்கும்  காலத்துல  assignments submissions exams preparation எல்லாம்  ரொம்ப  challengingaa இருந்துச்சு , friends ஓட  group study பண்ணினது  எனக்கு  ரொம்ப  help பண்ணிடுச்சு . teachers guidance உம்online resources உம் use பண்ணி   concepts clear பண்ணினேன் . இந்த  experiences எல்லாம்  இப்போ  job interview face பண்ண  எனக்கு confidence குடுக்கு';

test('Neg_Fun_009 – General sentence conversion', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  expect(normalized).toBe(EXPECTED_TAMIL.replace(/\s+/g, ' ').trim());
});
