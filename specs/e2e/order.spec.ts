import { test, expect } from './baseFixtures'
import path from 'path'
import '../config/dotenv-config'
const endpointURL = `${process.env.__ENDPOINT__}/prices`

test('Prices page', async ({ page, browser }) => {
  await page.coverage.startJSCoverage()
  await page.goto(endpointURL)
  await page.coverage.stopJSCoverage()
  await browser.close()
})
