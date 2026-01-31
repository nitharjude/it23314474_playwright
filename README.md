# Playwright-Assignment-1-IT23316768

Assignment-1 tests for **Thanglish-to-Tamil conversion** at [https://tamil.changathi.com/](https://tamil.changathi.com/).  
Scope: accuracy of conversion, stability and usability of the UI.  
No backend API, performance, or security testing.

---

## Prerequisites

- **Node.js** 18 or newer  
- **npm** (comes with Node.js) or **yarn**

---

## How to install

### 1. Install Node.js and npm

If `node` or `npm` is not recognized in the terminal:

1. Download **Node.js LTS** from [https://nodejs.org](https://nodejs.org) and run the installer.
2. **Close all terminals and Cursor**, then open a **new** terminal (PATH updates only apply to new sessions).
3. Check:
   ```powershell
   node --version
   npm --version
   ```
   You should see version numbers. If not, restart the PC and try again.

### 2. Install project dependencies

From the **project folder** (the folder that contains `package.json`):

```bash
npm install
```

### 3. Install Playwright browser (Chromium)

Tests are configured to run in **Chromium** only. Install it once:

```bash
npx playwright install chromium
```

---

## How to run

**Always run commands from the project folder** (the folder that contains `package.json`).

### Run all tests (Chromium)

```bash
npm test
```

or explicitly:

```bash
npm run test:chromium
```

Runs **34 tests** in Chromium only (1 worker). Allow a few minutes for the full run.

### Run by test suite

| Command | Description |
|--------|-------------|
| `npm run test:positive` | Positive functional only (24 tests) |
| `npm run test:negative` | Negative functional only (10 tests) |

### Run with visible browser (headed)

```bash
npm run test:chromium:headed
```

or:

```bash
npm run test:headed
```

Opens a Chromium window so you can watch the tests run.

### Run a single test

```bash
npm run test:pos1
```

Runs `Pos_Fun_001` only. Other single-test scripts: `test:pos2`, … `test:pos24` (see `package.json`).

### Using npx directly

```bash
npx playwright test
npx playwright test --project=chromium
npx playwright test --project=chromium --headed
npx playwright test assignment-1/positive-functional/Pos_Fun_001.spec.js
```

---

## Project layout

```
assignment-1/
├── fixtures.js              # Shared helpers (editor, type, output)
├── positive-functional/     # 24 specs – Pos_Fun_001 … Pos_Fun_024
├── negative-functional/     # 10 specs – Neg_Fun_001 … Neg_Fun_010
└── ui-testcases/            # (no specs – from IT23314474 lllPlaywright.xlsx)
```

- **Positive functional**: valid Thanglish input → expected Tamil output (24 tests from IT23314474 lllPlaywright.xlsx).  
- **Negative functional**: mixed/edge conversion cases (10 tests from IT23314474 lllPlaywright.xlsx).

Tests target the main editor (`#transliterateTextarea`). If the site UI changes, update `assignment-1/fixtures.js`.

---

## If you get errors (troubleshooting)

### “npx” or “node” is not recognized

- **Cause:** Node.js is not installed or not on PATH.  
- **Fix:** Install Node.js LTS from [nodejs.org](https://nodejs.org), **close all terminals and Cursor**, open a new terminal, then run `node --version` and `npm install` again from the project folder.

### “Browser not found” / “Executable doesn’t exist”

- **Cause:** Chromium is not installed.  
- **Fix:** From the project folder run:
  ```bash
  npx playwright install chromium
  ```

### Editor not found (timeout)

- **Cause:** Site structure or selector changed (e.g. editor inside iframe).  
- **Fix:** Run one test with a visible browser to see what loads:
  ```bash
  npx playwright test assignment-1/positive-functional/Pos_Fun_001.spec.js --headed --project=chromium
  ```
  If the editor is in an iframe, update `assignment-1/fixtures.js` to switch to that frame before using the editor.

### Output empty or still in Thanglish

- **Cause:** Conversion delay or site changed (e.g. separate output element).  
- **Fix:** `fixtures.js` already waits 800 ms after typing. If the site now has a separate output element, change `getOutputText` in `fixtures.js` to read from that element.

### Network / site not loading

- **Cause:** [https://tamil.changathi.com/](https://tamil.changathi.com/) not reachable or slow.  
- **Fix:** Open the URL in a normal browser first. If it’s slow, increase `navigationTimeout` or `actionTimeout` in `playwright.config.js`.

### EPERM / “scandir … WinSAT” (Windows)

- **Cause:** Playwright/Node touching a restricted temp folder.  
- **Fix:** Run from the **project folder**, not from your user folder. If it still happens, use a different temp folder for that session:

  **PowerShell:**
  ```powershell
  $env:TEMP = "$env:USERPROFILE\playwright-temp"
  if (-not (Test-Path $env:TEMP)) { New-Item -ItemType Directory -Path $env:TEMP -Force }
  npm test
  ```

  **CMD:**
  ```cmd
  set TEMP=%USERPROFILE%\playwright-temp
  if not exist "%TEMP%" mkdir "%TEMP%"
  npm test
  ```

### NO_COLOR / FORCE_COLOR warning in terminal

- **Cause:** IDE sets `FORCE_COLOR`; scripts no longer set `NO_COLOR` to avoid this.  
- **Fix:** If you see it when using `npx playwright test` directly, you can ignore it or use the npm scripts (`npm run test:chromium`, etc.) which use `NODE_OPTIONS=--no-warnings`.

### Some tests fail (e.g. Pos_Fun_012, Pos_Fun_013)

- **Cause:** Site output differs from Excel expected (e.g. place name “jaffna”, numbers “10”).  
- **Fix:** Either update the expected values in the spec to match current site behavior, or treat as known differences until the site is updated.

---

## Quick reference

```bash
# Install (once)
npm install
npx playwright install chromium

# Run all tests (Chromium)
npm test
# or
npm run test:chromium

# Run by suite
npm run test:positive       # 3 positive functional tests
npm run test:ui             # 31 UI tests

# Run with visible browser
npm run test:chromium:headed
npm run test:headed         # same

# Run a single test
npm run test:pos1           # Pos_Fun_001
npm run test:pos2           # Pos_Fun_002
# … test:pos3 … test:pos24

# Debug / UI mode
npm run test:debug-pos1     # Debug Pos_Fun_001 with inspector
npm run test:open-ui        # Playwright interactive UI mode
```
