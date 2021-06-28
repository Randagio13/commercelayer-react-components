import { test, expect } from './baseFixtures'
import '../config/dotenv-config'
const endpointURL = `${process.env.__ENDPOINT__}/order`

test('Prices page', async ({ page, browser }) => {
  await page.coverage.startJSCoverage()
  await page.goto(endpointURL)
  // Select BABYONBU000000E63E7412MX
  await page.selectOption('select[name="variant1"]', 'BABYONBU000000E63E7412MX')
  // Fill input[type="number"]
  await page.fill('input[data-test-id="quantity-selector"]', '2')
  await page.coverage.stopJSCoverage()
  await browser.close()
})

test('test', async ({ page }) => {
  // Go to http://localhost:3000/order
  await page.goto('http://localhost:3000/order')

  // Select BABYONBU000000E63E7412MX
  await page.selectOption('select[name="variant1"]', 'BABYONBU000000E63E7412MX')

  // Click input[type="number"]
  await page.click('input[type="number"]')

  // Click input[type="number"]
  await page.click('input[type="number"]')

  // Click input[type="number"]
  await page.click('input[type="number"]')

  // Click input[type="number"]
  await page.click('input[type="number"]')

  // Fill input[type="number"]
  await page.fill('input[type="number"]', '2')

  // Click text=Custom add to cart
  await page.click('text=Custom add to cart')

  // Select 3
  await page.selectOption(
    'text=Darth Vader (12 Months)123456789101112131415161718192021222324252627282930313233 >> select',
    '3'
  )

  // Select BABYONBU000000E63E746MXX
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/order' }*/),
    page.selectOption('select[name="variant1"]', 'BABYONBU000000E63E746MXX'),
  ])

  // Click input[type="number"]
  await page.click('input[type="number"]')

  // Click input[type="number"]
  await page.click('input[type="number"]')

  // Fill input[type="number"]
  await page.fill('input[type="number"]', '2')

  // Click text=Custom add to cart
  await page.click('text=Custom add to cart')

  // Select 1
  await page.selectOption(
    'text=Black Baby Onesie Short Sleeve with Pink Logo (6 Months)123456789101112131415161 >> select',
    '1'
  )

  // Click text=Remove
  await page.click('text=Remove')

  // Select 1
  await page.selectOption(
    'text=Darth Vader (12 Months)123456789101112131415161718192021222324252627282930313233 >> select',
    '1'
  )

  // Click text=Remove
  await page.click('text=Remove')
})
