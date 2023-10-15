import { existsSync } from 'fs';
import { config as dotenvConfig } from 'dotenv';
import * as env from '../../src/config/env';

// Mocking console.error for cleaner test output
console.error = jest.fn();

describe('Environment Variables', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Backup original process.env
    originalEnv = { ...process.env };
    // Reset the mock implementations before each test
    jest.clearAllMocks();
    jest.mock('dotenv');
    jest.mock('fs');
  });

  afterEach(() => {
    // Restore original process.env
    process.env = originalEnv;
  });

it('should load environment variables if .env file exists', () => {
    (existsSync as jest.Mock).mockReturnValue(true);
    (dotenvConfig as jest.Mock).mockReturnValue({ parsed: {} });

    require('../../src/config/env');

    expect(dotenvConfig).toHaveBeenCalled();
});

  it('should validate MONGO_URI', () => {
    delete process.env.MONGO_URI;

    expect(() => {
      require('../../src/config/env');
    }).toThrowError('MONGO_URI is not defined in environment variables.');

    // Required to reload env.ts in the next test
    jest.resetModules(); 
  });

  it('should validate API_KEY', () => {
    process.env.MONGO_URI = 'mockMongoUri';
    delete process.env.API_KEY;

    expect(() => {
      require('../../src/config/env');
    }).toThrowError('API_KEY is not defined in environment variables.');
  });
});
