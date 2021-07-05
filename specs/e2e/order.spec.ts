import { test, expect } from './baseFixtures'
import '../config/dotenv-config'
const endpointURL = `${process.env.__ENDPOINT__}/order`

test('Order page', async ({ page, browser }) => {
  await page.coverage.startJSCoverage()
  // Go to http://localhost:3000/order
  await page.goto(endpointURL)

  // Select BABYONBU000000E63E7412MX
  await page.selectOption(
    'select[data-test-id="variant-selector"]',
    'BABYONBU000000E63E7412MX'
  )
  // Fill input[type="number"]
  await page.fill('input[data-test-id="quantity-selector"]', '2')

  // Click text=Custom add to cart
  await page.click('button[data-test-id="add-to-cart"]')

  // Select 3
  await page.selectOption('select[data-test-id="line-item-quantity"]', '3')

  // Select BABYONBU000000E63E746MXX
  // await Promise.all([
  //   page.waitForNavigation({ url: endpointURL }),
  // ])
  await page.selectOption(
    'select[data-test-id="variant-selector"]',
    'BABYONBU000000E63E746MXX'
  ),
    // Fill input[type="number"]
    await page.fill('input[data-test-id="quantity-selector"]', '2')

  // Click text=Custom add to cart
  await page.click('button[data-test-id="add-to-cart"]')

  // Select 1
  await page.selectOption('select[data-test-id="line-item-quantity"]', '1')

  // Click text=Remove
  await page.click('a[data-test-id="line-item-remove"]')

  // Select 1
  await page.selectOption('select[data-test-id="line-item-quantity"]', '1')

  // Click text=Remove
  await page.click('a[data-test-id="line-item-remove"]')
  await page.coverage.stopJSCoverage()
  await browser.close()
})
