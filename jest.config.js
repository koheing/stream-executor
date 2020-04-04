module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)+(test).ts?(x)',
    '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
  ],
  transformIgnorePatterns: ['node_modules'],
  modulePaths: ['src'],
  globals: {
    'ts-jest': {
      babelConfig: true,
    },
  },
}
