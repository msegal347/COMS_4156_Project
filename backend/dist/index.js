"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const logger_1 = __importDefault(require("./config/logger"));
const gateway_1 = require("./gateway/gateway");
// Load environment variables
dotenv_1.default.config();
// Initialize database connection
(0, db_1.default)();
// Initialize the Express application
exports.app = (0, express_1.default)();
// Use middlewares
exports.app.use((0, cors_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
// Initialize logger
exports.app.use(logger_1.default);
// Initialize API Gateway
(0, gateway_1.initializeGateway)(exports.app); // Initialize the Gateway passing the express app
// Root Endpoint
exports.app.get('/', (req, res) => {
    res.send('Hello, FoodLink API!');
});
// Port and Server Initialization
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
let server;
exports.server = server;
if (process.env.NODE_ENV !== 'test') {
    exports.server = server = exports.app.listen(port, () => {
        console.log(`FoodLink API listening at http://localhost:${port}`);
    });
}
//# sourceMappingURL=index.js.map