import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import logger from './config/logger';
import { initializeGateway } from './gateway/gateway';
import registrationRoutes from './routes/userRoutes';
import roleRoutes from './routes/roleRoutes';
import { Server as WebSocketServer } from 'ws';
import http from 'http';

// Load environment variables
dotenv.config();

// Initialize database connection
connectDB();

// Initialize the Express application
export const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', ws => {
  console.log('WebSocket connection established.');

  ws.on('message', message => {
    console.log('Received:', message);
    ws.send(`Echoing: ${message}`);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed.');
  });
});

// Use middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize logger
app.use(logger);

// Initialize API Gateway
initializeGateway(app);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Hello, FoodLink API!');
});

// Port and Server Initialization
const port = 5000;

if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () => {
    console.log(`FoodLink API with WebSocket listening at http://localhost:${port}`);
  });
}

export { server };
