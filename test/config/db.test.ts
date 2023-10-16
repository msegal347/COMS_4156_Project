import mongoose, { ConnectOptions } from 'mongoose';
import connectDB from '../../src/config/db';

console.error = jest.fn();
console.log = jest.fn();

const mockExit = jest.spyOn(process, 'exit').mockImplementation((code?: number | undefined): never => {
  return undefined as never;
});

describe('Database Connection', () => {
  let mockConnect: jest.SpyInstance;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = { ...process.env };
    jest.clearAllMocks();
    mockConnect = jest.spyOn(mongoose, 'connect');
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  afterAll(() => {
    mockExit.mockRestore();
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

    try {
      await connectDB();
    } catch (error) {
      // Handle or ignore error
    }

    expect(mockConnect).toBeCalled();
    expect(console.error).toBeCalledWith('Error while connecting to MongoDB: Connection Error');
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should handle missing MONGO_URI environment variable', async () => {
    delete process.env.MONGO_URI;

    await connectDB();

    expect(mockConnect).not.toBeCalled();
    expect(console.error).toBeCalledWith('MONGO_URI is not defined in environment variables.');
  });
});
