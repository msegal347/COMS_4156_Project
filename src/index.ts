import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import logisticsRoutes from './routes/logisticsRoutes';
import logger from './config/logger';

// Load environment variables
dotenv.config();

// Initialize database connection
connectDB();

// Initialize the Express application
export const app = express();

// Use middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize logger
app.use(logger);

// API Routes
app.use('/api/logistics', logisticsRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Hello, FoodLink API!');
});

// Port and Server Initialization
const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`FoodLink API listening at http://localhost:${port}`);
});
