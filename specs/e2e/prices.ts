import { chromium, Browser, Page } from 'playwright'
import expect from 'expect'

let browser: Browser
let page: Page

beforeAll(async () => {
  browser = await chromium.launch()
})

afterAll(async () => {
  await browser.close()
})

beforeEach(async () => {
  page = await browser.newPage()
})

afterEach(async () => {
  await page.close()
})

it('should work', async () => {
  await page.goto('http://www.example.com/')
  await page.screenshot({ path: 'test.png' })
  expect(await page.title()).toBe('Example Domain')
})
