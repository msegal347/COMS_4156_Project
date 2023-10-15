import mongoose, { ConnectOptions } from 'mongoose';

// Asynchronous function to connect to MongoDB
const connectDB = async (): Promise<void> => {
  try {
    // Read the MongoDB URI from environment variables
    // Read the MongoDB URI from environment variables
    const mongoUri = process.env.MONGO_URI;

    // Check if MONGO_URI is set
    if (!mongoUri) {
      console.error('MONGO_URI is not defined in environment variables.');
      process.exit(1);
    }

    // Establish connection to MongoDB using Mongoose
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    } as ConnectOptions & { useNewUrlParser: boolean });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error while connecting to MongoDB: ${error.message}`);
    // Exit the process with failure code
    process.exit(1);
  }
};

export default connectDB;
