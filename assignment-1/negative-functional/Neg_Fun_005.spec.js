// Neg_Fun_005: Greeting phrase conversion – from IT23314474 lllPlaywright.xlsx
const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'naan kathukitta vishayangal ellam book la mattum illa daily life la use panna aarambichadhukku apram dhaan unmaiyaana purithal vandhadhu, mistakes panninaalum adhil irundhu kathukitten. indha learning habit enakku future la romba udhavi aa irukkum. idhai naan thodarndhu follow panna aasai padren';
const EXPECTED_TAMIL = 'நான்  கத்துகிட்ட  விஷயங்கல்  எல்லாம்  book ல  மட்டும்  இல்ல  daily life la use பண்ண  ஆரம்பிச்சதுக்கு  அப்புறம்  தான்  உண்மையான  புரிதல்  வந்தது';

test('Neg_Fun_005 – Greeting phrase conversion', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  expect(normalized).toContain(EXPECTED_TAMIL.replace(/\s+/g, ' ').trim().slice(0, 80));
});
