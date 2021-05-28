module.exports = {
  preset: 'jest-playwright-preset',
  testMatch: ['**/specs/e2e/**/*.spec.[jt]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'babel-jest',
  },
  testTimeout: 30000,
}
