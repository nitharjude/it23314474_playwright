const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './assignment-1',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'https://tamil.changathi.com',
    traceOnFirstRetry: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  // Chromium only – avoids NO_COLOR/FORCE_COLOR warning when run from IDE
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(process.env.PWDEBUG || process.env.USE_CHROME_FOR_DEBUG
          ? { channel: 'chrome' }
          : {}),
        launchOptions: {
          args: [
            '--disable-gpu',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-software-rasterizer',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
          ],
        },
      },
    },
  ],
});
