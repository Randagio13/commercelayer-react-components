import { chromium, Browser, Page, BrowserContext } from 'playwright'
import expect from 'expect'
import path from 'path'
import {
  getStubData,
  recordNetwork,
  saveNetworkRequests,
} from './utils/network'
import { isEmpty } from 'lodash'
const endpointURL = `${process.env.__ENDPOINT__}/prices`
const filename = 'prices-requests'
let browser: Browser
let page: Page
let context: BrowserContext

beforeAll(async () => {
  browser = await chromium.launch({
    devtools: true,
    headless: false,
  })
})

afterAll(async () => {
  await browser.close()
})

beforeEach(async () => {
  context = await browser.newContext()
  await context.route('**/*.{png,jpg,jpeg}**', (route) => route.abort())
  await context.route('**/oauth/token', (route) => {
    // const url = route.request().url()
    // const body = getStubData(url, filename)
    // console.log(`object`, route.request().postData())
    // if (route.request().postData().includes('grant_type'))
    route.fulfill({
      headers: route.request().headers(),
      body: JSON.stringify({
        access_token:
          'eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJ6WG1iWkZQUG5PIiwic2x1ZyI6InRoZS1ibHVlLWJyYW5kLTIifSwiYXBwbGljYXRpb24iOnsiaWQiOiJncFpiRGlYUnBiIiwia2luZCI6ImludGVncmF0aW9uIiwicHVibGljIjpmYWxzZX0sInRlc3QiOnRydWUsImV4cCI6MTYyMzc1NjMzNCwibWFya2V0Ijp7ImlkIjpbIkFqUmV2aFdhb2EiXSwicHJpY2VfbGlzdF9pZCI6ImprRHFRQ1ZabG0iLCJzdG9ja19sb2NhdGlvbl9pZHMiOlsiYm5FZVF1cXlucCIsInFucE95dXlETVIiXSwiZ2VvY29kZXJfaWQiOm51bGwsImFsbG93c19leHRlcm5hbF9wcmljZXMiOmZhbHNlfSwicmFuZCI6MC41NjQ1MDI0MTI4NzcwNTg0fQ.9RfDpkB9tHQwCoZAM-ijwOeBrRVHLl7eSeGl6L3p1U5WKCUl_WBEv55WquZBV52zj59hnVqCQSneEsNHh2A4yg',
        token_type: 'Bearer',
        expires_in: 1160,
        scope: 'market:48',
        created_at: 1623749134,
      }),
    })
    // route.continue()
    // return route.fulfill({
    //   status: 200,
    //   body: JSON.stringify({
    //     access_token:
    //       'eyJhbGciOiJIUzUxMiJ9.eyJvcmdhbml6YXRpb24iOnsiaWQiOiJ6WG1iWkZQUG5PIiwic2x1ZyI6InRoZS1ibHVlLWJyYW5kLTIifSwiYXBwbGljYXRpb24iOnsiaWQiOiJncFpiRGlYUnBiIiwia2luZCI6ImludGVncmF0aW9uIiwicHVibGljIjpmYWxzZX0sInRlc3QiOnRydWUsImV4cCI6MTYyMzY5NDQ3NCwibWFya2V0Ijp7ImlkIjpbIkFqUmV2aFdhb2EiXSwicHJpY2VfbGlzdF9pZCI6ImprRHFRQ1ZabG0iLCJzdG9ja19sb2NhdGlvbl9pZHMiOlsiYm5FZVF1cXlucCIsInFucE95dXlETVIiXSwiZ2VvY29kZXJfaWQiOm51bGwsImFsbG93c19leHRlcm5hbF9wcmljZXMiOmZhbHNlfSwicmFuZCI6MC4yMzgxMDc1NzA5ODI0NTM3fQ.zZtaDuR1hQ8Y2TCd0t2gtX1NG57SGEN7HSXs-s0lHZd5iyzeCEqaz_prKfvc2Hl1HZFQ_ri3npV3vR6VaPtzug',
    //     token_type: 'Bearer',
    //     expires_in: 7200,
    //     scope: 'market:48',
    //     created_at: 1623687274,
    //   }),
    // })
  })
  page = await context.newPage()
  page.on('response', recordNetwork)
})

afterEach(async () => {
  await saveNetworkRequests(filename)
  // @ts-ignore
  await jestPlaywright.saveCoverage(page)
  await page.close()
  await context.close()
})

it('should work', async () => {
  await page.goto(endpointURL)
  await page.pause()
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
