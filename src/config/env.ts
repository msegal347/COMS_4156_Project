import dotenv from 'dotenv';
import { existsSync } from 'fs';

// Load environment variables from a .env file into process.env
if (existsSync('.env')) {
    dotenv.config();
}

export const MONGO_URI = process.env.MONGO_URI ?? '';
export const PORT = process.env.PORT ?? '3000';
export const API_KEY = process.env.API_KEY ?? '';

// Validate essential environment variables
if (!MONGO_URI) {
    console.error('MONGO_URI is not defined in environment variables.');
    process.exit(1);
}

if (!API_KEY) {
  console.error('API_KEY is not defined in environment variables.');
  process.exit(1);
}
