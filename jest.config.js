/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom', // インストールしたものを指定
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
}
