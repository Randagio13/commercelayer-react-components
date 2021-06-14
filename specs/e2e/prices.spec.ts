import { chromium, Browser, Page, BrowserContext } from 'playwright'
import expect from 'expect'
import path from 'path'
const endpointURL = `${process.env.__ENDPOINT__}/prices`
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
  // await page.route('**/oauth/token', (route) => {
  //   // console.log(`route`, route.request())
  //   // return route
  //   return route.fulfill({
  //     status: 200,
  //     body: JSON.stringify({
  //       access_token:
  //         'eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJ6WG1iWkZQUG5PIiwic2x1ZyI6InRoZS1ibHVlLWJyYW5kLTIifSwiYXBwbGljYXRpb24iOnsiaWQiOiJncFpiRGlYUnBiIiwia2luZCI6ImludGVncmF0aW9uIiwicHVibGljIjpmYWxzZX0sInRlc3QiOnRydWUsImV4cCI6MTYyMzQyOTMyMCwibWFya2V0Ijp7ImlkIjpbIkFqUmV2aFdhb2EiXSwicHJpY2VfbGlzdF9pZCI6ImprRHFRQ1ZabG0iLCJzdG9ja19sb2NhdGlvbl9pZHMiOlsiYm5FZVF1cXlucCIsInFucE95dXlETVIiXSwiZ2VvY29kZXJfaWQiOm51bGwsImFsbG93c19leHRlcm5hbF9wcmljZXMiOmZhbHNlfSwicmFuZCI6MC4xMjMwMTMyODUwNDI4MzQ1fQ.37MaAJDQ8_QPNFQtk5sXbvFlCiK3LQHmCM6gG0GhSUPBaOQMlHuQ_V13wK2kTzkAzuTtEtmulabAeoEqolA78g',
  //       token_type: 'Bearer',
  //       expires_in: 4207,
  //       scope: 'market:48',
  //       created_at: 1623422120,
  //     }),
  //   })
  // })
})

afterEach(async () => {
  // @ts-ignore
  await jestPlaywright.saveCoverage(page)
  await page.close()
  await context.close()
})

it('should work', async () => {
  await page.goto(endpointURL)
  const response = await page.waitForResponse('**/oauth/token')
  console.log(`response`, await response.json())
  const loading = await page.waitForSelector('text=Caricamento...')
  expect(await loading.textContent()).toBe('Caricamento...')
  const firstPrice = await page.textContent(
    ':nth-match([data-test="price-0"], 1)'
  )
  const compareFirstPrice = await page.textContent(
    ':right-of(:nth-match([data-test="price-0"], 1))'
  )
  const sndPrice = await page.textContent(
    ':nth-match([data-test="multi-price-0"], 2)'
  )
  const compareSndPrice = await page.textContent(
    ':right-of(:nth-match([data-test="multi-price-0"], 2))'
  )
  expect(firstPrice).toBe('€29,00')
  expect(compareFirstPrice).toBe('€37,70')
  expect(sndPrice).toBe('$34.80')
  expect(compareSndPrice).toBe('$45.24')
  await page.screenshot({
    path: path.join(__dirname, 'screenshots', 'prices.jpg'),
  })
})
