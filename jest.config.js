export default {
  roots: ['<rootDir>/src'],
  testRegex: '(/.*\\.test)\\.(ts|tsx)$',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom'
}