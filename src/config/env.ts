import dotenv from 'dotenv';
import { existsSync } from 'fs';

// validate the MongoDB URI
const isValidMongoURI = (uri: string): boolean => {
  return uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://');
};

// Load environment variables from a .env file into process.env
if (existsSync('.env')) {
  dotenv.config();
}

// Export environment variables
export const MONGO_URI = process.env.MONGO_URI ?? '';
export const PORT = process.env.PORT ?? '3000';
export const API_KEY = process.env.API_KEY ?? '';

// Check if the environment variables are defined
if (!MONGO_URI || !isValidMongoURI(MONGO_URI)) {
  throw new Error('Invalid or missing MONGO_URI in environment variables.');
}

if (!API_KEY || API_KEY.length < 10) {
  // Assuming API keys should be at least 10 characters
  throw new Error('Invalid or missing API_KEY in environment variables.');
}
