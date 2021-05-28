import { chromium, Browser, Page, BrowserContext } from 'playwright'
import expect from 'expect'
import path from 'path'
// import jestPlaywright from 'jest-playwright-preset'
// import { collectCoverage } from 'jest-playwright-istanbul'

// import v8toIstanbul from 'v8-to-istanbul'

const endpointURL = 'http://localhost:3000/'
let browser: Browser
let page: Page
let context: BrowserContext

beforeAll(async () => {
  browser = await chromium.launch({
    headless: false,
  })
})

afterAll(async () => {
  await browser.close()
})

beforeEach(async () => {
  context = await browser.newContext()
  page = await context.newPage()
})

afterEach(async () => {
  // const coverage = await page.coverage.stopJSCoverage()
  // for (const entry of coverage) {
  //   const converter = v8toIstanbul('', 0, { source: entry.source as string })
  //   await converter.load()
  //   converter.applyCoverage(entry.functions)
  //   // console.log(JSON.stringify(converter.toIstanbul()))
  // }
  // @ts-ignore
  await jestPlaywright.saveCoverage(page)
  await page.close()
  await context.close()
})

it('should work', async () => {
  await page.goto(endpointURL)
  const content = await page.textContent('[data-test="price-0"]')
  expect(content).toBe('€29,00')
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'prices.jpg'),
  })
})
