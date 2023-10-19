import mongoose, { ConnectOptions } from 'mongoose';

/*
Connect to MongoDB using Mongoose.
*/
const connectDB = async (): Promise<void> => {
  try {
    // Get the MongoDB URI from the environment variables
    const mongoUri = process.env.MONGO_URI;
    // Check if the URI is defined, if not, throw an error
    if (!mongoUri) {
      console.error('MONGO_URI is not defined in environment variables.');
      process.exit(1);
      return;
    }

    // Connect to MongoDB
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    } as ConnectOptions & { useNewUrlParser: boolean });

    // Log the connection host
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    // Log the error and exit the process
    console.error(`Error while connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Export the connectDB function
export default connectDB;
