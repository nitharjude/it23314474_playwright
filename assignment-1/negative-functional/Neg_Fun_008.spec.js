// Neg_Fun_008: General sentence conversion – from IT23314474 lllPlaywright.xlsx
const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'naan kathukitta technical skills ellam online course tutorials practice project moolamaa dhaan improve aachu, initial aa mistakes romba irundhuchu. code review session la seniors feedback kuduthadha follow panninen. ippo naan coding la romba confident aa irukken';
const EXPECTED_TAMIL = 'நான்  கத்துகிட்ட  technical skills எல்லாம்  online course tutorials practice project மூலமா  தான்  improve ஆச்சு , initial aa mistakes ரொம்ப  இருந்துச்சு . code review session la seniors feedback கொடுத்ததை follow பண்ணினேன் . இப்போ  நான்  coding la ரொம்ப  confident aa இருக்கேன்';

test('Neg_Fun_008 – General sentence conversion', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  expect(normalized).toBe(EXPECTED_TAMIL.replace(/\s+/g, ' ').trim());
});
