// Pos_Fun_019: General sentence conversion – from IT23314474 lllPlaywright.xlsx
const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'naan padichu kathukitta vishayangal ellam enakku indru romba udhavi aa irukku. adhanaala thodarndhu kathukiradhu romba avasiyam';
const EXPECTED_TAMIL = 'நான்  படிச்சு  கத்துகிட்ட  விஷயங்கள்  எல்லாம்   எனக்கு  இன்று  ரொம்ப  உதவியா  இருக்கு . அதனால  தொடர்ந்து  கத்துகிறது  ரொம்ப  அவசியம்';

test('Pos_Fun_019 – General sentence conversion', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  expect(normalized).toBe(EXPECTED_TAMIL.replace(/\s+/g, ' ').trim());
});
