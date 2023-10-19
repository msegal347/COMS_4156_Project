import { Request, Response, NextFunction } from 'express';
import { createLogger, format, transports } from 'winston';

// Define custom format
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] [${label}] ${level}: ${message}`;
});

// Create a logger instance
const winstonLogger = createLogger({
  format: combine(label({ label: 'FoodLink-API' }), timestamp(), customFormat),
  transports: [new transports.Console(), new transports.File({ filename: 'combined.log' })],
});

// Logger has request, response, and next function as parameters
export const logger = (req: Request, res: Response, next: NextFunction) => {
  winstonLogger.info(`HTTP ${req.method} ${req.url}`);
  next();
};

export default logger;
