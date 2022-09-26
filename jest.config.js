/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['src/api'],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
  },
};
