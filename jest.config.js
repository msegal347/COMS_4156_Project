module.exports = {

  //globalSetup: './config/setup.js',

  //globalTeardown: './config/teardown.js',

  roots: ['<rootDir>/src', '<rootDir>/test'],
  
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
    'node_modules/axios': 'babel-jest',
  },
  
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/main.ts', 
  ],
  
  testEnvironment: 'node',

  transformIgnorePatterns: ['<rootDir>/node_modules/', 'node_modules/(?!(axios)/)'],
};
