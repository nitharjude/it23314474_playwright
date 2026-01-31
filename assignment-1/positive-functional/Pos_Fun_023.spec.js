// Pos_Fun_023: Greeting phrase conversion – from IT23314474 lllPlaywright.xlsx
const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'vaazhkaila ovvoru manushanukkum sila thadaigal kandippa varum adhai paathu bayandhu nikkama munnaadi poganum, nambikkaiyum porumaiyum romba mukkiyam. ivai rendu irundhaa endha kashtathaiyum thaandi nalla vazhiya uruvaakka mudiyum. indha thathuvam enakku romba pidichadhaa irukku';
const EXPECTED_TAMIL = 'வாழ்க்கைல  ஒவ்வொரு  மனுஷனுக்கு  சில  தடைகள்  கண்டிப்பா  வரும்  அதை  பாத்து  பயந்து  நிக்காம  முன்னாடி போகணும் , நம்பிக்கையும்  பொறுமையும்  ரொம்ப  முக்கியம் . இவை  ரெண்டு  இருந்தா  எந்த  கஷ்டத்தையும்  தாண்டி  நல்ல  வழிய   உருவாக்க  முடியும் . இந்த  தத்துவம்  எனக்கு  ரொம்ப   பிடிச்சதா  இருக்கு';

test('Pos_Fun_023 – Greeting phrase conversion', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  expect(normalized).toBe(EXPECTED_TAMIL.replace(/\s+/g, ' ').trim());
});
