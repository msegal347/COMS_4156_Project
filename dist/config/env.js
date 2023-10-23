"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_KEY = exports.PORT = exports.MONGO_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = require("fs");
// validate the MongoDB URI
const isValidMongoURI = (uri) => {
    return uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://');
};
// Load environment variables from a .env file into process.env
if ((0, fs_1.existsSync)('.env')) {
    dotenv_1.default.config();
}
// Export environment variables
exports.MONGO_URI = (_a = process.env.MONGO_URI) !== null && _a !== void 0 ? _a : '';
exports.PORT = (_b = process.env.PORT) !== null && _b !== void 0 ? _b : '3000';
exports.API_KEY = (_c = process.env.API_KEY) !== null && _c !== void 0 ? _c : '';
// Check if the environment variables are defined
if (!exports.MONGO_URI || !isValidMongoURI(exports.MONGO_URI)) {
    throw new Error('Invalid or missing MONGO_URI in environment variables.');
}
if (!exports.API_KEY || exports.API_KEY.length < 10) {
    // Assuming API keys should be at least 10 characters
    throw new Error('Invalid or missing API_KEY in environment variables.');
}
//# sourceMappingURL=env.js.map