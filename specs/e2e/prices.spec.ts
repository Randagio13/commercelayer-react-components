import { chromium, Browser, Page, BrowserContext } from 'playwright'
import expect from 'expect'
import path from 'path'
const endpointURL = process.env.__ENDPOINT__
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
  // @ts-ignore
  await jestPlaywright.saveCoverage(page)
  await page.close()
  await context.close()
})

it('should work', async () => {
  await page.goto(endpointURL)
  const loading = await page.waitForSelector('text=Caricamento...')
  expect(await loading.textContent()).toBe('Caricamento...')
  const firstPrice = await page.textContent(
    ':nth-match([data-test="price-0"], 1)'
  )
  const compareFirstPrice = await page.textContent(
    ':right-of(:nth-match([data-test="price-0"], 1))'
  )
  const sndPrice = await page.textContent(
    ':nth-match([data-test="price-0"], 2)'
  )
  const compareSndPrice = await page.textContent(
    ':right-of(:nth-match([data-test="price-0"], 2))'
  )
  expect(firstPrice).toBe('€29,00')
  expect(compareFirstPrice).toBe('€37,70')
  expect(sndPrice).toBe('$34.80')
  expect(compareSndPrice).toBe('$45.24')
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'prices.jpg'),
  })
})
