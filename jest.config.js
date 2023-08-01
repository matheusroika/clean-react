module.exports = {
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/domain/errors/**',
    '!<rootDir>/src/validation/errors/**',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.*\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy'
  }
}
