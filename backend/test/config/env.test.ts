import { existsSync } from 'fs';

console.error = jest.fn();

const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => {
  throw new Error(`Process exited with code ${code}`);
});

jest.mock('fs', () => ({ existsSync: jest.fn() }));
jest.mock('dotenv', () => ({ config: jest.fn() }));

describe('Environment Variables', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules(); // Reset the modules so that changes to process.env get reflected
    process.env.MONGO_URI = 'mongodb://localhost:27017/testDB'; // Set a valid MONGO_URI
    process.env.API_KEY = 'validApiKey'; // Set a valid API_KEY
  });

  afterAll(() => {
    mockExit.mockRestore();
  });

  it('should validate MONGO_URI', () => {
    delete process.env.MONGO_URI;

    expect(() => {
      require('../../src/config/env');
    }).toThrowError('Invalid or missing MONGO_URI in environment variables.');
  });

  it('should validate MONGO_URI format', () => {
    process.env.MONGO_URI = 'invalid_URI';

    expect(() => {
      require('../../src/config/env');
    }).toThrowError('Invalid or missing MONGO_URI in environment variables.');
  });

  it('should validate API_KEY length', () => {
    process.env.API_KEY = 'short';

    expect(() => {
      require('../../src/config/env');
    }).toThrowError('Invalid or missing API_KEY in environment variables.');
  });

  it('should validate API_KEY', () => {
    delete process.env.API_KEY;

    expect(() => {
      require('../../src/config/env');
    }).toThrowError('Invalid or missing API_KEY in environment variables.');
  });
});
