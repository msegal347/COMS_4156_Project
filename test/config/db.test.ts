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

  it('should handle invalid URI format', async () => {
    process.env.MONGO_URI = 'invalid_URI';
  
    await connectDB();
  
    expect(mockConnect).not.toBeCalled();
    expect(console.error).toBeCalledWith('Invalid MONGO_URI format.');
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should handle missing port in URI', async () => {
    process.env.MONGO_URI = 'mongodb://localhost/testDB';

    mockConnect.mockRejectedValueOnce(new Error('Missing Port'));

    await connectDB();

    expect(mockConnect).toBeCalled();
    expect(console.error).toBeCalledWith('Error while connecting to MongoDB: Missing Port');
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  it('should handle missing database name in URI', async () => {
    process.env.MONGO_URI = 'mongodb://localhost:27017/';

    mockConnect.mockRejectedValueOnce(new Error('Missing Database Name'));

    await connectDB();

    expect(mockConnect).toBeCalled();
    expect(console.error).toBeCalledWith('Error while connecting to MongoDB: Missing Database Name');
    expect(mockExit).toHaveBeenCalledWith(1);
  });
});
