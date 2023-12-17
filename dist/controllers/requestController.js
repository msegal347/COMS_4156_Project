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
exports.requestController = void 0;
const requestService_1 = __importDefault(require("../services/requestService"));
exports.requestController = {
    createRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const requestData = req.body;
                const newRequest = yield requestService_1.default.createRequest(requestData);
                res.status(201).json(newRequest);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: 'Internal server error', error: error.message });
                }
                else {
                    res.status(500).json({ message: 'Internal server error' });
                }
            }
        });
    },
};
exports.default = exports.requestController;
//# sourceMappingURL=requestController.js.map