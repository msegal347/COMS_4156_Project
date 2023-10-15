import { Request, Response, NextFunction } from 'express';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] [${label}] ${level}: ${message}`;
});

const winstonLogger = createLogger({
  format: combine(
    label({ label: 'FoodLink-API' }),
    timestamp(),
    customFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'combined.log' }),
  ],
});

export const logger = (req: Request, res: Response, next: NextFunction) => {
  winstonLogger.info(`HTTP ${req.method} ${req.url}`);
  next();
};

export default logger;

