// https://github.com/playwright-community/jest-playwright/#configuration
module.exports = {
  browsers: [
    'chromium',
    // 'firefox', 'webkit'
  ],
  serverOptions: {
    command: `npm run dev`,
    port: 3000,
    launchTimeout: 10000,
    debug: true,
  },
  launchOptions: {
    executablePath: process.env.PLAYWRIGHT_CHROME_EXECUTABLE_PATH,
  },
  collectCoverage: true,
}
