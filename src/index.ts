import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import logger from './config/logger';
import { initializeGateway } from './gateway/gateway';
import registrationRoutes from './routes/registrationRoutes';

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

// Initialize API Gateway
initializeGateway(app); // Initialize the Gateway passing the express app

// Register the registration routes
app.use('/api', registrationRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Hello, FoodLink API!');
});

// Port and Server Initialization
const port = process.env.PORT ?? 3001;

let server: any;

if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    console.log(`FoodLink API listening at http://localhost:${port}`);
  });
}

export { server };
