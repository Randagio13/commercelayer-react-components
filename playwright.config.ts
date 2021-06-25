// https://github.com/playwright-community/jest-playwright/#configuration
import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: 'specs/e2e',
  use: {
    // Browser options
    headless: true,
    slowMo: 50,

    // Context options
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    // Artifacts
    screenshot: 'only-on-failure',
    video: 'retry-with-video',
  },
  projects: [
    {
      name: 'Chromium',
      use: {
        // Configure the browser to use.
        browserName: 'chromium',
        // Any Chromium-specific options.
        viewport: { width: 600, height: 800 },
      },
    },
    // {
    //   name: 'Firefox',
    //   use: { browserName: 'firefox' },
    // },

    // {
    //   name: 'WebKit',
    //   use: { browserName: 'webkit' },
    // },
  ],
  // browsers: [
  //   'chromium',
  //   // 'firefox', 'webkit'
  // ],
  // serverOptions: {
  //   command: `npm run dev`,
  //   port: 3000,
  //   launchTimeout: 10000,
  //   debug: true,
  // },
  // launchOptions: {
  //   executablePath: process.env.PLAYWRIGHT_CHROME_EXECUTABLE_PATH,
  // },
  // collectCoverage: true,
}

export default config
