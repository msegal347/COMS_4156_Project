import mongoose, { ConnectOptions } from 'mongoose';
import connectDB from '../../src/config/db';

// Mocking console.error and console.log for cleaner test output
console.error = jest.fn();
console.log = jest.fn();

describe('Database Connection', () => {
  let mockConnect: jest.SpyInstance;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Backup original process.env
    originalEnv = { ...process.env };
    // Reset the mock implementations before each test
    jest.clearAllMocks();
    // Mock mongoose.connect method
    mockConnect = jest.spyOn(mongoose, 'connect');
  });

  afterEach(() => {
    // Restore original process.env
    process.env = originalEnv;
  });

  it('should successfully connect to the database', async () => {
    process.env.MONGO_URI = 'mongodb://localhost:27017/testDB';
    mockConnect.mockResolvedValueOnce({
      connection: { host: 'localhost' },
    } as any);

    await connectDB();

    expect(mockConnect).toBeCalled();
    expect(console.log).toBeCalledWith('MongoDB Connected: localhost');
  });

  it('should handle database connection errors', async () => {
    process.env.MONGO_URI = 'mongodb://localhost:27017/testDB';
    mockConnect.mockRejectedValueOnce(new Error('Connection Error'));

    await connectDB();

    expect(mockConnect).toBeCalled();
    expect(console.error).toBeCalledWith('Error while connecting to MongoDB: Connection Error');
  });

  it('should handle missing MONGO_URI environment variable', async () => {
    delete process.env.MONGO_URI;

    await connectDB();

    expect(mockConnect).not.toBeCalled();
    expect(console.error).toBeCalledWith('MONGO_URI is not defined in environment variables.');
  });
});
