"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
// Define custom format
const { combine, timestamp, label, printf } = winston_1.format;
const customFormat = printf(({ level, message, label, timestamp }) => {
    return `[${timestamp}] [${label}] ${level}: ${message}`;
});
// Create a logger instance
const winstonLogger = (0, winston_1.createLogger)({
    format: combine(label({ label: 'FoodLink-API' }), timestamp(), customFormat),
    transports: [new winston_1.transports.Console(), new winston_1.transports.File({ filename: 'combined.log' })],
});
// Logger has request, response, and next function as parameters
const logger = (req, res, next) => {
    if (typeof req.method !== 'string' || typeof req.url !== 'string') {
        winstonLogger.error('Invalid request object');
        next(new Error('Invalid request object'));
        return;
    }
    winstonLogger.info(`HTTP ${req.method} ${req.url}`);
    next();
};
exports.logger = logger;
exports.default = exports.logger;
//# sourceMappingURL=logger.js.map