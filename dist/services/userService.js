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
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const googleMaps_1 = require("../utils/googleMaps");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserService {
    register(email, password, role, apikey, address) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !password || !role) {
                throw new Error('Missing required fields');
            }
            if (yield userModel_1.default.findOne({ email })) {
                throw new Error('User already exists');
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            let coordinates;
            if ((role === 'source' || role === 'sink') && address) {
                const apiKey = process.env.GOOGLE_MAPS_API_KEY;
                if (!apiKey) {
                    throw new Error('Google Maps API key is not set');
                }
                const geocodedCoordinates = yield (0, googleMaps_1.getCoordinates)(address, apiKey);
                coordinates = { lat: geocodedCoordinates.latitude, lng: geocodedCoordinates.longitude };
            }
            const user = new userModel_1.default({ email, password: hashedPassword, role, address, coordinates });
            yield user.save();
            return user;
        });
    }
    validateUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findOne({ email });
            if (user && (yield bcrypt_1.default.compare(password, user.password))) {
                return user;
            }
            else {
                return null;
            }
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map