module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    coverageReporters: ['text', 'lcov'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    },
    testMatch: ['<rootDir>/tests/**/*.+(test|spec|js)'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
  };
