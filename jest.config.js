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

  moduleNameMapper: {"axios": "axios/dist/node/axios.cjs"},
  
  testEnvironment: 'node',

  transformIgnorePatterns: ['<rootDir>/node_modules/', 'node_modules/(?!(axios)/)', 'node_modules/axios/'],

  preset: '@shelf/jest-mongodb',

  testPathIgnorePatterns: [
    //'<rootDir>/test/models/',
    //'<rootDir>/test/integrations/',
    //'<rootDir>/test/routes/analyticsRoutes.test.ts',
    //'<rootDir>/test/gateway/gateway.test.ts',
    //'<rootDir>/test/routes/logisticsRoutes.test.ts',
    //'<rootDir>/test/controllers/logisticsController.test.ts',
    //'<rootDir>/test/services/logisticsService.test.ts',
    //'<rootDir>/test/utils/googleMaps.test.ts',

  ],
};
