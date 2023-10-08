module.exports = {
    roots: ['COMS_4156_Project/src'],
  
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
  
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  
    collectCoverage: true,
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!src/main.ts', 
    ],
  
    testEnvironment: 'node',
  
};
  