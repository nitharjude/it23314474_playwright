// Helpers for tamil.changathi.com tests

const BASE_URL = 'https://tamil.changathi.com/';

async function getEditorLocator(page) {
  const mainEditor = page.locator('#transliterateTextarea');
  await mainEditor.waitFor({ state: 'visible', timeout: 10000 });
  return mainEditor;
}

async function typeThanglishAndConvert(page, text) {
  const editor = await getEditorLocator(page);
  await editor.click();
  await editor.press('Control+a');
  await editor.press('Backspace');
  await page.waitForTimeout(100);
  const words = text.trim().split(/\s+/);
  for (const word of words) {
    await editor.type(word, { delay: 50 });
    await editor.press('Space');
    await page.waitForTimeout(200);
  }
  await page.waitForTimeout(800);
  return editor;
}

async function getOutputText(page) {
  const editor = await getEditorLocator(page);
  const fromEl = await editor.evaluate((el) => (el.innerText || el.textContent || '').trim());
  if (fromEl) return fromEl;
  return (await editor.inputValue()) || (await editor.textContent()) || '';
}

async function clearEditor(page) {
  const editor = await getEditorLocator(page);
  await editor.click();
  await editor.press('Control+a');
  await editor.press('Backspace');
  await page.waitForTimeout(300);
}

module.exports = { BASE_URL, getEditorLocator, typeThanglishAndConvert, getOutputText, clearEditor };
