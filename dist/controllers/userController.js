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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userService_1 = __importDefault(require("../services/userService"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, role, address } = req.body;
                if (!email || !password || !role) {
                    return res.status(400).json({ message: 'Missing required fields' });
                }
                const user = yield userService_1.default.register(email, password, role, address);
                const _a = user.toObject(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
                res.status(201).json(userWithoutPassword);
            }
            catch (error) {
                if (typeof error === 'object' && error !== null && 'message' in error) {
                    const errorMessage = error.message;
                    if (errorMessage === 'User already exists') {
                        return res.status(409).json({ message: errorMessage });
                    }
                }
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    // Login method
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // Validate email and password
                const user = yield userService_1.default.validateUser(email, password);
                if (!user) {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
                if (!process.env.JWT_SECRET) {
                    throw new Error('JWT secret is not defined');
                }
                const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
                    expiresIn: '1h',
                });
                // Respond with user info and token
                res.json({
                    message: 'Login successful',
                    token,
                    user: {
                        id: user._id,
                        email: user.email,
                        role: user.role,
                    },
                });
            }
            catch (error) {
                if (typeof error === 'object' && error !== null && 'message' in error) {
                    const errorMessage = error.message;
                    return res.status(500).json({ message: errorMessage });
                }
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map