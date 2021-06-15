module.exports = {
  preset: 'jest-playwright-preset',
  testMatch: ['**/specs/e2e/**/*.spec.[jt]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'babel-jest',
  },
  testTimeout: 50000,
  setupFiles: ['<rootDir>/specs/config/dotenv-jest-config.ts'],
}
