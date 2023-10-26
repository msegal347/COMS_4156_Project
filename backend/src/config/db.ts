import mongoose, { ConnectOptions } from 'mongoose';

// Check if the MONGO_URI is valid
const isValidMongoURI = (uri: string | undefined): boolean => {
  return (uri?.startsWith('mongodb://') || uri?.startsWith('mongodb+srv://')) ?? false;
};

// Connect to MongoDB
const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;

    // Check if the MONGO_URI is defined
    if (!mongoUri) {
      console.error('MONGO_URI is not defined in environment variables.');
      process.exit(1);
      return;
    }

    // Check if the MONGO_URI is valid
    if (!isValidMongoURI(mongoUri)) {
      console.error('Invalid MONGO_URI format.');
      process.exit(1);
      return;
    }

    // Connect to MongoDB
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //useCreateIndex: true,
      //useFindAndModify: false,
    } as ConnectOptions & { useNewUrlParser: boolean });

    // Log the connection host
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error while connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Export connectDB
export default connectDB;
