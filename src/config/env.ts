import dotenv from 'dotenv';
import { existsSync } from 'fs';

// Load environment variables from a .env file into process.env
if (existsSync('.env')) {
  dotenv.config();
}

export const MONGO_URI = process.env.MONGO_URI ?? '';
export const PORT = process.env.PORT ?? '3000';
export const API_KEY = process.env.API_KEY ?? '';

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined in environment variables.');
}

if (!API_KEY) {
  throw new Error('API_KEY is not defined in environment variables.');
}
