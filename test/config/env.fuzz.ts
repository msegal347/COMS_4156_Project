import { config as dotenvConfig } from 'dotenv';
import { existsSync } from 'fs';
import "@jazzer.js/jest-runner/jest-extension";

console.error = jest.fn();

const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
  throw new Error(`Process exited with code ${code}`);
});

jest.mock('fs', () => ({ existsSync: jest.fn() }));
jest.mock('dotenv', () => ({ config: jest.fn() }));

describe('Environment Variables', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    process.env.MONGO_URI = 'mockMongoUri';
    process.env.API_KEY = 'mockApiKey';
  });

  afterAll(() => {
    mockExit.mockRestore();
  });


  it.fuzz('should validate MONGO_URI', () => {
    delete process.env.MONGO_URI;

    expect(() => {
      require('../../src/config/env');
    }).toThrowError('MONGO_URI is not defined in environment variables.');
  });

  it.fuzz('should validate API_KEY', () => {
    delete process.env.API_KEY;

    expect(() => {
      require('../../src/config/env');
    }).toThrowError('API_KEY is not defined in environment variables.');
  });
});
