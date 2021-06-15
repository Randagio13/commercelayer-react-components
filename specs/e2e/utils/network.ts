import { existsSync, readFileSync } from 'fs'
import { writeFileSync } from 'fs'
import find from 'lodash/find'
import path from 'path'
import { Response } from 'playwright'
const RECORD = process.env.RECORD
const requests: Record<string, any>[] = []
const defaultPath = path.resolve(process.cwd(), 'specs', 'e2e', 'fixtures')
export async function recordNetwork(response: Response) {
  if (response.request().resourceType() === 'xhr' && RECORD) {
    const body = await response.json()
    debugger
    requests.push({
      url: response.url(),
      body,
    })
  }
  return response
}

export async function saveNetworkRequests(
  filename: string,
  filePath = defaultPath
) {
  if (RECORD) {
    try {
      writeFileSync(
        path.join(filePath, `${filename}.json`),
        JSON.stringify(requests),
        { flag: 'w+' }
      )
      console.log(`File is written successfully!`)
    } catch (error) {
      console.error(error)
    }
  }
}

export function getStubData(
  url: string,
  filename: string,
  filePath: string = defaultPath
): undefined | string {
  if (!RECORD && existsSync(path.join(filePath, `${filename}.json`))) {
    const data = readFileSync(path.join(filePath, `${filename}.json`), {
      encoding: 'utf8',
    })
    const filterData = find(JSON.parse(data), { url })
    return JSON.stringify(filterData.body)
  }
  return
}
