module.exports = {
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/main.ts', 
  ],
  verbose: true,
	projects: [
		{
			displayName: "Jest",
			preset: "ts-jest",
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
      
      testEnvironment: 'node',

      transformIgnorePatterns: ['<rootDir>/node_modules/', 'node_modules/(?!(axios)/)'],

      
		},
		{
			displayName: {
				name: "Jazzer.js",
				color: "cyan",
			},
      preset: "ts-jest",
      testRunner: "@jazzer.js/jest-runner",
			testEnvironment: "node",
      ////testRegex: '(/__tests__/.*|(\\.|/)(fuzz))\\.(jsx?|tsx?)$',
      testMatch: ["<rootDir>/**/*.fuzz.[jt]s"],
      //testMatch: ["<rootDir>/docker/fuzz/math.fuzz.ts"],
      transform: {
        '^.+\\.fuzz.(ts|tsx)$': 'ts-jest',
      },
			
		},
	],
	coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
	modulePathIgnorePatterns: ["/node_modules", "/dist/"],

};
