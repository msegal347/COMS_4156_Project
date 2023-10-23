"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Check if the MONGO_URI is valid
const isValidMongoURI = (uri) => {
    var _a;
    return (_a = ((uri === null || uri === void 0 ? void 0 : uri.startsWith('mongodb://')) || (uri === null || uri === void 0 ? void 0 : uri.startsWith('mongodb+srv://')))) !== null && _a !== void 0 ? _a : false;
};
// Connect to MongoDB
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoUri = process.env.MONGO_URI;
        // Check if the MONGO_URI is defined
        if (!mongoUri) {
            console.error('MONGO_URI is not defined in environment variables.');
            process.exit(1);
            return;
        }
        // Check if the MONGO_URI is valid
        if (!isValidMongoURI(mongoUri)) {
            console.error('Invalid MONGO_URI format.');
            process.exit(1);
            return;
        }
        // Connect to MongoDB
        const conn = yield mongoose_1.default.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        // Log the connection host
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error while connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
});
// Export connectDB
exports.default = connectDB;
//# sourceMappingURL=db.js.map