// Pos_Fun_024: Greeting phrase conversion (M, 263 chars) – from IT23314474 lllPlaywright.xlsx
const { test, expect } = require('@playwright/test');
const { BASE_URL, typeThanglishAndConvert, getOutputText } = require('../fixtures');

const INPUT_THANGLISH = 'engal veetla vidumurai naal vandhaa kaalaila irundhu saayngaalam varaikkum pala velai nadakkum, amma samayal seivaanga appa veetu velai seivaanga naan udhavi seiven. madhiyam saapadu mudinja apram ellaarum konjam oivu eduppom. andha neram romba amaidhiyaa irukkum';
const EXPECTED_TAMIL = 'எங்கள்  வீட்ல  விடுமுறை  நாள்  வந்தா  காலைல  இருந்து  சாயங்காலம்  வரைக்கும்  பல  வேலை  நடக்கும் , அம்மா  சமையல் செய்வாங்க  அப்பா  வீடு  வேலை  செய்வாங்க  நான்  உதவி  செய்வேன் . மதியம்  சாப்பாடு  முடிஞ்சா  அப்புறம்  எல்லாரும்  கொஞ்சம்  ஓய்வு  எடுப்போம் . அந்த  நேரம்  ரொம்ப  அமைதியா  இருக்கும்';

test('Pos_Fun_024 – Greeting phrase conversion (M, 263 chars)', async ({ page }) => {
  await page.goto(BASE_URL);
  await typeThanglishAndConvert(page, INPUT_THANGLISH);
  const output = await getOutputText(page);
  expect(output.trim()).toBeTruthy();
  expect(output).toMatch(/[\u0B80-\u0BFF]/);
  const normalized = output.replace(/\s+/g, ' ').trim();
  expect(normalized).toBe(EXPECTED_TAMIL.replace(/\s+/g, ' ').trim());
});
